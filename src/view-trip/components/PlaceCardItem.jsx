import { getPlaceDetails, PHOTO_URL_REFERENCE } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

export default function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder-image.webp');

  const normalizedPlace = {
    PlaceName: place?.PlaceName || place.placeName,
    PlaceDetails: place?.PlaceDetails || place.placeDetails,
    ticketPricing: place?.ticketPricing,
    timeToTravel: place?.timeToTravel || 'N/A',
  };

  useEffect(() => {
    if (normalizedPlace.PlaceName !== 'Unknown Place') {
      fetchPlacePhoto();
    }
  }, [normalizedPlace.PlaceName]);

  const fetchPlacePhoto = async () => {
    const data = {
      textQuery: normalizedPlace.PlaceName,
    };
    try {
      const response = await getPlaceDetails(data);
      const photoUrl = PHOTO_URL_REFERENCE.replace(
        '{NAME}',
        response.data?.places?.[0]?.photos?.[0]?.name || ''
      );
      setPhotoUrl(photoUrl || '/placeholder-image.webp');
    } catch (error) {
      console.error('Error fetching place photo:', error.message);
      setPhotoUrl('/placeholder-image.webp'); // Fallback in case of error
    }
  };

  return (
    <div className="flex flex-wrap sm:flex-no-wrap justify-between items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      {/* Text Section */}
      <div className="w-full sm:w-3/4 max-w-md">
        <h4 className="text-lg sm:text-xl font-bold text-white">
          {normalizedPlace.PlaceName}
        </h4>
        <p className="text-sm sm:text-base text-gray-300">
          {normalizedPlace.PlaceDetails}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          💵 Ticket Pricing: {normalizedPlace.ticketPricing}
        </p>
        <p className="text-sm text-gray-400">
          🕙 Time to Travel: {normalizedPlace.timeToTravel}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            normalizedPlace.PlaceName
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="bg-black hover:bg-black mt-3 flex items-center gap-2"
            aria-label={`View ${normalizedPlace.PlaceName} on Google Maps`}
          >
            <FaMapLocationDot />
            <span>View on Map</span>
          </Button>
        </a>
      </div>

      {/* Image Section */}
      <img
        src={photoUrl}
        alt={`Image of ${normalizedPlace.PlaceName}`}
        className="w-full sm:w-40 h-40 object-cover rounded-md shadow-md flex-shrink-0"
      />
    </div>
  );
}
