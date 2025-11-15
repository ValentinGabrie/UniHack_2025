import { useState } from 'react';
import { Page } from '../App';
import { MapPin, List } from 'lucide-react';

interface MapPageProps {
  onNavigate: (page: Page) => void;
}

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: string;
  cuisine: string;
  rating: number;
}

export function MapPage({ onNavigate }: MapPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locations] = useState<Location[]>([
    { id: 1, name: 'Suta de grame', lat: 45.7537, lng: 21.2257, type: 'restaurant', cuisine: 'Romanian', rating: 9.5 },
    { id: 2, name: "80's pub", lat: 45.7570, lng: 21.2290, type: 'pub', cuisine: 'Pub', rating: 9 },
    { id: 3, name: "Jack's bistro", lat: 45.7489, lng: 21.2087, type: 'bistro', cuisine: 'Bistro', rating: 9.5 },
    { id: 4, name: 'Little Hanoi', lat: 45.7561, lng: 21.2269, type: 'restaurant', cuisine: 'Vietnamese', rating: 9 },
    { id: 5, name: 'Riyo', lat: 45.7575, lng: 21.2301, type: 'restaurant', cuisine: 'Japanese', rating: 9.5 },
    { id: 6, name: 'La Focacceria', lat: 45.7550, lng: 21.2280, type: 'restaurant', cuisine: 'Italian', rating: 9 },
    { id: 7, name: 'Hype culture', lat: 45.7520, lng: 21.2240, type: 'restaurant', cuisine: 'Modern', rating: 9 },
    { id: 8, name: 'Eat like a man', lat: 45.7545, lng: 21.2265, type: 'steakhouse', cuisine: 'Steakhouse', rating: 9.5 },
    { id: 9, name: 'Why pizza', lat: 45.7535, lng: 21.2295, type: 'restaurant', cuisine: 'Pizza', rating: 9 },
    { id: 10, name: 'Taverna racilor', lat: 45.7560, lng: 21.2275, type: 'restaurant', cuisine: 'Seafood', rating: 9.5 }
  ]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFAF5' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[400px]" style={{
        background: 'linear-gradient(135deg, #4AA5FF 0%, #5ECCAD 50%, #FBED4F 100%)'
      }}>
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3" style={{ backgroundColor: '#FC87F6' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 -translate-x-1/3 translate-y-1/3" style={{ backgroundColor: '#7C80F6' }} />

        {/* Header */}
        <header className="relative z-20 flex items-center justify-end px-12 py-10">
          <div className="flex items-center gap-4 mr-12">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white px-8 py-4 rounded-full hover:opacity-90 transition-all text-lg"
              style={{ backgroundColor: '#4AA5FF' }}
            >
              Menu
            </button>
          </div>
        </header>

        {/* Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(74, 165, 255, 0.5)' }}>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-white/70 hover:text-white text-4xl transition-colors"
            >
              ×
            </button>
            <nav className="flex flex-col items-center gap-8">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className="text-5xl md:text-6xl text-white transition-colors hover:opacity-80"
                style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('events');
                  setIsMenuOpen(false);
                }}
                className="text-5xl md:text-6xl text-white transition-colors hover:opacity-80"
                style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
              >
                Events
              </button>
              <button
                onClick={() => {
                  onNavigate('spots');
                  setIsMenuOpen(false);
                }}
                className="text-5xl md:text-6xl text-white transition-colors hover:opacity-80"
                style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
              >
                Best Spots
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl md:text-6xl transition-colors hover:opacity-80"
                style={{ color: '#FBED4F', fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
              >
                Map
              </button>
              <button
                onClick={() => {
                  onNavigate('contact');
                  setIsMenuOpen(false);
                }}
                className="text-5xl md:text-6xl text-white transition-colors hover:opacity-80"
                style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
              >
                Contact
              </button>
            </nav>
          </div>
        )}

        {/* Hero Title */}
        <div className="relative z-10 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-white text-7xl md:text-9xl mb-4" style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>Interactive</h1>
            <h1 className="text-7xl md:text-9xl" style={{ color: '#FBED4F', fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>Map</h1>
          </div>
        </div>
      </section>

      {/* Filter and View Controls */}
      <div className="container mx-auto px-8 pt-8 flex justify-between items-center">
        <div className="flex gap-2">
          <button className="px-6 py-3 text-white rounded-full transition-all shadow-lg" style={{ backgroundColor: '#4AA5FF' }}>
            All Restaurants
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('spots')}
            className="p-3 border-2 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
            style={{ borderColor: '#4AA5FF', color: '#4AA5FF' }}
          >
            <List className="w-5 h-5" />
          </button>
          <button className="p-3 text-white rounded-full transition-colors" style={{ backgroundColor: '#4AA5FF' }}>
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="container mx-auto px-8 py-8">
        <div className="relative w-full h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4" style={{ borderColor: '#4AA5FF' }}>
          {/* Embedded Map using OpenStreetMap */}
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=21.1687%2C45.7236%2C21.2887%2C45.7836&layer=mapnik&marker=45.7537%2C21.2287"
            className="w-full h-full"
            style={{ border: 0 }}
            title="Timisoara Map"
          />
          
          {/* Custom Markers Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="text-white px-6 py-3 rounded-full shadow-lg pointer-events-auto" style={{ backgroundColor: '#4AA5FF' }}>
                📍 {locations.length} locații în Timișoara
              </div>
            </div>
          </div>

          {/* Attribution */}
          <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded text-xs text-gray-600">
            © OpenStreetMap contributors
          </div>
        </div>

        {/* Location Legend */}
        <div className="mt-6 bg-white rounded-3xl shadow-lg p-6 border-4" style={{ borderColor: '#5ECCAD' }}>
          <h3 className="text-3xl text-gray-800 mb-6" style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>Toate Locațiile</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location) => (
              <div
                key={location.id}
                className="flex items-center justify-between p-4 rounded-2xl hover:shadow-lg transition-all cursor-pointer border-2"
                style={{ 
                  backgroundColor: '#FCFAF5',
                  borderColor: '#5ECCAD'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4AA5FF' }} />
                  <div>
                    <p className="text-gray-800">{location.name}</p>
                    <p className="text-sm text-gray-500">{location.cuisine}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-16 md:py-20 overflow-hidden mt-12" style={{
        background: 'linear-gradient(135deg, #4AA5FF 0%, #5ECCAD 100%)'
      }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 opacity-30" style={{ backgroundColor: '#FBED4F' }} />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
              Explorează cele mai bune restaurante și cafenele din Timișoara. Descoperă locuri noi și savurează experiențe culinare unice!
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white transition-all text-lg"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FCFAF5';
                e.currentTarget.style.color = '#4AA5FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'white';
              }}
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}