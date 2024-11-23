import { Button } from '@/components/ui/button'
import React from 'react'
import { FaPaperPlane } from "react-icons/fa";


export default function InfoSection({trip}) {
  return (
    <>
    <div>
    <img src='/aiTrip.avif' className='h-[340px] w-full object-cover rounded-xl '></img>
    </div>


    <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl text-white'>{trip?.userSelection?.location?.label}</h2>
        <div className='flex justify-between'>
        <div className='flex gap-5 mt-6'>
            <h2 className='p-1 px-3 bg-gray-700 rounded-full text-white'>🗓️ No of days : {trip?.userSelection?.noOfDays}</h2>
            <h2 className='p-1 px-3 bg-gray-700 rounded-full text-white'>💸 Budget : {trip?.userSelection?.Budget}</h2>
            <h2 className='p-1 px-3 bg-gray-700 rounded-full text-white'>👬 No of travellers:  {trip?.userSelection?.Traveler}</h2>
            <Button className="bg-black hover:bg-black"><FaPaperPlane /></Button>
        </div>
    </div>
 </div>
    </>
  )
}
