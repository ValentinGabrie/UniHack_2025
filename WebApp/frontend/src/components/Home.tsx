import { Page } from '../App';
import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Wine, Sparkles, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFAF5' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #FF2E1E 0%, #FC87F6 50%, #7C80F6 100%)'
        }} />

        {/* Header */}
        <header className="relative z-20 flex items-center justify-end px-20 py-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('auth')}
              className="text-white px-8 py-4 rounded-full hover:opacity-90 transition-all text-lg border-2 border-white/30"
            >
              Login
            </button>
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
              className="absolute top-8 right-8 text-white/70 hover:text-white text-4xl transition-colors"
            >
              ×
            </button>
            <nav className="flex flex-col items-center gap-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-6xl transition-colors hover:opacity-80"
                style={{ color: '#FBED4F', fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('events');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white transition-colors hover:opacity-80"
                style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
              >
                Events
              </button>
              <button
                onClick={() => {
                  onNavigate('spots');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white transition-colors hover:opacity-80"
                style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
              >
                Best Spots
              </button>
              <button
                onClick={() => {
                  onNavigate('map');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white transition-colors hover:opacity-80"
                style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
              >
                Map
              </button>
              <button
                onClick={() => {
                  onNavigate('contact');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white transition-colors hover:opacity-80"
                style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
              >
                Contact
              </button>
            </nav>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center px-20 min-h-[80vh]">
          <div className="text-center max-w-5xl">
            <div className="mb-8">
              <span className="text-xl tracking-widest uppercase" style={{ color: '#FBED4F' }}>Timișoara 2025</span>
            </div>
            <h1 className="text-white text-9xl mb-10 tracking-tight" style={{ lineHeight: '1.1', fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>
              Discover the<br />
              <span style={{ color: '#FBED4F' }}>best dining</span><br />
              experiences
            </h1>
            <p className="text-white/90 text-2xl mb-16 max-w-3xl mx-auto leading-relaxed">
              Ghidul tău de încredere pentru cele mai bune experiențe culinare din Timișoara
            </p>
            <div className="flex gap-6 justify-center">
              <button
                onClick={() => onNavigate('spots')}
                className="group px-12 py-6 rounded-full transition-all shadow-2xl inline-flex items-center justify-center gap-3 text-xl"
                style={{ backgroundColor: '#FCFAF5', color: '#FF2E1E' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FBED4F';
                  e.currentTarget.style.color = '#1F2937';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FCFAF5';
                  e.currentTarget.style.color = '#FF2E1E';
                }}
              >
                Explore Spots
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('map')}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-12 py-6 rounded-full hover:bg-white/20 transition-all text-xl"
              >
                View Map
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-20">
          <div className="grid grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="group cursor-pointer" onClick={() => onNavigate('events')}>
              <div className="relative overflow-hidden rounded-3xl mb-6" style={{ height: '400px' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1666032119084-82351976a922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZWxlZ2FudHxlbnwxfHx8fDE3NjMxMzY5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Elegant dining"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="text-center">
                <h3 className="text-4xl mb-4 text-gray-900" style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>
                  Events
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                  Descoperă cele mai tari evenimente culinare și petreceri din Timișoara
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group cursor-pointer" onClick={() => onNavigate('spots')}>
              <div className="relative overflow-hidden rounded-3xl mb-6" style={{ height: '400px' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwZ2xhc3Nlc3xlbnwxfHx8fDE3NjMxMzY5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Wine selection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="text-center">
                <h3 className="text-4xl mb-4 text-gray-900" style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>
                  Restaurants
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                  Cele mai bune restaurante și locuri de mâncare din Timișoara
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group cursor-pointer" onClick={() => onNavigate('map')}>
              <div className="relative overflow-hidden rounded-3xl mb-6" style={{ height: '400px' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1651209315802-12190ccfee26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwdGFibGV8ZW58MXx8fHwxNzYzMDQwNzE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Fine dining"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="text-center">
                <h3 className="text-4xl mb-4 text-gray-900" style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>
                  Interactive Map
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                  Navighează orașul cu ușurință folosind harta noastră interactivă
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-40 overflow-hidden flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #7C80F6 0%, #FC87F6 50%, #FF2E1E 100%)'
      }}>
        <div className="max-w-4xl text-center px-20">
          <h2 className="text-white text-7xl mb-8 leading-tight" style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>
            Descoperă Timișoara<br />
            cu noi
          </h2>
          <p className="text-white/95 text-3xl leading-relaxed">
            100+ locuri speciale te așteaptă
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 overflow-hidden flex items-center justify-center" style={{
        backgroundColor: '#1F2937'
      }}>
        <div className="max-w-3xl text-center px-20">
          <div className="mb-10">
            <span className="text-7xl" style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900, color: '#FBED4F' }}>
              CeFacemDiseara?
            </span>
          </div>
          <p className="text-gray-300 text-xl mb-12 leading-relaxed">
            Ghidul tău pentru cele mai bune experiențe culinare din Timișoara
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-12 py-5 rounded-full transition-all text-xl border-2"
            style={{ 
              backgroundColor: '#FBED4F',
              color: '#1F2937',
              borderColor: '#FBED4F'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#FBED4F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FBED4F';
              e.currentTarget.style.color = '#1F2937';
            }}
          >
            Contactează-ne
          </button>
        </div>
      </footer>
    </div>
  );
}