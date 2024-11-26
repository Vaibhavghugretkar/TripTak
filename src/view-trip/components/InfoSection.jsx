import { Button } from '@/components/ui/button'
import { getPlaceDetails, PHOTO_URL_REFERENCE } from '@/service/GlobalApi';
import React, {useState, useEffect} from 'react'
import { FaPaperPlane } from "react-icons/fa";

export default function InfoSection({trip}) {


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
    <>
    <div>
    <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl '></img>
    </div>


    <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl text-white'>{trip?.userSelection?.location?.label}</h2>
        <div className='flex justify-between'>
        <div className='flex gap-5 mt-6'>
            <h2 className='p-2 px-3 bg-gray-800 rounded-full text-white'>🗓️ No of days : {trip?.userSelection?.noOfDays}</h2>
            <h2 className='p-2 px-3 bg-gray-800 rounded-full text-white'>💸 Budget : {trip?.userSelection?.Budget}</h2>
            <h2 className='p-2 px-3 bg-gray-800 rounded-full text-white'>👬 No of travellers:  {trip?.userSelection?.Traveler}</h2>
            <Button className="bg-black hover:bg-black"><FaPaperPlane /></Button>
        </div>
    </div>
 </div>
    </>
  )
}
