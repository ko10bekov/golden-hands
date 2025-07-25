import React, { useState, useEffect, useRef } from "react";

export default function Za() {
  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    email: "",
    job: "",
    country: "",
    city: "",
    img: "",
  });

  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const fileInputRef = useRef(null);

  const countryCityMap = {
    Кыргызстан: ["Бишкек", "Ош", "Джалал-Абад"],
    Казахстан: ["Алматы", "Астана", "Шымкент"],
    Узбекистан: ["Ташкент", "Самарканд", "Бухара"],
    Россия: ["Москва", "Санкт-Петербург", "Казань"],
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("applications") || "[]");
    if (savedData.length > 0) {
      setAlreadyApplied(true);
    }

    fetch("https://67c82c1e0acf98d0708543d7.mockapi.io/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const maxId = Math.max(...data.map((item) => parseInt(item.id)));
          setLastId(maxId);
        }
      })
      .catch((err) => console.error("Ошибка получения данных:", err));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Введите имя";
    if (!formData.fullName.trim()) newErrors.fullName = "Введите ФИО";

    if (!formData.email.includes("@")) {
      newErrors.email = "Неверный Email";
    } else {
      const emailLower = formData.email.toLowerCase();
      if (emailLower.endsWith("@gmail.com")) {
        const savedData = JSON.parse(localStorage.getItem("applications") || "[]");
        const gmailExists = savedData.some(
          (app) => app.email.toLowerCase() === emailLower
        );
        if (gmailExists) {
          newErrors.email = "Этот gmail уже используется";
        }
      }

      // Сравнение с userData
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData && userData.email) {
        if (emailLower !== userData.email.toLowerCase()) {
          newErrors.email = "Email не совпадает с авторизованным пользователем";
        }
      }
    }

    if (!formData.job) newErrors.job = "Выберите работу";
    if (!formData.country) newErrors.country = "Выберите страну";
    if (!formData.city) newErrors.city = "Выберите город";
    if (!formData.img) newErrors.img = "Фото обязательно";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "country") {
      setCities(countryCityMap[value] || []);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  };

  const compressImage = (file, maxWidth, maxHeight, quality, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        callback(compressedDataUrl);
      };
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, 300, 300, 0.7, (compressedBase64) => {
        setFormData((prev) => ({ ...prev, img: compressedBase64 }));
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (alreadyApplied) {
      alert("Вы уже подали заявку и работаете здесь.");
      return;
    }

    if (validate()) {
      const savedData = JSON.parse(localStorage.getItem("applications") || "[]");
      savedData.push(formData);
      localStorage.setItem("applications", JSON.stringify(savedData));

      try {
        const newUser = {
          id: String(lastId + 1),
          name: formData.name,
          job: formData.job,
          img: formData.img || "https://via.placeholder.com/150",
        };

        const response = await fetch(
          "https://67c82c1e0acf98d0708543d7.mockapi.io/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );

        if (!response.ok) throw new Error("Ошибка при отправке на сервер");

        alert("Заявка успешно отправлена!");
        setLastId((prev) => prev + 1);
        setAlreadyApplied(true);
      } catch (error) {
        console.error("Ошибка при отправке:", error);
        alert("Произошла ошибка при отправке на сервер.");
      }

      setFormData({
        name: "",
        fullName: "",
        email: "",
        job: "",
        country: "",
        city: "",
        img: "",
      });
      setCities([]);
      setErrors({});
    }
  };

  if (alreadyApplied) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-2xl mx-auto mt-10 text-center text-xl font-semibold text-green-700">
        Вы уже работаете здесь.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Заявление</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 bg-[#666666] text-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            type="text"
            name="fullName"
            placeholder="ФИО"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 bg-[#666666] text-white"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 bg-[#666666] text-white"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <select
            name="job"
            value={formData.job}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 bg-[#666666] text-white"
          >
            <option value="">Выберите работу</option>
            <option>Электрик</option>
            <option>Сантехник</option>
            <option>Сварщик</option>
            <option>Мастер на все руки</option>
          </select>
          {errors.job && <p className="text-red-500 text-sm">{errors.job}</p>}
        </div>

        <p className="text-2xl font-bold text-center text-gray-800 mb-6">Где вы находитесь</p>

        <div>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 bg-[#666666] text-white"
          >
            <option value="">Выберите страну</option>
            {Object.keys(countryCityMap).map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>

        <div>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!cities.length}
            className="w-full p-3 rounded-lg border border-gray-300 bg-[#666666] text-white"
          >
            <option value="">
              {cities.length ? "Выберите город" : "Сначала выберите страну"}
            </option>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div className="mt-6 text-center">
          <p className="mb-2 text-gray-700 font-semibold">Выберите фото</p>
          <img
            src={formData.img || "https://via.placeholder.com/150?text=Выберите+фото"}
            alt="Выбранное"
            onClick={handleImageClick}
            style={{
              cursor: "pointer",
              width: 150,
              height: 150,
              objectFit: "cover",
              borderRadius: 10,
              border: "2px solid #ccc",
              margin: "0 auto",
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {errors.img && <p className="text-red-500 text-sm mt-2">{errors.img}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition mt-6"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}
