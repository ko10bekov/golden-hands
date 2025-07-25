import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";

export default function Persona() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratedByUser, setRatedByUser] = useState({});
  const [averageRatings, setAverageRatings] = useState({});
  const [modalUser, setModalUser] = useState(null);
  const [reviews, setReviews] = useState({});
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const usersPerPage = 4;

  useEffect(() => {
    axios.get('https://67c82c1e0acf98d0708543d7.mockapi.io/user')
      .then(res => {
        setUsers(res.data);
        const ratings = {};
        const rated = {};
        const savedReviews = JSON.parse(localStorage.getItem('reviews') || '{}');
        res.data.forEach(user => {
          const saved = JSON.parse(localStorage.getItem(`rating_${user.id}`));
          if (saved) {
            ratings[user.id] = saved.average;
            rated[user.id] = saved.voted;
          } else {
            ratings[user.id] = 0;
          }
        });
        setAverageRatings(ratings);
        setRatedByUser(rated);
        setReviews(savedReviews);
      })
      .catch(err => console.error('Ошибка при загрузке:', err));
  }, []);

  const handleRate = (userId, stars) => {
    const key = `rating_${userId}`;
    const saved = JSON.parse(localStorage.getItem(key)) || {
      total: 0,
      count: 0,
      average: 0,
      voted: false
    };

    if (saved.voted) return;

    const total = saved.total + stars;
    const count = saved.count + 1;
    const average = (total / count).toFixed(1);

    const updated = {
      total,
      count,
      average: parseFloat(average),
      voted: true
    };

    localStorage.setItem(key, JSON.stringify(updated));
    setAverageRatings(prev => ({ ...prev, [userId]: parseFloat(average) }));
    setRatedByUser(prev => ({ ...prev, [userId]: true }));
  };

  const handleReviewSubmit = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData || !userData.email) {
      return alert("Вы не авторизованы. Пожалуйста, войдите.");
    }

    const savedGmail = userData.email.toLowerCase();

    const userReviews = reviews[modalUser.id] || [];
    if (userReviews.some(r => r.gmail === savedGmail)) {
      return alert("Вы уже оставили отзыв этим Gmail");
    }

    const updatedReviews = {
      ...reviews,
      [modalUser.id]: [
        ...userReviews,
        { gmail: savedGmail, text: newReview, rating: newRating }
      ]
    };

    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setNewReview('');
    setNewRating(5);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aRating = averageRatings[a.id] || 0;
    const bRating = averageRatings[b.id] || 0;
    return bRating - aRating;
  });

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 xl:flex-row sm:flex-col">
        <div>
          <h1 className="h1 text-white flex items-center justife-center">Лучшие работники</h1>
        </div>
        <div className="flex items-center mt-[15px] bg-gray-200 px-25 py-2 rounded-lg">
          <img src="./src/assets/Icon — копия (2).png" alt="icon" className="w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Поиск"
            className="bg-transparent outline-none text-black placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col xl:flex-row xl:flex-wrap gap-6 justify-between">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className="w-[48%] rounded-lg shadow p-4 flex gap-6 items-start"
            >
              <img
                src={user.img}
                alt="avatar"
                className="w-[315px] h-[454px] object-cover rounded-md"
              />
              <div className="flex-1 flex flex-col justify-between h-full">
                <div className="h2-1 text-[#FFFFFF] mb-4">Работник</div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="h3 text-white">Работа: {user.job}</h3>
                  <h2 className="h2-2 text-white mt-5">{user.name}</h2>
                  <div className="flex flex-col items-center gap-2 mt-4">
                    <div className="flex justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`cursor-pointer text-2xl transition ${
                            averageRatings[user.id] >= star ? 'text-yellow-400' : 'text-gray-500'
                          } ${
                            ratedByUser && ratedByUser[user.id]
                              ? 'pointer-events-none opacity-50'
                              : 'hover:text-yellow-300'
                          }`}
                          onClick={() => handleRate(user.id, star)}
                          title={
                            ratedByUser && ratedByUser[user.id]
                              ? 'Вы уже проголосовали'
                              : `Поставить ${star} звёзд`
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-white">
                      Оценка: {averageRatings[user.id] || 0} / 5
                    </p>
                  </div>
                </div>
                <div
                  className="flex justify-center items-center gap-2 text-sm text-gray-600 mt-2 cursor-pointer"
                  onClick={() => setModalUser(user)}
                >
                  <span>Отзывы</span>
                  <img src="./src/assets/Home — копия.png" alt="icon" className="w-4 h-4" />
                </div>
                <button className="bg-[#FD3B3B] text-white px-6 py-2 rounded-full hover:bg-[#e12d2d] mt-4">
                  Заявка
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-4 py-2 rounded-full border ${currentPage === idx + 1 ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {modalUser && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl relative">
            <button
              className="absolute top-2 right-3 text-xl"
              onClick={() => setModalUser(null)}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Отзывы для {modalUser.name}</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {(reviews[modalUser.id] || []).map((rev, i) => (
                <div key={i} className="bg-gray-100 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">{rev.gmail}</p>
                    <p className="text-yellow-500">{'★'.repeat(rev.rating)}</p>
                  </div>
                  <p className="text-sm mt-1">{rev.text}</p>
                </div>
              ))}
            </div>

            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Ваш отзыв"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <div className="flex items-center gap-2 mb-2">
              <span>Оценка:</span>
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setNewRating(n)}
                  className={newRating >= n ? 'text-yellow-400' : 'text-gray-300'}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              onClick={handleReviewSubmit}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Отправить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
