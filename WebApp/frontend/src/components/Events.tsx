import { useState } from 'react';
import { motion } from 'motion/react';
import { Page } from '../App';
import { Calendar, MapPin, Clock, Plus, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EventDetail } from './EventDetail';

interface EventsProps {
  onNavigate: (page: Page) => void;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  description?: string;
  time?: string;
  price?: string;
  capacity?: string;
  organizer?: string;
  website?: string;
}

export function Events({ onNavigate }: EventsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'AfterSunset Social - the big social',
      date: '15 November 2025',
      location: 'Restaurant Harmonia',
      image: 'https://images.unsplash.com/photo-1746003625451-fb19865e19b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBnYXRoZXJpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzYzMTUxODU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Seara de 15 noiembrie se deschide cu AfterSunset Social, o întâlnire vibrantă dedicată comunității urbane, în atmosfera elegantă a Restaurantului Harmonia. Muzică plăcută, conversații relaxate și un cadru cochet creează spațiul perfect pentru socializare după apus.'
    },
    {
      id: 2,
      title: 'Design Signals (Legături chimice)',
      date: '14-16 November 2025',
      location: 'Faber',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzYzMDM1NTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: `Ce fel de practici de design sunt posibile atunci când accesul este restricționat, când cunoașterea este fragmentată și când o întreagă industrie rămâne parțial invizibilă?

Cu aceste întrebări deschidem expoziția "Legături Chimice" în data de 26 septembrie la FABER, prin care investigăm industria chimică și potențialul designului de a interveni în procesele sale.

În cadrul programului Design Signals, continuăm procesul început în 2023 și anul acesta ne îndreptăm atenția spre această industrie complexă și fragmentată. Fiind una dintre cele mai importante și controversate ramuri industriale, aceasta produce materialele care modelează lumea din jurul nostru. Cunoașterea sa a transformat societatea timp de secole, iar impactul său se reflectă atât asupra corpurilor noastre, cât și asupra mediilor în care trăim, unde unde poluarea și soluțiile pentru a o reduce se regăsesc în același cadru de inovație.

Expoziția "Legături Chimice" investighează fluxurile de materiale, expertiză și forță de muncă în peisajul chimic, și ce perspective poate aduce designul în acest context. 🔬

Expoziția reunește lucrări realizate de designeri și cercetători, alături de un raport sociologic semnat de Norbert Petrovici, interviuri cu experți din industrie și foști muncitori din fabrici, documentație fotografică din vizite pe teren și o investigație jurnalistică despre diverse perspective ale tranziției verzi, plecând de la trei studii de caz. Proiectele expuse abordează politici de mediu, standarde de reglementare, valorificarea resurselor locale, dar și fragmentarea infrastructurii industriale și absența legăturilor dintre componentele lanțului de producție.

"Legături Chimice" nu oferă soluții, ci, prin practici contemporane de design, ridică întrebări, face vizibile părțile invizibile ale industriei și creează un cadru de discuții din care pot apărea noi perspective.

Program:
Vineri, 26 septembrie
19:30 – Vernisajul expoziției
20:00 – Concert Implant pentru Refuz

🧪 La vernisajul expoziției, lansăm și conceptul "The Kitchen", un spațiu nou unde vei descoperi combinații chimice dedicate papilelor tale gustative, care va funcționa în tandem cu expoziția "Legături Chimice".

Expoziția va rămâne deschisă până în data de 16 noiembrie și va putea fi vizitată de marți până vineri, între 12:00 – 20:00, sâmbătă între 11:00 – 22:00 și duminică între 11:00 – 18:00.

Curator: Martina Muzi
Designeri invitați: Gaia D'Arrigo, Anna Diljá Sigurðardóttir, Ro Perez Gayo, Audrey Large, Giacomo Nanni, Fidel Thomet, Julian Peschel (Krisenstab), Benedetta Pompili, Fabio Salvadori, Federico Santarini, Alexandra Spiridon, Alex Todirică, Susanna Tomassini, Andreea Tron

Conceput și produs de FABER`
    },
    {
      id: 3,
      title: 'Caravaggio',
      date: '19 November 2025',
      location: 'Teatrul Maghiar de Stat Timișoara',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzYzMDM1NTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Pe 19 noiembrie, scena Teatrului Maghiar se transformă într-un spectacol intens și dramatic inspirat de viața și arta lui Caravaggio. Jocurile de lumină, conflictul interior și frumusețea picturală sunt transpuse într-un spectacol teatral de mare forță emoțională.'
    },
    {
      id: 4,
      title: 'Timișoara Speed Puzzle Championship',
      date: '27 November 2025',
      location: 'TBA',
      image: 'https://images.unsplash.com/photo-1746003625451-fb19865e19b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBnYXRoZXJpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzYzMTUxODU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Tot pe 27 noiembrie, pasionații de puzzle se întrec în viteză și strategie în cadrul Timișoara Speed Puzzle Championship, un campionat care pune la încercare atenția, dexteritatea și spiritul competitiv.'
    },
    {
      id: 5,
      title: 'Neuroștiință și Sănătatea Mintală',
      date: '27 November 2025',
      location: 'TBA',
      image: 'https://images.unsplash.com/photo-1746003625451-fb19865e19b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBnYXRoZXJpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzYzMTUxODU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'În aceeași zi, un eveniment dedicat neuroștiinței și sănătății mentale aduce împreună specialiști și publicul larg pentru discuții despre echilibrul interior, funcționarea creierului și importanța îngrijirii minții în lumea modernă.'
    },
    {
      id: 6,
      title: 'Concert Vlad Corb',
      date: '28 November 2025',
      location: 'FIIT',
      image: 'https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc2MzExNzI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Pe 28 noiembrie, Vlad Corb urcă pe scena FIIT, oferind un concert plin de emoție, sensibilitate și energie artistică, într-un cadru dedicat comunității creative tinere din Timișoara.'
    },
    {
      id: 7,
      title: 'Bal Vienez',
      date: '28 November 2025',
      location: 'TBA',
      image: 'https://images.unsplash.com/photo-1746003625451-fb19865e19b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBnYXRoZXJpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzYzMTUxODU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Seara de 28 noiembrie continuă cu rafinament la Balul Vienez, un eveniment elegant, cu valsuri, ținute somptuoase și atmosfera clasică a balurilor imperiale.'
    },
    {
      id: 8,
      title: 'Concert de Crăciun André Rieu',
      date: '6 December 2025',
      location: 'Cinema Timis',
      image: 'https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc2MzExNzI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Spiritul sărbătorilor se aprinde pe 6 decembrie, când Cinema Timiș proiectează Concertul de Crăciun André Rieu, o experiență muzicală plină de magie, armonie și emoție festivă.'
    },
    {
      id: 9,
      title: 'Stand-up Comedy cu Sorin Pârcălab',
      date: '8 December 2025',
      location: 'TBA',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzYzMDM1NTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Încheierea perioadei vine cu un strop de umor: Sorin Pârcălab și alți comedianți aduc o seară de stand-up savuroasă, perfectă pentru relaxare și bună dispoziție.'
    }
  ]);

  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '', image: '', description: '' });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.location && newEvent.image) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      setNewEvent({ title: '', date: '', location: '', image: '', description: '' });
      setIsAddingEvent(false);
    }
  };

  const handleSaveEvent = (updatedEvent: Event) => {
    setEvents(events.map(e => 
      e.id === updatedEvent.id ? updatedEvent : e
    ));
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  // Show detail view if an event is selected
  if (selectedEvent) {
    return (
      <EventDetail
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
        onSave={(updated) => {
          handleSaveEvent(updated);
          setSelectedEvent(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFAF5' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[500px]" style={{
        background: 'linear-gradient(135deg, #7C80F6 0%, #4AA5FF 50%, #5ECCAD 100%)'
      }}>
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3" style={{ backgroundColor: '#FBED4F' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 -translate-x-1/3 translate-y-1/3" style={{ backgroundColor: '#FC87F6' }} />

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
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl md:text-6xl transition-colors hover:opacity-80"
                style={{ color: '#FBED4F', fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}
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

        {/* Hero Title */}
        <div className="relative z-10 flex items-center justify-center min-h-[500px]">
          <div className="text-center">
            <h1 className="text-white text-7xl md:text-9xl mb-4" style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>Events in</h1>
            <h1 className="text-7xl md:text-9xl" style={{ color: '#FBED4F', fontFamily: 'Retail Heavy, Montserrat, sans-serif', fontWeight: 900 }}>Timișoara</h1>
          </div>
        </div>
      </section>

      {/* Add Event Form */}
      {isAddingEvent && (
        <div className="container mx-auto px-8 mb-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2"
            style={{ borderColor: '#7C80F6' }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl" style={{ color: '#7C80F6' }}>Add New Event</h3>
              <button onClick={() => setIsAddingEvent(false)}>
                <X className="w-6 h-6" style={{ color: '#FF2E1E' }} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-opacity-100"
                style={{ borderColor: '#7C80F6', borderOpacity: 0.3 }}
              />
              <input
                type="text"
                placeholder="Date (e.g., 15 November 2025)"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none"
                style={{ borderColor: '#7C80F6', borderOpacity: 0.3 }}
              />
              <input
                type="text"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none"
                style={{ borderColor: '#7C80F6', borderOpacity: 0.3 }}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newEvent.image}
                onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none"
                style={{ borderColor: '#7C80F6', borderOpacity: 0.3 }}
              />
              <textarea
                placeholder="Description (optional)"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-xl min-h-[100px] focus:outline-none"
                style={{ borderColor: '#7C80F6', borderOpacity: 0.3 }}
              />
              <button
                onClick={handleAddEvent}
                className="w-full py-3 rounded-xl text-white transition-all"
                style={{ backgroundColor: '#5ECCAD' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FBED4F';
                  e.currentTarget.style.color = '#1F2937';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#5ECCAD';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Add Event
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Events Grid */}
      <div className="container mx-auto px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl mb-3" style={{ color: '#7C80F6' }}>{event.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" style={{ color: '#FF2E1E' }} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" style={{ color: '#4AA5FF' }} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-16 md:py-20 overflow-hidden flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #FC87F6 0%, #FF2E1E 100%)'
      }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 opacity-30" style={{ backgroundColor: '#FBED4F' }} />
        <div className="max-w-4xl mx-auto text-center px-6 md:px-12 relative z-10">
          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
            Stay updated with the latest events in Timișoara. From cultural performances to social gatherings, 
            discover what's happening in your city.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white transition-all text-lg"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FCFAF5';
              e.currentTarget.style.color = '#FC87F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = 'white';
            }}
          >
            Get in Touch
          </button>
        </div>
      </footer>
    </div>
  );
}