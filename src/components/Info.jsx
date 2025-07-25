import React from 'react'
import "../App.css"

export default function Info() {
  return (
    <div className="flex justify-center items-center px-4">
      <div className='bg-white mt-[50px] w-full max-w-[1619px] h-auto py-12 px-6 text-center rounded-lg'>

        <div className='text-center mb-10'>
          <h2 className='h2-3 mb-[40px]'>Как работает Golden Hands </h2>
          <h3 className='h3-1 max-w-[1000px] mx-auto text-start'>
            Golden Hands — это современный онлайн-сервис, который помогает мастерам зарабатывать, а клиентам — находить профессионалов.
          </h3>
          <h5 className='h4-1 max-w-[900px] mx-auto mt-6 text-start'>
            Мы предоставляем вам поток клиентов, которым необходимы услуги сантехников, электриков и сварщиков. 
            Вам не нужно тратить время и деньги на рекламу или поиски заказов — всё уже готово.
          </h5>
        </div>

        <div className="mb-10">
          <h2 className='h2-3'>Что вы получаете, работая с нами: </h2>
        </div>

        <div className="mb-10">
          <h5 className='h4-1 max-w-[800px] mx-auto whitespace-pre-line text-start'>
            📲 Доступ к реальным заказам через наш онлайн-сервис{'\n'}
            💰 Вы зарабатываете 80% от стоимости каждого выполненного заказа{'\n'}
            📦 Мы берём на себя все организационные моменты: поиск клиентов, коммуникацию и поддержку{'\n'}
            ✅ Вы сосредотачиваетесь только на своей работе — остальное мы берём на себя
          </h5>
        </div>

        <div className="mb-8">
          <h4 className='h3-1 max-w-[900px] mx-auto text-end'>
            Наша комиссия составляет всего 20% — это плата за стабильный поток заказов, удобный сервис и поддержку на каждом этапе.
          </h4>
        </div>

        <div>
          <h4 className='h3-1 max-w-[900px] mx-auto text-start'>
            Присоединяйтесь к Golden Hands и начните зарабатывать уже сегодня. 
            Мы помогаем мастерам делать свою работу, а клиентам — получать качественный результат.
          </h4>
        </div>

      </div>
    </div>
  )
}
