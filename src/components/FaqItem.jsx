import React, { useState } from 'react'

export default function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-500 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-white text-left"
      >
        <span className="font-medium text-lg">{question}</span>
        <span className="text-xl">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className="mt-2 text-sm text-white transition-all duration-300">
          {answer}
        </p>
      )}
    </div>
  )
}
