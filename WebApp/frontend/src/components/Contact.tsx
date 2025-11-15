import { Page } from '../App';
import { Instagram, MapPin } from 'lucide-react';
import { useState } from 'react';

interface ContactProps {
  onNavigate: (page: Page) => void;
}

export function Contact({ onNavigate }: ContactProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-400 via-pink-500 to-fuchsia-400">
      {/* Large red blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]">
        <svg viewBox="0 0 1200 1200" className="w-full h-full">
          <path
            d="M600,100 Q900,200 1000,500 Q900,800 600,900 Q300,800 200,500 Q300,200 600,100"
            fill="#EF4444"
          />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-end px-12 py-10">
        <div className="flex items-center gap-4 mr-12">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white px-8 py-4 rounded-full hover:opacity-90 transition-all text-lg"
            style={{ backgroundColor: '#5ECCAD' }}
          >
            Menu
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(124, 128, 246, 0.5)' }}>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-white text-6xl hover:text-yellow-300 transition-colors"
          >
            ×
          </button>
          <nav className="flex flex-col items-center gap-6">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
              className="text-6xl text-white hover:text-yellow-300 transition-colors"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('events');
                setIsMenuOpen(false);
              }}
              className="text-6xl text-white hover:text-yellow-300 transition-colors"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Events
            </button>
            <button
              onClick={() => {
                onNavigate('spots');
                setIsMenuOpen(false);
              }}
              className="text-6xl text-white hover:text-yellow-300 transition-colors"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Best spots
            </button>
            <button
              onClick={() => {
                onNavigate('map');
                setIsMenuOpen(false);
              }}
              className="text-6xl text-white hover:text-yellow-300 transition-colors"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Map
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-6xl text-yellow-300 hover:text-white transition-colors"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Contact
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl w-full">
          {/* Left side - illustration placeholder */}
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-white/10 rounded-full" />
          </div>

          {/* Right side - contact info inside red blob */}
          <div className="text-white space-y-8">
            <div className="flex gap-4 mb-8">
              <button className="w-12 h-12 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Instagram className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <MapPin className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-lg">
              <p>
                Ai o întrebare, o solicitare, un cuvânt frumos (le adorăm!) sau vrei pur și simplu să ne împărtășești locul tău preferat din Timișoara?
              </p>
              <p>
                Suntem mereu curioși să descoperim ideile tale, inspirațiile și locurile tale favorite din oraș.
              </p>
              <p>
                Așteptăm cu drag să ne scrii!
              </p>
            </div>

            <div className="pt-8">
              <a
                href="mailto:hello@timisoara.com"
                className="text-4xl md:text-5xl hover:text-yellow-300 transition-colors inline-block"
              >
                hello@timisoara.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom large text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="text-[200px] md:text-[300px] leading-none text-white opacity-30" style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>
          contact
        </div>
      </div>

      {/* Floating cocktail decorations */}
      <div className="absolute top-20 right-20 animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="w-16 h-16 bg-white/20 rounded-full" />
      </div>
      <div className="absolute bottom-40 right-40 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <div className="w-20 h-20 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}