import React from 'react';

export default function We() {
  return (
    <div className='mt-[100px]'>
      <div className='min-h-[955px] bg-[#FFFFFF]'>
        <div className='flex flex-col lg:flex-row justify-center items-center'>
          <div className='w-[752px] h-[736px] bg-[#948D8D]'>
            <h2 className='h2-5 mt-[35px]'>
              Всё, что вам нужно — оставить заявку онлайн. Мы подберём мастера, который приедет в удобное время и решит вашу проблему качественно и быстро. Почему выбирают нас
            </h2>
            <h2 className='h2-5 mt-[70px]'>
              Только проверенные и опытные специалисты<br />
              Быстрый выезд мастера<br />
              Поддержка на каждом этапе<br />
              Удобный заказ через сайт
            </h2>
          </div>
          <div>
            <img
              src="./src/assets/depositphotos_8539754-stock-photo-portrait-of-a-technician.jpg"
              alt=""
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                minWidth: "904px",
                minHeight: "736px",
              }}
            />
          </div>
        </div>
        <div className='flex justify-center px-4 text-center'>
          <h3 className='h3-2 mt-[70px]'>
            Golden Hands — профессиональная помощь там, где она нужна.
          </h3>
        </div>
      </div>
    </div>
  );
}
