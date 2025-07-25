import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router'; 
import '../App.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    alert(`Subscription successful! You will receive updates at ${email}`);
    setEmail('');
  };

  const navData = [
    {
      id: 1,
      name: 'Quick Link',
      links: [
        { text: 'Home', path: '/' },
        { text: 'Pricing', path: '/service' },
        { text: 'About', path: '/about' },
        { text: 'Service', path: '/service' },
        { text: 'About us', path: '/about' },
      ],
    },
    {
      id: 2,
      name: 'Products',
      links: [
        { text: 'Electrician', path: '/personal' },
        { text: 'Plumber', path: '/personal' },
        { text: 'Welder', path: '/personal' },
        { text: 'Repair', path: '/personal' },
      ],
    },
    {
      id: 3,
      name: 'Company',
      links: [
        { text: 'About', path: '/about' },
        { text: 'Privacy Policy', path: '/service' },
        { text: 'Support', path: '/' },
        { text: 'Team of Service', path: '/' },
      ],
    },
  ];

  return (
    <div className="bg-[#0F0C0C] text-white">
      <div className="flex justify-center items-center py-10">
        <div className="bg bg-cover bg-center rounded-3xl px-6 py-10 w-full max-w-6xl flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-xl font-semibold text-black text-center md:text-left mb-4 md:mb-0">
            Хотите работать с нами?
          </h3>
          <button
            onClick={() => navigate('/zayavka')}
            className="flex items-center gap-4 bg-[#FD3B3B] hover:bg-red-600 px-6 py-2 rounded-full text-white transition text-sm"
          >
            Начать
            <img src="/src/assets/Arrow 1 (1).png" alt="Start Icon" className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-black px-4 py-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between gap-10 px-2">
          <div className="lg:w-[40%]">
            <div className="flex items-center gap-4 mb-4">
              <img width={80} height={80} src="./src/assets/Golden.png" alt="Golden Hands" />
              <h2 className="text-lg font-bold leading-tight">
                GOLDEN HANDS<br />
                <span className="text-sm font-normal">АЛТЫН КОЛ</span>
              </h2>
            </div>
            <h2 className="text-lg font-bold mb-2">Subscribe</h2>
            <p className="text-white/70 text-sm mb-4">
              Join our newsletter to stay up to date on features and releases.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={handleEmailChange}
                className="w-full pl-4 pr-24 py-2.5 rounded-full bg-transparent border border-white text-white placeholder-white/70 text-sm"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-5 bg-[#FD3B3B] rounded-full text-white hover:bg-red-600 transition text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 lg:w-[40%]">
            {navData.map((group) => (
              <div key={group.id}>
                <p className="text-base font-semibold mb-2">{group.name}</p>
                <ul className="space-y-1">
                  {group.links.map((item, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `transition text-sm ${isActive ? 'text-white font-medium' : 'text-white/70 hover:text-white'}`
                        }
                      >
                        {item.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 px-2">
          <div>© 2025 Golden Hands. All rights reserved.</div>
          <div className="flex items-center gap-4 mt-3 md:mt-0 bg-white p-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/facebook.png" alt="Facebook" className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/twitter.png" alt="Twitter" className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/goldenhands_osh/" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/instagram.png" alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/youtube-168 1.png" alt="YouTube" className="w-5 h-5" />
            </a>
            <a href="https://wa.me/504122020" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/Whatsup.png" alt="WhatsApp" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
