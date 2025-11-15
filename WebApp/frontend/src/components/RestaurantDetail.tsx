import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Phone, Edit2, Save } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack: () => void;
  onSave: (updatedRestaurant: Restaurant) => void;
}

export function RestaurantDetail({ restaurant, onBack, onSave }: RestaurantDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState(restaurant);
  const [currentImageIndex] = useState(0);

  const handleSave = () => {
    onSave(editedRestaurant);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFAF5' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 relative z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-lg transition-colors"
          style={{ color: '#5ECCAD' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#FF2E1E'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#5ECCAD'}
        >
          <ArrowLeft className="w-5 h-5" />
          return
        </button>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="px-6 py-3 rounded-full transition-all flex items-center gap-2"
          style={{ backgroundColor: isEditing ? '#5ECCAD' : '#7C80F6', color: 'white' }}
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
                value={editedRestaurant.name}
                onChange={(e) => setEditedRestaurant({ ...editedRestaurant, name: e.target.value })}
                className="text-6xl md:text-8xl text-center w-full bg-transparent border-b-4 outline-none"
                style={{ color: '#5ECCAD', borderColor: '#5ECCAD' }}
              />
            ) : (
              <h1 className="text-6xl md:text-8xl" style={{ color: '#5ECCAD' }}>
                {restaurant.name}
              </h1>
            )}
            {/* Image carousel dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: index === currentImageIndex ? '#7C80F6' : '#E5E7EB'
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
                      src={editedRestaurant.image}
                      alt={editedRestaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <input
                        type="text"
                        value={editedRestaurant.image}
                        onChange={(e) => setEditedRestaurant({ ...editedRestaurant, image: e.target.value })}
                        placeholder="Image URL"
                        className="w-4/5 px-4 py-2 rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <ImageWithFallback
                    src={restaurant.image}
                    alt={restaurant.name}
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
                style={{ backgroundColor: '#7C80F6' }}
              >
                {/* Decorative cocktail illustration */}
                <div className="absolute top-8 right-8 w-24 h-24 opacity-30">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50 20 L30 60 L70 60 Z" fill="white" />
                    <circle cx="50" cy="40" r="5" fill="#5ECCAD" />
                    <rect x="48" y="60" width="4" height="30" fill="white" />
                    <ellipse cx="50" cy="92" rx="15" ry="3" fill="white" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-6 text-white">
                  {/* Address */}
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedRestaurant.address || ''}
                            onChange={(e) => setEditedRestaurant({ ...editedRestaurant, address: e.target.value })}
                            placeholder="Address"
                            className="w-full px-3 py-2 rounded-lg text-gray-800"
                          />
                        ) : (
                          <p className="text-lg">{restaurant.address || 'Address not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedRestaurant.phone || ''}
                          onChange={(e) => setEditedRestaurant({ ...editedRestaurant, phone: e.target.value })}
                          placeholder="Phone number"
                          className="flex-1 px-3 py-2 rounded-lg text-gray-800"
                        />
                      ) : (
                        <p className="text-lg">{restaurant.phone || '(+40) 123 456 789'}</p>
                      )}
                    </div>
                  </div>

                  {/* Hours */}
                  <div>
                    <p className="uppercase tracking-wider text-sm mb-2 opacity-90">Opening Hours</p>
                    {isEditing ? (
                      <textarea
                        value={editedRestaurant.hours || ''}
                        onChange={(e) => setEditedRestaurant({ ...editedRestaurant, hours: e.target.value })}
                        placeholder="e.g., Every day from 12:00 PM to 11:00 PM"
                        className="w-full px-3 py-2 rounded-lg text-gray-800 min-h-[80px]"
                      />
                    ) : (
                      <p className="text-lg">
                        {restaurant.hours || 'Every day from 12:00 PM to 11:00 PM'}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <p className="uppercase tracking-wider text-sm mb-2 opacity-90">Price Range</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedRestaurant.price || ''}
                        onChange={(e) => setEditedRestaurant({ ...editedRestaurant, price: e.target.value })}
                        placeholder="e.g., €€€"
                        className="w-full px-3 py-2 rounded-lg text-gray-800"
                      />
                    ) : (
                      <p className="text-3xl tracking-wider">{restaurant.price || '€€€'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl mb-4" style={{ color: '#FF2E1E' }}>About this place</h2>
              {isEditing ? (
                <textarea
                  value={editedRestaurant.description || ''}
                  onChange={(e) => setEditedRestaurant({ ...editedRestaurant, description: e.target.value })}
                  placeholder="Describe this restaurant... Share what makes it special, the atmosphere, signature dishes, wine selection, etc."
                  className="w-full px-4 py-4 border-2 rounded-xl min-h-[200px] focus:outline-none text-lg"
                  style={{ borderColor: '#7C80F6' }}
                />
              ) : (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {restaurant.description || 'Click Edit to add a description about this restaurant. Share what makes it special, the atmosphere, signature dishes, wine selection, and more!'}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
