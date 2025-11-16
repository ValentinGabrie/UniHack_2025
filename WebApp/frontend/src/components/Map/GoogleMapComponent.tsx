import { useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import type { Location } from '../../services/api';   // 👈 importăm tipul unic Location

interface GoogleMapComponentProps {
  locations: Location[];
  apiKey: string;
  onLocationClick?: (location: Location) => void;
}

export function GoogleMapComponent({ locations, apiKey, onLocationClick }: GoogleMapComponentProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const defaultCenter = {
    lat: 45.7537,
    lng: 21.2257
  };

  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedLocation(location);
    onLocationClick?.(location);
  }, [onLocationClick]);

  const getMarkerColor = (type?: string) => {
    switch (type) {
      case 'restaurant': return '#4AA5FF';
      case 'pub': return '#FC87F6';
      case 'bistro': return '#5ECCAD';
      case 'steakhouse': return '#FF2E1E';
      default: return '#FBED4F';
    }
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div className="w-full h-full rounded-3xl overflow-hidden">
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={14}
          mapId="DEMO_MAP_ID"
          style={{ width: '100%', height: '100%' }}
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          {locations.map((location) => (
            <AdvancedMarker
              key={location.id}
              position={{ lat: location.latitude, lng: location.longitude }}
              onClick={() => handleMarkerClick(location)}
            >
              <div
                className="w-8 h-8 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getMarkerColor(location.type) }}
              >
                📍
              </div>
            </AdvancedMarker>
          ))}

          {selectedLocation && (
            <InfoWindow
              position={{
                lat: selectedLocation.latitude,
                lng: selectedLocation.longitude
              }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="p-4 min-w-[200px]">
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'Retail Heavy, Montserrat, sans-serif' }}>
                  {selectedLocation.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{selectedLocation.address}</p>
                <p className="text-sm text-gray-600 mb-2">{selectedLocation.cuisine}</p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-bold">{selectedLocation.rating}</span>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
