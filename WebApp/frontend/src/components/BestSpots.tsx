import { useState } from 'react';
import { motion } from 'motion/react';
import { Page } from '../App';
import { List, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RestaurantDetail } from './RestaurantDetail';

interface BestSpotsProps {
  onNavigate: (page: Page) => void;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  description?: string;
  address?: string;
  phone?: string;
  hours?: string;
  price?: string;
  website?: string;
}

export function BestSpots({ onNavigate }: BestSpotsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: 'Suta de grame',
      cuisine: 'Romanian',
      rating: 9.5,
      image: 'figma:asset/17707287ba9c75501093a1940f191732337ef013.png',
      description: 'Un loc super lejer unde găsești chestii bune și rapide, perfect pentru când vrei să mănânci ceva fresh fără complicații. Atmosfera e chill total.',
      address: 'Timișoara',
      phone: '(+40) 256 XXX XXX',
      hours: 'Monday - Sunday: 12:00 PM - 11:00 PM',
      price: '€€',
      website: ''
    },
    {
      id: 2,
      name: "80's pub",
      cuisine: 'Pub',
      rating: 9,
      image: 'https://images.unsplash.com/photo-1675419092955-3dfff1351e01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWIlMjBiYXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjMxNTI1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Pub cu vibe retro, muzică mișto și bere bună. Genul de loc unde mergi cu gașca și stai la povești.',
      address: 'Timișoara',
      phone: '(+40) 256 XXX XXX',
      hours: 'Monday - Sunday: 4:00 PM - 2:00 AM',
      price: '€',
      website: ''
    },
    {
      id: 3,
      name: "Jack's bistro",
      cuisine: 'Bistro',
      rating: 9.5,
      image: 'https://images.unsplash.com/photo-1724589511191-1ced6d014934?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXN0cm8lMjBkaW5pbmd8ZW58MXx8fHwxNzYzMDUwMzgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Bistro cozy cu mâncare bună de tot — burgeri, paste, chestii clasice. Totul într-o atmosferă relaxată și friendly.',
      address: 'Timișoara',
      phone: '(+40) 256 XXX XXX',
      hours: 'Tuesday - Sunday: 11:00 AM - 10:00 PM',
      price: '€€',
      website: ''
    },
    {
      id: 4,
      name: 'Little Hanoi',
      cuisine: 'Vietnamese',
      rating: 9,
      image: 'https://images.unsplash.com/photo-1672305330907-8092be9161ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjMxNTI1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Un spot vietnamez super aromat, cu supe și wok-uri care chiar au gust autentic. Ideal când ai chef de ceva fresh și ușor exotic.',
      address: 'Timișoara',
      phone: '(+40) 256 XXX XXX',
      hours: 'Monday - Saturday: 12:00 PM - 10:00 PM',
      price: '€€',
      website: ''
    },
    {
      id: 5,
      name: 'Riyo',
      cuisine: 'Japanese',
      rating: 9.5,
      image: 'https://images.unsplash.com/photo-1730325559618-940c72290ef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlfGVufDF8fHx8MTc2MzA4MzYzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Restaurant cu influențe asiatice, modern și aranjat frumos. Mâncarea e gustoasă și un pic „fancy", dar fără să fie pretențios.',
      address: 'Timișoara',
      phone: '(+40) 256 XXX XXX',
      hours: 'Every day: 12:00 PM - 11:00 PM',
      price: '€€€',
      website: ''
    },
    {
      id: 6,
      name: 'La Focacceria',
      cuisine: 'Italian',
      rating: 9,
      image: 'https://images.unsplash.com/photo-1646851035330-f35fa5b44beb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwZm9jYWNjaWF8ZW58MXx8fHwxNzYzMTUyNTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Locul ăla unde miroase a focaccia proaspătă din momentul în care intri. Simplu, bun și perfect pentru o gustare rapidă.',
      address: 'Timișoara',
      phone: '(+40) 256 XXX XXX',
      hours: 'Monday - Sunday: 11:00 AM - 11:00 PM',
      price: '€€',
      website: ''
    },
    {
      id: 7,
      name: 'Hype culture',
      cuisine: 'Modern',
      rating: 9,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MzAzODg2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Un restaurant-lounge super trendy, cu mâncare bună și atmosferă de „hai să ne simțim bine". Perfect pentru o ieșire mai stylish.',
      address: 'Timișoara',
      phone: '(+40) 256 XXX XXX',
      hours: 'Every day: 10:00 AM - 12:00 AM',
      price: '€€€',
      website: ''
    },
    {
      id: 8,
      name: 'Eat like a man',
      cuisine: 'Steakhouse',
      rating: 9.5,
      image: 'https://images.unsplash.com/photo-1611038333075-2efd28705f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVha2hvdXNlJTIwbWVhdHxlbnwxfHx8fDE3NjMxNTI1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Aici găsești mâncare serioasă: burgeri mari, porții mari, totul cu mult gust. Ideal când ți-e foame rău.',
      address: 'Timișoara',
      phone: '(+40) 256 XXX XXX',
      hours: 'Monday - Sunday: 12:00 PM - 11:30 PM',
      price: '€€',
      website: ''
    },
    {
      id: 9,
      name: 'Why pizza',
      cuisine: 'Pizza',
      rating: 9,
      image: 'https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYzMTM0ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Pizzerie modernă cu combinații faine și aluat bun. Un loc unde mergi când vrei pizza „altfel".',
      address: 'Timișoara',
      phone: '(+40) 256 XXX XXX',
      hours: 'Every day: 11:00 AM - 11:00 PM',
      price: '€€',
      website: ''
    },
    {
      id: 10,
      name: 'Taverna racilor',
      cuisine: 'Seafood',
      rating: 9.5,
      image: 'https://images.unsplash.com/photo-1672636402078-4b957a572e4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjMxMTU0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Restaurant cu fructe de mare, simplu și gustos. Dacă îți plac racii și preparatele fresh, aici e locul perfect.',
      address: 'Timișoara',
      phone: '(+40) 256 XXX XXX',
      hours: 'Tuesday - Sunday: 12:00 PM - 10:00 PM',
      price: '€€€',
      website: ''
    }
  ]);

  const handleSaveRestaurant = (updatedRestaurant: Restaurant) => {
    setRestaurants(restaurants.map(r => 
      r.id === updatedRestaurant.id ? updatedRestaurant : r
    ));
  };

  // Show detail view if a restaurant is selected
  if (selectedRestaurant) {
    return (
      <RestaurantDetail
        restaurant={selectedRestaurant}
        onBack={() => setSelectedRestaurant(null)}
        onSave={(updated) => {
          handleSaveRestaurant(updated);
          setSelectedRestaurant(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFAF5' }}>
      {/* Hero Section with Multiple Organic Images */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#FC87F6' }}>
        {/* Header */}
        <header className="relative z-20 flex items-center justify-end px-20 py-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white px-8 py-4 rounded-full hover:opacity-90 transition-all text-lg"
              style={{ backgroundColor: '#5ECCAD' }}
            >
              Menu
            </button>
          </div>
        </header>

        {/* Container for centered content */}
        <div className="max-w-7xl mx-auto px-20">
          {/* Organic Shaped Images */}
          <div className="relative h-80 mb-12">
            {/* Image 1 - Top Left */}
            <div 
              className="absolute w-96 h-64 overflow-hidden"
              style={{
                top: '0',
                left: '5%',
                clipPath: 'ellipse(45% 50% at 50% 50%)',
                transform: 'rotate(-5deg)'
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1642653393460-15e0e8062b25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjByZXN0YXVyYW50JTIwdGFibGV8ZW58MXx8fHwxNzYzMTU2NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Restaurant scene"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 - Top Center */}
            <div 
              className="absolute w-80 h-56 overflow-hidden"
              style={{
                top: '-40px',
                left: '50%',
                transform: 'translateX(-50%) rotate(8deg)',
                clipPath: 'ellipse(48% 52% at 50% 50%)'
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1676300185004-c31cf62d3bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzaCUyMGdvdXJtZXR8ZW58MXx8fHwxNzYzMTU2NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gourmet dish"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 3 - Top Right */}
            <div 
              className="absolute w-96 h-60 overflow-hidden"
              style={{
                top: '20px',
                right: '8%',
                clipPath: 'ellipse(47% 53% at 50% 50%)',
                transform: 'rotate(-3deg)'
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1632840766469-9897a845c514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2luZSUyMGRpbmluZ3xlbnwxfHx8fDE3NjMxNTY3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Wine and dining"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 4 - Bottom Right */}
            <div 
              className="absolute w-80 h-64 overflow-hidden"
              style={{
                bottom: '-100px',
                right: '15%',
                clipPath: 'ellipse(50% 48% at 50% 50%)',
                transform: 'rotate(5deg)'
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1512654448383-47b2fe224e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBldGl6ZXIlMjBwbGF0ZXxlbnwxfHx8fDE3NjMxNTY3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Appetizer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Pink Section with Title */}
          <div className="pb-32 flex justify-center">
            <h1 
              className="text-9xl tracking-tight text-center"
              style={{ 
                fontFamily: 'Retail Heavy, Montserrat, sans-serif',
                fontWeight: 900,
                lineHeight: '0.9'
              }}
            >
              <span className="text-white">Best</span>
              <br />
              <span className="relative inline-block">
                <span className="text-white relative z-10">spots</span>
                <span 
                  className="absolute -bottom-2 left-0 w-full h-6 -z-0"
                  style={{ backgroundColor: '#FBED4F' }}
                />
              </span>
              <span className="text-white"> in</span>
              <br />
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: '#5ECCAD' }}>Timișoara</span>
                <span 
                  className="absolute -bottom-2 left-0 w-full h-6 -z-0"
                  style={{ backgroundColor: '#4AA5FF' }}
                />
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(124, 128, 246, 0.5)' }}>
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
              onClick={() => setIsMenuOpen(false)}
              className="text-5xl md:text-6xl transition-colors hover:opacity-80"
              style={{ color: '#FBED4F', fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
            >
              Best Spots
            </button>
            <button
              onClick={() => {
                onNavigate('map');
                setIsMenuOpen(false);
              }}
              className="text-5xl md:text-6xl text-white transition-colors hover:opacity-80"
              style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
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

      {/* Filter and View Controls */}
      <div className="container mx-auto px-8 mb-8 flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-2">
          <button className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors">
            Filter by desire, type, price...
          </button>
          <button className="px-6 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            Takeaway
          </button>
          <button className="px-6 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            Terrasse
          </button>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors">
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="p-3 border-2 border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Spots Grid */}
      <div className="container mx-auto px-8 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-12 pb-32">
        {restaurants.map((spot, index) => (
          <motion.div
            key={spot.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group cursor-pointer flex flex-col items-center"
            onClick={() => setSelectedRestaurant(spot)}
          >
            {/* Organic blob shape with image */}
            <div className="relative aspect-[4/3] w-full max-w-sm rounded-[50%] overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
              <ImageWithFallback
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text content centered */}
            <div className="mt-6 text-center">
              <h3 className="text-3xl mb-2" style={{ color: '#4AA5FF' }}>{spot.name}</h3>
              <p className="text-gray-600 leading-relaxed">{spot.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-pink-400 to-pink-500 py-16 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-300 rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="flex justify-between items-start">
            <div className="text-gray-800 max-w-md">
            </div>
            <div className="text-right">
              <div className="flex gap-4 justify-end">
                <button className="text-gray-800 hover:text-gray-600">Instagram</button>
                <button className="text-gray-800 hover:text-gray-600">Map</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}