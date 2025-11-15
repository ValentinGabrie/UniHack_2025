import { useState } from 'react';
import { Page } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutUsProps {
  onNavigate: (page: Page) => void;
}

export function AboutUs({ onNavigate }: AboutUsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Blue/Teal Blob */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-300 to-teal-300 min-h-[500px]">
        {/* Large blue blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]">
          <svg viewBox="0 0 800 600" className="w-full h-full">
            <ellipse cx="400" cy="300" rx="400" ry="300" fill="#3B82F6" />
          </svg>
        </div>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
          <div className="text-teal-500 text-5xl" style={{ fontFamily: 'system-ui, sans-serif' }}>
            off
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Menu
          </button>
        </header>

        {/* Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-indigo-500/95 z-50 flex items-center justify-center">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-white text-xl hover:text-yellow-300"
            >
              ✕
            </button>
            <nav className="flex flex-col items-center gap-6">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white hover:text-yellow-300 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-6xl text-yellow-300 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => {
                  onNavigate('spots');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white hover:text-yellow-300 transition-colors"
              >
                Best spots
              </button>
              <button
                onClick={() => {
                  onNavigate('map');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white hover:text-yellow-300 transition-colors"
              >
                Map
              </button>
              <button
                onClick={() => {
                  onNavigate('contact');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white hover:text-yellow-300 transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>
        )}

        {/* Hero Title */}
        <div className="relative z-10 flex items-center justify-center min-h-[500px]">
          <h1 className="text-white text-8xl md:text-9xl">About us</h1>
        </div>

        {/* Character illustrations placeholders */}
        <div className="absolute left-20 top-1/2 -translate-y-1/2 w-24 h-32 bg-white/20 rounded-lg z-10" />
        <div className="absolute right-20 top-1/2 -translate-y-1/2 w-24 h-32 bg-white/20 rounded-lg z-10" />
      </section>

      {/* Wine & Spirits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Left - Circular images in artistic layout */}
            <div className="relative h-[600px]">
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759514139382-f6a53012241a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZyUyMHBlb3BsZXxlbnwxfHx8fDE3NjMwODM2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Wine tasting"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-40 right-0 w-56 h-56 rounded-full overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1612823711171-e296662098fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NjMxMzU3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Food"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-32 left-20 w-48 h-48 rounded-full overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2MzAzNzc0MHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Dining"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-12 w-52 h-52 rounded-full overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1598994671512-395d7a6147e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhcnxlbnwxfHx8fDE3NjMxMjk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Cocktails"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right - Text content */}
            <div className="space-y-6">
              <h2 className="text-5xl text-indigo-500 mb-8">
                The best of wine &<br />spirits in Timisoara
              </h2>
              <div className="space-y-4 text-indigo-400 text-lg">
                <p>
                  THE OFF is a brand-new vintage for 2025 exclusively for lovers of fine wine and spirits.
                </p>
                <p>
                  The OFF 2025 puts Timisoara's finest addresses under the spotlight: bars, restaurants and wine merchants. A curated selection designed to meet all tastes and all budgets, for top dining and wines. Whether you're after a three-course dinner, a quick bite, eating in or taking away, with or without wine, whether you're a connoisseur, novice or simply curious, you'll find the best restaurants and spots for wine and spirits to suit every occasion.
                </p>
                <p>
                  Because beyond just a selection of the best addresses, Le OFF is above all an initiative to share the values of quality and good living embodied by Vinexposium and its trade fairs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pink Section - Cities */}
      <section className="relative py-32 bg-gradient-to-br from-fuchsia-400 to-pink-500 overflow-hidden">
        <div className="container mx-auto px-8 text-center relative z-10">
          <h2 className="text-6xl md:text-7xl text-yellow-300 mb-4">
            All the cities you
          </h2>
          <h2 className="text-6xl md:text-7xl text-yellow-300 mb-4">
            missed
          </h2>
          <h2 className="text-6xl md:text-7xl text-yellow-300">
            are here at Timisoara
          </h2>
        </div>
      </section>

      {/* All Best Spots Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left - Text */}
            <div className="space-y-6">
              <h2 className="text-5xl text-pink-400 mb-8">
                All the best spots<br />are in Le OFF
              </h2>
              <div className="space-y-4 text-pink-300 text-lg">
                <p>
                  For 10 years, Le OFF has been a cult guide for wine and food enthusiasts with over 100 carefully selected addresses, each one embodying quality and authenticity.
                </p>
                <p>
                  Restaurants, wine bars, wine shops: every spot has been handpicked by our selection committee to offer you the crème de la crème of Timisoara.
                </p>
                <p>
                  Our mission? To guide you to establishments where exceptional products, genuine hospitality and refined atmospheres come together.
                </p>
                <p>
                  Whether you're looking for a cozy bistro, a natural wine bar or an elegant fine dining restaurant, Le OFF 2025 is your passport to Timisoara's most exceptional gourmet experiences.
                </p>
              </div>
            </div>

            {/* Right - Illustration */}
            <div className="relative flex justify-center">
              <div className="relative">
                {/* Red blob */}
                <div className="w-96 h-96">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <ellipse cx="200" cy="200" rx="200" ry="180" fill="#EF4444" transform="rotate(-15 200 200)" />
                  </svg>
                </div>
                {/* Relaxing person placeholder */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/20 rounded-lg" />
                {/* Cocktail glass */}
                <div className="absolute top-20 right-20 w-20 h-20 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yellow Section - Committee Favorites */}
      <section className="relative py-20 bg-yellow-300 overflow-hidden">
        <div className="container mx-auto px-8">
          <h2 className="text-center text-indigo-500 text-5xl mb-12">
            The 2025 selection<br />committee's favorites
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12">
            <div className="relative aspect-square rounded-full overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1752659012040-fd07ce7715ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYmFyJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzMTI0NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Favorite 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-full overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1681270543584-8e541a1bb056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZ3xlbnwxfHx8fDE3NjMxMDA1NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Favorite 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-full overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1598994671512-395d7a6147e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhcnxlbnwxfHx8fDE3NjMxMjk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Favorite 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-full overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1610631787813-9eeb1a2386cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlfGVufDF8fHx8MTc2MzAyMTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Favorite 4"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => onNavigate('spots')}
              className="border-2 border-gray-800 text-gray-800 px-8 py-3 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
            >
              Discover the addresses
            </button>
          </div>
        </div>
      </section>

      {/* Pink Footer */}
      <footer className="relative bg-gradient-to-br from-pink-400 to-fuchsia-400 py-20 overflow-hidden">
        {/* Yellow blob decoration */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 rounded-full translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-md">
            <p className="text-gray-800 text-lg mb-6">
              LE OFF is an initiative led by Vinexposium, the world's leading wine & spirits event organizer, whose values it wishes to embody: quality, authenticity, and innovation.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="border-2 border-gray-800 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
            >
              Contact us
            </button>
          </div>
        </div>

        {/* Decorative cocktail/ice cream illustration */}
        <div className="absolute bottom-8 right-12 w-32 h-32 bg-white/20 rounded-lg z-10" />
      </footer>
    </div>
  );
}
