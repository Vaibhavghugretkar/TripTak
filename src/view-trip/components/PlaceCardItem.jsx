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
      textQuery: place.placeName,
    };
    try {
      const response = await getPlaceDetails(data);
      const photoUrl = PHOTO_URL_REFERENCE.replace(
        '{NAME}',
        response.data?.places?.[0]?.photos?.[0]?.name || ''
      );
      setPhotoUrl(photoUrl || '/placeholder-image.webp');
    } catch (error) {
      console.error('Error fetching place photo:', error);
    }
  };

  return (
    <div className="flex flex-wrap sm:flex-no-wrap justify-between items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      {/* Text Section */}
      <div className="w-full sm:w-3/4">
        <h4 className="text-lg sm:text-xl font-bold text-white">
          {place.placeName}
        </h4>
        <p className="text-sm sm:text-base text-gray-300">{place.PlaceDetails}</p>
        <p className="text-sm text-gray-400 mt-2">
          💵 Ticket Pricing: {place.ticketPricing || 'N/A'}
        </p>
        <p className="text-sm text-gray-400">
          🕙 Time to Travel: {place.timeToTravel || 'N/A'}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-black hover:bg-black mt-3 flex items-center gap-2">
            <FaMapLocationDot />
            <span>View on Map</span>
          </Button>
        </a>
      </div>

      {/* Image Section */}
      <img
        src={photoUrl}
        alt="place"
        className="w-full sm:w-40 h-40 object-cover rounded-md shadow-md"
      />
    </div>
  );
}
