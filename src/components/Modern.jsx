import React from 'react'
import img1 from '../assets/fi_11675671.png'
import img2 from '../assets/fi_1283342.png'
import img3 from '../assets/fi_1535012.png'
import img4 from '../assets/fi_2755494.png' 

const cards = [
  {
    id: '01',
    img: img1,
    title: 'Надёжность',
    desc: 'Мы соблюдаем сроки и гарантируем высокое качество.',
  },
  {
    id: '02',
    img: img2,
    title: 'Скорость',
    desc: 'Быстрый отклик и оперативный выезд мастера.',
  },
  {
    id: '03',
    img: img3,
    title: 'Профессионализм',
    desc: 'Мастера с опытом и квалификацией.',
  },
  {
    id: '04',
    img: img4,
    title: 'Гарантия',
    desc: 'Предоставляем гарантию на все виды работ.',
  },
]

const logos = [
  './src/assets/fi_11675671.png',
  './src/assets/fi_1283342.png',
  './src/assets/fi_1535012.png',
  './src/assets/fi_2755494.png',
  './src/assets/fi_5507295.png',
  './src/assets/fi_1576393.png',
]

export default function Modern() {
  return (
    <div className="bg-[var(--bg-color)] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Модераторы сообщества</h2>
        <p className="text-lg text-gray-300">
          GOLDEN HANDS придерживается коллективного и итеративного подхода к дизайну, уделяя внимание индивидуальным потребностям каждого клиента.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        {cards.map((card) => (
          <div key={card.id} className="bg-[#1c1c1c] p-6 rounded-lg text-left shadow hover:shadow-lg transition">
            <span className="text-[#FFFFFF] text-xl font-bold mb-2 block">{card.id}</span>
            <img src={card.img} alt={card.title} className="w-14 h-14 mb-4" />
            <h5 className="text-xl font-semibold mb-2">{card.title}</h5>
            <p className="text-gray-400">{card.desc}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-b border-[#666666] py-8 mt-10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-y-8 px-4">
          {logos.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`logo-${idx}`}
              className="w-[100px] h-[100px] opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

