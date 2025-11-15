import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Edit2, Save, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface EventDetailProps {
  event: Event;
  onBack: () => void;
  onSave: (updatedEvent: Event) => void;
}

export function EventDetail({ event, onBack, onSave }: EventDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);
  const [currentImageIndex] = useState(0);

  const handleSave = () => {
    onSave(editedEvent);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFAF5' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 relative z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-lg transition-colors"
          style={{ color: '#FC87F6' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#FF2E1E'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#FC87F6'}
        >
          <ArrowLeft className="w-5 h-5" />
          return
        </button>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="px-6 py-3 rounded-full transition-all flex items-center gap-2"
          style={{ backgroundColor: isEditing ? '#5ECCAD' : '#FC87F6', color: 'white' }}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit
            </>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title Section */}
          <div className="text-center mb-8">
            {isEditing ? (
              <input
                type="text"
                value={editedEvent.title}
                onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                className="text-5xl md:text-7xl text-center w-full bg-transparent border-b-4 outline-none px-4"
                style={{ color: '#FC87F6', borderColor: '#FC87F6' }}
              />
            ) : (
              <h1 className="text-5xl md:text-7xl" style={{ color: '#FC87F6' }}>
                {event.title}
              </h1>
            )}
            {/* Image carousel dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: index === currentImageIndex ? '#FF2E1E' : '#E5E7EB'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content Layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
            {/* Left - Large Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-[80px] overflow-hidden shadow-2xl">
                {isEditing ? (
                  <div className="relative w-full h-full">
                    <ImageWithFallback
                      src={editedEvent.image}
                      alt={editedEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <input
                        type="text"
                        value={editedEvent.image}
                        onChange={(e) => setEditedEvent({ ...editedEvent, image: e.target.value })}
                        placeholder="Image URL"
                        className="w-4/5 px-4 py-2 rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Right - Info Blob */}
            <div className="relative">
              {/* Large colored blob */}
              <div
                className="rounded-[80px] p-12 relative overflow-hidden shadow-2xl"
                style={{ backgroundColor: '#4AA5FF' }}
              >
                {/* Decorative music note illustration */}
                <div className="absolute top-8 right-8 w-24 h-24 opacity-30">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="30" cy="70" r="12" fill="white" />
                    <circle cx="60" cy="60" r="12" fill="white" />
                    <rect x="28" y="30" width="4" height="40" fill="white" />
                    <rect x="58" y="20" width="4" height="40" fill="white" />
                    <path d="M32 30 Q45 25 62 20" stroke="white" strokeWidth="4" fill="none" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-6 text-white">
                  {/* Date */}
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <Calendar className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedEvent.date || ''}
                            onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                            placeholder="Date"
                            className="w-full px-3 py-2 rounded-lg text-gray-800"
                          />
                        ) : (
                          <p className="text-lg">{event.date}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedEvent.time || ''}
                          onChange={(e) => setEditedEvent({ ...editedEvent, time: e.target.value })}
                          placeholder="Time (e.g., 7:00 PM - 11:00 PM)"
                          className="flex-1 px-3 py-2 rounded-lg text-gray-800"
                        />
                      ) : (
                        <p className="text-lg">{event.time || '7:00 PM - 11:00 PM'}</p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="uppercase tracking-wider text-sm mb-2 opacity-90">Location</p>
                    {isEditing ? (
                      <input
                        value={editedEvent.location || ''}
                        onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
                        placeholder="Venue name and address"
                        className="w-full px-3 py-2 rounded-lg text-gray-800"
                      />
                    ) : (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                        <p className="text-lg">{event.location}</p>
                      </div>
                    )}
                  </div>

                  {/* Capacity */}
                  <div>
                    <p className="uppercase tracking-wider text-sm mb-2 opacity-90">Capacity</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedEvent.capacity || ''}
                        onChange={(e) => setEditedEvent({ ...editedEvent, capacity: e.target.value })}
                        placeholder="e.g., 200 people"
                        className="w-full px-3 py-2 rounded-lg text-gray-800"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <p className="text-lg">{event.capacity || '200 people'}</p>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <p className="uppercase tracking-wider text-sm mb-2 opacity-90">Ticket Price</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedEvent.price || ''}
                        onChange={(e) => setEditedEvent({ ...editedEvent, price: e.target.value })}
                        placeholder="e.g., Free / 50 RON / 100-150 RON"
                        className="w-full px-3 py-2 rounded-lg text-gray-800"
                      />
                    ) : (
                      <p className="text-2xl tracking-wider">{event.price || 'Free Entry'}</p>
                    )}
                  </div>

                  {/* Website/Tickets */}
                  <div>
                    <p className="uppercase tracking-wider text-sm mb-2 opacity-90">More Info</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedEvent.website || ''}
                        onChange={(e) => setEditedEvent({ ...editedEvent, website: e.target.value })}
                        placeholder="Website or ticket URL"
                        className="w-full px-3 py-2 rounded-lg text-gray-800"
                      />
                    ) : (
                      <a
                        href={event.website || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg hover:underline flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {event.website || 'Get Tickets'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              {/* Tags - only for certain events */}
              {event.id === 2 && (
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: '#FCFAF5', border: '1px solid #E5E7EB' }}>
                    Design Exhibition
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: '#FCFAF5', border: '1px solid #E5E7EB' }}>
                    Contemporary Art
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: '#FCFAF5', border: '1px solid #E5E7EB' }}>
                    Chemical Industry
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: '#FCFAF5', border: '1px solid #E5E7EB' }}>
                    Research
                  </span>
                </div>
              )}
              
              {isEditing ? (
                <textarea
                  value={editedEvent.description || ''}
                  onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
                  placeholder="Describe this event... What can attendees expect? Who are the performers or speakers? What makes this event special?"
                  className="w-full px-4 py-4 border-2 rounded-xl min-h-[200px] focus:outline-none text-lg"
                  style={{ borderColor: '#FC87F6' }}
                />
              ) : (
                <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                  {event.description ? (
                    event.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    'Click Edit to add a description about this event. What can attendees expect? Who are the performers or speakers? What makes this event special?'
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}