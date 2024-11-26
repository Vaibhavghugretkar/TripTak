import { getPlaceDetails, PHOTO_URL_REFERENCE } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

export default function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder-image.webp');

  useEffect(() => {
    if (place) {
      fetchPlacePhoto();
    }
  }, [place]);

  const fetchPlacePhoto = async () => {
    const data = {
      textQuery: place.PlaceName,
    };
    try {
      const response = await getPlaceDetails(data);
      const photoUrl = PHOTO_URL_REFERENCE.replace(
        '{NAME}',
        response.data?.places?.[0]?.photos?.[0]?.name || ''
      );
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error('Error fetching place photo:', error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
      <div className="w-3/4">
        <h4 className="text-xl font-bold">{place.PlaceName}</h4>
        <p>{place.PlaceDetails}</p>
        <p className="text-sm text-gray-400">
          💵 Ticket Pricing: {place.ticketPricing || 'N/A'}
        </p>
        <p className="text-sm text-gray-400">
          🕙 Time to Travel: {place.timeToTravel || 'N/A'}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.PlaceName)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-black hover:bg-black mt-3">
            <FaMapLocationDot />
          </Button>
        </a>
      </div>
      <img
        src={photoUrl}
        alt={place.PlaceName}
        className="w-40 h-40 rounded-md shadow-md"
      />
    </div>
  );
}
