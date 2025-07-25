import React from 'react'
import '../App.css'

export default function Text() {
  return (
    <div className='mt-[50px]'>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div>
          <img
            src="./src/assets/depositphotos_19612397-stock-photo-blue-circuit-board-background.jpg"
            alt=""
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              minWidth: "836px",
              minHeight: "550px",
            }}
          />
        </div>
        <div className="w-[836px] h-[560px] rounded-r bg-[#042F6F]">
          <h2 className='h2-4 m-[30px]'>
            Golden Hands — это онлайн-сервис, который быстро и удобно соединяет клиентов с проверенными специалистами. Мы предоставляем услуги
          </h2>
          <h2 className='h2-4 mt-[55px]'> Сантехников</h2>
          <h2 className='h2-4 m-[15px]'> Электриков</h2>
          <h2 className='h2-4'> Сварщиков</h2>
        </div>
      </div>
    </div>
  )
}
