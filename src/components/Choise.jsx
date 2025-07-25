import React from 'react'
import "../App.css"

export default function Choise() {
  return (
    <div className="h-auto py-2 px-4 bg-[#FFFFFF] flex items-center justify-center">
      <div className="w-full max-w-7xl px-4 flex flex-col sm:flex-row justify-between items-center gap-10 sm:gap-4">
        <div className="flex flex-col items-center text-center">
          <img
            src="/src/assets/png-transparent-electrician-electrical-wires-cable-logo-brand-certification-eletricista-service-electrical-wires-cable-computer-removebg-preview.png"
            alt=""
            width={149}
            height={81}
          />
          <h4 className="h4 mt-4">Электромонтажные работы</h4>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src="/src/assets/1643619061_1-papik-pro-p-santekhnika-logotip-1-removebg-preview.png"
            alt=""
            width={99}
            height={86}
          />
          <h4 className="h4 mt-4">Сантехнические работы</h4>
        </div>

        <div className="flex flex-col items-center text-center">
          <img
            src="/src/assets/obuchenie.png"
            alt=""
            width={86}
            height={86}
          />
          <h4 className="h4 mt-4">Сварочные работы</h4>
        </div>
      </div>
    </div>
  )
}
