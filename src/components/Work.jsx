import React, { useState, useEffect } from 'react';

export default function Work() {
  const [activeId, setActiveId] = useState('01');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const savedId = localStorage.getItem('selectedJobId');
    if (savedId) setActiveId(savedId);
  }, []);

  const handleSelect = (id) => {
    setActiveId(id);
    localStorage.setItem('selectedJobId', id);
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const jobs = [
    { id: '01', title: 'Electrician/Электрик' },
    { id: '02', title: 'Plumber/Сантехник' },
    { id: '03', title: 'Welder/Сварщик' },
    { id: '04', title: 'Repair/Ремонт' },
  ];

  const jobContent = {
    '01': {
      img: './src/assets/1670485466_1-kartinkin-net-p-elektrik-kartinki-instagram-1.png',
      desc1: 'Ever wondered how electrical magic happens?',
      desc2: 'Looking for electrical experts who can bring power to your ideas?',
      fullDesc: 'Подробное описание работы электрика: установка и ремонт электропроводки, монтаж электрооборудования, обеспечение безопасности и качества работ.',
    },
    '02': {
      img: './src/assets/photo_5190527596113295892_x.jpg',
      desc1: 'Got leaky pipes? We fix them fast and clean!',
      desc2: 'Need reliable plumbing services? We got your back!',
      fullDesc: 'Подробное описание работы сантехника: ремонт и установка водопроводных систем, устранение протечек, монтаж сантехнического оборудования.',
    },
    '03': {
      img: './src/assets/photo_5190527596113295894_x.jpg',
      desc1: 'Welding the future, one spark at a time.',
      desc2: 'Strong welds for stronger structures.',
      fullDesc: 'Подробное описание работы сварщика: сварка различных металлов, изготовление и ремонт металлических конструкций, соблюдение техники безопасности.',
    },
    '04': {
      img: './src/assets/photo_5190527596113295893_x.jpg',
      desc1: 'Broken things? We bring them back to life.',
      desc2: 'Expert repairs for your everyday needs.',
      fullDesc: 'Подробное описание работы мастера по ремонту: выполнение различных ремонтных работ в доме, починка техники и мебели, качественный сервис.',
    },
  };

  const currentContent = jobContent[activeId];

  return (
    <section className="bg-[var(--bg-color)] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex xl:flex-row sm:flex-col justify-between items-start mb-10 gap-4 ">
          <h4 className="text-3xl font-bold">Вакансии</h4>
          <p className="text-gray-300 max-w-xl w-[276px] text-center md:text-left">
            Студия Katalyst предлагает широкий спектр сантехнических услуг.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-7">
            {jobs.map((job) => (
              <button
                key={job.id}
                onClick={() => handleSelect(job.id)}
                className={`h-[107px] rounded-[120px] flex items-center justify-center px-6 text-lg font-medium border-2 transition
                  ${
                    activeId === job.id
                      ? 'bg-[#F0F0F2] text-black border-[#F0F0F2]'
                      : 'bg-[#101010] text-white border-[#FFFDFD] hover:bg-[#181818]'
                  }
                  w-[400px] max-w-[450px]
                `}
              >
                <div className="flex items-center gap-6">
                  <span className="text-[#FD3B3B] text-2xl font-bold">{job.id}</span>
                  <span>{job.title}</span>
                  <img
                    src="./src/assets/Arrow 1 (1).png"
                    alt="arrow"
                    className="w-5 h-5"
                  />
                </div>
              </button>
            ))}
          </div>

          <div className="flex xl:flex-row sm:flex-col sm:items-center gap-6 max-w-[780px]">
            <img
              src={currentContent.img}
              alt="worker"
              className="w-full max-h-[500px] rounded-md"
            />

            <div className="flex flex-wrap gap-6 justify-between">
              <div className="bg-[#1c1c1c] p-6 rounded-lg w-[252px] h-[232px] flex flex-col justify-between">
                <p className="text-white mb-3">{currentContent.desc1}</p>
                <div className="flex items-center justify-between mt-auto">
                  <button className="text-white font-semibold hover:underline">Подробнее</button>
                  <button
                    onClick={() => openModal(currentContent.fullDesc)}
                    className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer"
                    aria-label="Open details"
                  >
                    <img src="./src/assets/Arrow 3.png" alt="arrow" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-[#1c1c1c] p-6 rounded-lg w-[252px] h-[232px] flex flex-col justify-between">
                <p className="text-white mb-3">{currentContent.desc2}</p>
                <div className="flex items-center justify-between mt-auto">
                  <button className="text-white font-semibold hover:underline">Подробнее</button>
                  <button
                    onClick={() => openModal(currentContent.fullDesc)}
                    className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer"
                    aria-label="Open details"
                  >
                    <img src="./src/assets/Arrow 3.png" alt="arrow" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white text-black p-6 rounded-lg max-w-lg max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl mb-4">Подробности</h3>
              <p>{modalContent}</p>
              <button
                onClick={closeModal}
                className="mt-6 px-4 py-2 bg-[#FD3B3B] text-white rounded hover:bg-red-600"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
