import { useState } from 'react';

export function Navigation() {
  const [activeLang, setActiveLang] = useState<'FR' | 'IN'>('FR');

  const navItems = [
    { label: 'About', color: 'white' },
    { label: 'Best spots', color: 'white' },
    { label: 'Map', color: 'yellow' },
    { label: 'Contact', color: 'white' },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-12">
      {/* Language Selector */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button
          onClick={() => setActiveLang('FR')}
          className={`text-2xl transition-all duration-300 ${
            activeLang === 'FR'
              ? 'text-white scale-110'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          FR
        </button>
        <span className="text-2xl text-white/50">-</span>
        <button
          onClick={() => setActiveLang('IN')}
          className={`text-2xl transition-all duration-300 ${
            activeLang === 'IN'
              ? 'text-yellow-300 scale-110'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          IN
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col items-center gap-4 md:gap-6">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.label.toLowerCase().replace(' ', '-')}`}
            className={`
              text-6xl md:text-8xl lg:text-9xl
              transition-all duration-300
              hover:scale-105 hover:tracking-wider
              ${
                item.color === 'yellow'
                  ? 'text-yellow-300 hover:text-yellow-200'
                  : 'text-white hover:text-white/90'
              }
            `}
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
