import { getPlaceDetails, PHOTO_URL_REFERENCE } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HotelCardItem({hotel}) {

    const [photoUrl, setPhotoUrl]= useState();

    useEffect(() => {
      hotel && getPlacePhotos();
    }, [hotel])
    


const getPlacePhotos = async() =>{
    const data={
      textQuery:hotel?.HotelName
    }
    const result = await getPlaceDetails(data).then(response=>{
      console.log(response)
    const PhotoUrl=PHOTO_URL_REFERENCE.replace('{NAME}', response.data.places[0].photos[0].name);
    setPhotoUrl(PhotoUrl)
    })
  };




  return (
    <Link
    to={
      "https://www.google.com/maps/search/?api=1&query=" +
      hotel.HotelName +
      "," +
      hotel?.HotelAddress
    }
    target="_blank"
  >
    <div className="hover:scale-105 transition-all shadow-md rounded-md shadow-gray-800 h-[360px]">
      <img src={photoUrl} className="rounded-md shadow-md h-[180px] w-full object-cover"></img>
      <div className="my-2 ">
        <h2 className="text-white font-medium mt-2">🏨{hotel.HotelName}</h2>
        <h2 className="text-gray-100 font-bold text-xs">
          🏨{hotel.Price}
        </h2>
        <h2 className="text-gray-400 text-xs mt-3">
          📍{hotel.HotelAddress}
        </h2>
        <h2 className="text-gray-400 text-xs">⭐ {hotel.rating}</h2>
      </div>
    </div>
  </Link>
  )
}
