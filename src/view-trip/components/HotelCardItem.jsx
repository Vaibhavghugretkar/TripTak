import { getPlaceDetails, PHOTO_URL_REFERENCE } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && getPlacePhotos();
  }, [hotel]);

  const getPlacePhotos = async () => {
    const data = {
      textQuery: hotel?.HotelName,
    };
    try {
      const result = await getPlaceDetails(data);
      console.log(result);
      const PhotoUrl = PHOTO_URL_REFERENCE.replace(
        '{NAME}',
        result.data.places[0].photos[0].name
      );
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error('Error fetching place photos:', error);
    }
  };

  return (
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        hotel.HotelName +
        ',' +
        hotel?.HotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all shadow-md rounded-md mb-10 shadow-gray-800 mx-auto w-full max-w-sm sm:max-w-md h-[220px] sm:h-[250px]">
        {/* Responsive Image Section */}
        <img
          src={photoUrl || '/placeholder-image.webp'} // Fallback image
          className="rounded-t-md h-[120px] sm:h-[150px] w-full object-cover"
          alt={hotel.HotelName || 'Hotel Image'}
        />
        <div className="p-4 bg-gray-800 rounded-b-md h-[120px] sm:h-[150px] flex flex-col justify-between">
          <div className="mt-2 space-y-0.5">
            <h2 className="text-gray-400 text-xs sm:text-sm md:text-base truncate leading-tight">
              🏨 {hotel.HotelName}
            </h2>
            <h2 className="text-gray-400 text-xs sm:text-sm md:text-base truncate leading-tight">
              💸 {hotel.price}
            </h2>
            <h2 className="text-gray-400 text-xs sm:text-sm md:text-base truncate leading-tight">
              📍 {hotel.HotelAddress}
            </h2>
            <h2 className="text-gray-400 text-xs sm:text-sm md:text-base truncate leading-tight">
              ⭐ {hotel.rating}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}
