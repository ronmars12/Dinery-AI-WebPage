import React from 'react';
import { Link } from 'react-router-dom';
import dineryLogo from '../assets/dinery-logo.png';

const legalLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.07] bg-[#0b1420] px-6 py-6 text-white sm:py-7">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="group inline-flex w-fit items-center gap-3"
            aria-label="Dinery.ai home"
          >
            <img
              src={dineryLogo}
              alt="Dinery.ai"
              className="h-9 w-9 rounded-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-sm font-black tracking-[-0.02em] text-white">
              DINERY.AI
            </span>
          </Link>

          <p className="max-w-sm text-sm leading-6 text-white/40 sm:text-right">
            Great food deserves a full room.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-white/[0.08] pt-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/35">© 2026 Dinery.ai · Oslo, Norway</p>

          <div className="flex items-center gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-white/40 transition-colors duration-200 hover:text-[#ff6b22]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;