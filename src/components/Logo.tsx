import React from "react";

export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg 
      width="900" 
      height="260" 
      viewBox="0 0 900 260" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C468"></stop>
          <stop offset="100%" stopColor="#B8862E"></stop>
        </linearGradient>
      </defs>
      <g transform="translate(40,20) scale(0.55)">
        <path d="M 148 300 L 188 90 L 210 90 L 210 300 Z" fill="currentColor" className="logo-text"></path>
        <path d="M 252 300 L 212 90 L 190 90 L 190 300 Z" fill="url(#goldGrad)"></path>
        <rect x="160" y="222" width="80" height="16" fill="currentColor" className="logo-text"></rect>
        <rect x="160" y="222" width="80" height="16" fill="url(#goldGrad)" opacity="0.85"></rect>
        <circle cx="200" cy="90" r="22" fill="currentColor"></circle>
        <circle cx="200" cy="90" r="22" fill="none" stroke="url(#goldGrad)" strokeWidth="6"></circle>
        <circle cx="200" cy="90" r="7" fill="url(#goldGrad)"></circle>
      </g>
      <text 
        x="260" 
        y="140" 
        fontFamily="var(--font-poppins), 'Montserrat', Arial, sans-serif" 
        fontSize="72" 
        fontWeight="700" 
        letterSpacing="2" 
        fill="currentColor" 
        className="logo-text"
      >
        AURION
        <tspan fill="url(#goldGrad)" fontWeight="600">CORE</tspan>
      </text>
      <text 
        x="264" 
        y="175" 
        fontFamily="var(--font-poppins), 'Montserrat', Arial, sans-serif" 
        fontSize="20" 
        fontWeight="500" 
        letterSpacing="8" 
        fill="#7A8399"
      >
        DİJİTAL MİMARİ
      </text>
    </svg>
  );
}
