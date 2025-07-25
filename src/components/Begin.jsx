import React from 'react';
import { useNavigate } from 'react-router';
import '../App.css';

export default function Begin() {
  const navigate = useNavigate();

  return (
    <div className="m-0 p-0 h-screen w-screen overflow-hidden">
      <div className="bg1 relative w-full h-full">
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-white px-4 w-full max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6">GOLDEN HANDS АЛТЫН КОЛ</h1>

          <p className="text-sm sm:text-base lg:text-lg text-center mb-8">
            GOLDEN HANDS — профессиональные услуги по сантехнике и электрике. Работает онлайн — вызывайте мастера в любое время в городе Ош!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="btn w-full sm:w-auto" onClick={() => navigate('/zayavka')}>Вступить</button>
            <button className="btn w-full sm:w-auto" onClick={() => navigate('/personal')}>Вызвать</button>
          </div>
        </div>
      </div>
    </div>
  );
}
