import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const slides = [
  {
    id: 1,
    title: `• Преимущества сервиса (например, почему выбрать именно вас):
Почему GOLDEN HANDS?

• Быстрый выезд мастера
• Доступные цены
• Гарантия на все работы
• Опытные специалисты
• Онлайн-заказ без звонка
• Зона обслуживания:
Работаем по всему городу Ош и пригородам
`,
    image: './src/assets/7474645.jpg',
  },
  {
    id: 2,
    title: `• Преимущества сервиса (например, почему выбрать именно вас):
Почему GOLDEN HANDS?

• Быстрый выезд мастера
• Доступные цены
• Гарантия на все работы
• Опытные специалисты
• Онлайн-заказ без звонка
• Зона обслуживания:
Работаем по всему городу Ош и пригородам
`,
    image: './src/assets/7474645.jpg',
  },
  {
    id: 3,
    title: `• Преимущества сервиса (например, почему выбрать именно вас):
Почему GOLDEN HANDS?

• Быстрый выезд мастера
• Доступные цены
• Гарантия на все работы
• Опытные специалисты
• Онлайн-заказ без звонка
• Зона обслуживания:
Работаем по всему городу Ош и пригородам
`,
    image: './src/assets/7474645.jpg',
  },
]

export default function TestimonialSlider() {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index)
      setActiveIndex(index)
    }
  }

  return (
    <section className="bg-[var(--bg-color)] text-[var(--text-color)] py-16 px-4 sm:px-6 md:px-10 lg:px-20 transition-colors duration-300 mt-[100px] mb-[100px]">
      <div className="max-w-5xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop
          spaceBetween={40}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="mb-8"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="flex flex-col lg:flex-row items-center lg:items-start bg-cover bg-center rounded-lg p-8 min-h-[300px]"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="lg:ml-auto lg:w-1/2 text-white bg-black bg-opacity-50 p-6 rounded">
                  <pre className="whitespace-pre-wrap text-lg leading-relaxed font-medium">
                    {slide.title}
                  </pre>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center gap-4">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              className={`px-4 py-2 rounded-full font-semibold transition ${activeIndex === idx
                  ? 'bg-[#FD3B3B] text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-[#FD3B3B] hover:text-white'
                }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
