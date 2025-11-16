import { useState, useEffect } from 'react';
import { Page } from '../App';
import { MapPin, List } from 'lucide-react';
import { api } from '../services/api';
import type { Location } from '../services/api';
import { GoogleMapComponent } from '../components/Map/GoogleMapComponent';

interface MapPageProps {
  onNavigate: (page: Page) => void;
}

export function MapPage({ onNavigate }: MapPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [types, setTypes] = useState<string[]>([]);

  // Google Maps API Key - REPLACE WITH YOUR KEY!
  const GOOGLE_MAPS_API_KEY = 'AIzaSyBdWDGB5zLleJZtgPzr9vt2LdJRu0QwkcQ';

  useEffect(() => {
    loadLocations();
    loadTypes();
  }, []);

  const loadLocations = async (type?: string) => {
    try {
      setLoading(true);

      const params = type && type !== 'all' ? { type } : {};

      // 👇 aici folosim api.locations.getAll, definit în api.ts
      const response = await api.locations.getAll(params);
      setLocations(response.data);
      setError(null);
    } catch (err) {
      console.error('Error loading locations:', err);
      setError('Nu s-au putut încărca locațiile');
    } finally {
      setLoading(false);
    }
  };

  const loadTypes = async () => {
    try {
      // 👇 aici folosim api.locations.getTypes, definit în api.ts
      const response = await api.locations.getTypes();
      setTypes(['all', ...response.data]);
    } catch (err) {
      console.error('Error loading types:', err);
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    loadLocations(type);
  };

  // Lăsăm TS să deducă tipul lui `location` din props-urile lui GoogleMapComponent,
  // ca să nu mai intre în conflict cu alte definiții de `Location`
  const handleLocationClick = (location: Location) => {
    console.log('Selected location:', location);
    // You can add more functionality here, like showing details
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFAF5' }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden min-h-[400px]"
        style={{
          background:
            'linear-gradient(135deg, #4AA5FF 0%, #5ECCAD 50%, #FBED4F 100%)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3"
          style={{ backgroundColor: '#FC87F6' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 -translate-x-1/3 translate-y-1/3"
          style={{ backgroundColor: '#7C80F6' }}
        />

        {/* Header */}
        <header className="relative z-20 flex items-center justify-end px-12 py-10">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white px-8 py-4 rounded-full hover:opacity-90 transition-all text-lg"
            style={{ backgroundColor: '#4AA5FF' }}
          >
            Menu
          </button>
        </header>

        {/* Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(74, 165, 255, 0.5)' }}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-white text-6xl hover:text-yellow-300 transition-colors"
            >
              ×
            </button>
            <nav className="flex flex-col items-center gap-8">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white transition-colors hover:opacity-80"
                style={{
                  fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                  fontWeight: 900,
                }}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('events');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white transition-colors hover:opacity-80"
                style={{
                  fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                  fontWeight: 900,
                }}
              >
                Events
              </button>
              <button
                onClick={() => {
                  onNavigate('spots');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white transition-colors hover:opacity-80"
                style={{
                  fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                  fontWeight: 900,
                }}
              >
                Best Spots
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-6xl transition-colors hover:opacity-80"
                style={{
                  color: '#FBED4F',
                  fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                  fontWeight: 900,
                }}
              >
                Map
              </button>
              <button
                onClick={() => {
                  onNavigate('contact');
                  setIsMenuOpen(false);
                }}
                className="text-6xl text-white transition-colors hover:opacity-80"
                style={{
                  fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                  fontWeight: 900,
                }}
              >
                Contact
              </button>
            </nav>
          </div>
        )}

        {/* Hero Title */}
        <div className="relative z-10 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1
              className="text-white text-7xl md:text-9xl mb-4"
              style={{
                fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                fontWeight: 900,
              }}
            >
              Interactive
            </h1>
            <h1
              className="text-7xl md:text-9xl"
              style={{
                color: '#FBED4F',
                fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                fontWeight: 900,
              }}
            >
              Map
            </h1>
          </div>
        </div>
      </section>

      {/* Filter and View Controls */}
      <div className="container mx-auto px-8 pt-8 flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-6 py-3 rounded-full transition-all shadow-lg ${
                selectedType === type
                  ? 'text-white'
                  : 'text-gray-700 bg-white'
              }`}
              style={{
                backgroundColor:
                  selectedType === type ? '#4AA5FF' : undefined,
              }}
            >
              {type === 'all'
                ? 'Toate'
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('spots')}
            className="p-3 border-2 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
            style={{ borderColor: '#4AA5FF', color: '#4AA5FF' }}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            className="p-3 text-white rounded-full"
            style={{ backgroundColor: '#4AA5FF' }}
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="container mx-auto px-8 py-8 text-center">
          <p className="text-xl text-gray-600">
            Se încarcă locațiile...
          </p>
        </div>
      )}

      {error && (
        <div className="container mx-auto px-8 py-8">
          <div className="bg-red-100 border-2 border-red-400 rounded-2xl p-6 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      {!loading && !error && (
        <div className="container mx-auto px-8 py-8">
          <div
            className="relative w-full h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4"
            style={{ borderColor: '#4AA5FF' }}
          >
            <GoogleMapComponent
              locations={locations}
              apiKey={GOOGLE_MAPS_API_KEY}
              onLocationClick={handleLocationClick}
            />

            {/* Location Count Badge */}
            <div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded-full shadow-lg z-10"
              style={{ backgroundColor: '#4AA5FF' }}
            >
              📍 {locations.length} locații în Timișoara
            </div>
          </div>

          {/* Location Legend */}
          <div
            className="mt-6 bg-white rounded-3xl shadow-lg p-6 border-4"
            style={{ borderColor: '#5ECCAD' }}
          >
            <h3
              className="text-3xl text-gray-800 mb-6"
              style={{
                fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                fontWeight: 900,
              }}
            >
              Toate Locațiile ({locations.length})
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center justify-between p-4 rounded-2xl hover:shadow-lg transition-all cursor-pointer border-2"
                  style={{
                    backgroundColor: '#FCFAF5',
                    borderColor: '#5ECCAD',
                  }}
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: '#4AA5FF' }}
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">
                        {location.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {location.cuisine}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-bold text-gray-800">
                      {location.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className="relative py-16 overflow-hidden mt-12"
        style={{
          background:
            'linear-gradient(135deg, #4AA5FF 0%, #5ECCAD 100%)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 opacity-30"
          style={{ backgroundColor: '#FBED4F' }}
        />
        <div className="container mx-auto px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white text-xl mb-8 leading-relaxed">
              Explorează cele mai bune restaurante și cafenele din
              Timișoara. Descoperă locuri noi și savurează experiențe
              culinare unice!
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white transition-all text-lg"
              style={{
                fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                fontWeight: 900,
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
