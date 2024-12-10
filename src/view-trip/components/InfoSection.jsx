import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && getPlacePhotos();
  }, [trip]);

  const getPlacePhotos = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await getPlaceDetails(data).then((response) => {
      console.log(response);
      const PhotoUrl = PHOTO_URL_REFERENCE.replace(
        '{NAME}',
        response.data.places[0].photos[0].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <>
      {/* Image Section */}
      <div>
        <img
          src={photoUrl || '/trip1.avif'}
          className="h-[200px] sm:h-[300px] lg:h-[340px] w-full object-cover rounded-xl shadow-md "
          alt="Trip Location"
        />
      </div>

      {/* Info Section */}
      <div className="my-5 flex flex-col gap-4">
        <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl text-white">
          {trip?.userSelection?.location?.label}
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-3">
            <h2 className="p-2 px-3 bg-gray-800 rounded-full text-sm sm:text-base text-white">
              🗓️ No of days: {trip?.userSelection?.noOfDays}
            </h2>
            <h2 className="p-2 px-3 bg-gray-800 rounded-full text-sm sm:text-base text-white">
              💸 Budget: {trip?.userSelection?.Budget}
            </h2>
            <h2 className="p-2 px-3 bg-gray-800 rounded-full text-sm sm:text-base text-white">
              👬 No of travellers: {trip?.userSelection?.Traveler}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
