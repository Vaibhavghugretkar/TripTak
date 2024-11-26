import { getPlaceDetails, PHOTO_URL_REFERENCE } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'

export default function USerTripCardItem({trip}) {

    const [photoUrl, setPhotoUrl]= useState();

    useEffect(() => {
      trip && getPlacePhotos();
    }, [trip])
    


const getPlacePhotos = async() =>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await getPlaceDetails(data).then(response=>{
      console.log(response)
    const PhotoUrl=PHOTO_URL_REFERENCE.replace('{NAME}', response.data.places[0].photos[0].name);
    setPhotoUrl(PhotoUrl)
    })
  };



  return (
    <div>
        <img src={photoUrl?photoUrl:'/logo3.webp'} className='rounded-xl object-cover h-48 w-60 shadow-md'></img>
        <div>
            <h2 className='font-bold text-lg text-white'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.Budget} budget</h2>
        </div>
    </div>
  )
}
