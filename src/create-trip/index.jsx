import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, exportTravelList, SelectBudgetOptions } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFromData] = useState([]);

  const handleInputChange = (name, value) => {
    setFromData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const onGenerateTrip = async () => {
    if (formData.noOfDays > 5 && !formData.Traveler || !formData.Budget || !formData.location) {
      console.log("Error in adding information");
      toast("Please fill all the fields correctly", {
        style: {
          backgroundColor: '#ff4d4d',
          fontWeight: 'bold',
        }
      });
      return
    }
    
console.log(formData)
const FINAL_PROMPT = AI_PROMPT
.replace('{location}', formData?.location?.label)
.replace('{totalDays}', formData?.noOfDays)
.replace('{traveler}', formData?.Traveler)
.replace('{budget}', formData?.Budget);

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
  }

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col items-center p-6">
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className="text-transparent text-center bg-clip-text bg-gradient-to-r from-purple-600 to-blue-700 text-[52px] font-bold mt-6">
          Let us know your preferences</h2>
        <p className='mt-3 text-gray-400 text-xl text-center'>Provide us with information, so that we can generate a perfect plan of your trip</p>


        <div className='mt-16 flex flex-col gap-9'>
          <div>
            <h2 className='text-xl my-3 font-medium text-white'>What is the destination of your choice?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v), handleInputChange('location', v) }
              }} />
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium text-white'>How days are you planning your trip?</h2>
            <Input placeholder="Ex.3" type="Number"
              onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
          </div>
        </div>

        <div className='mt-10 p-5'>
          <h2 className='text-xl my-3 font-medium text-white'>What is your budget?</h2>
          <p className='text-gray-500'>The budget includes only your activites and dining purpose</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 flex-wrap'>
            {SelectBudgetOptions.map((items, index) => (
              <div key={index}
                onClick={() => handleInputChange('Budget', items.title)}
                className={`text-white  cursor-pointer p-4 border text-center rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-sm hover:shadow-purple-200 hover:border-purple-700 ${formData?.Budget === items.title ? 'border border-purple-900 shadow-md shadow-purple-700' : ''}`}>
                <h2 className='text-4xl'>{items.icon}</h2>
                <h2 className='font-bold text-lg'>{items.title}</h2>
                <h2 className='text-gray-400 text-sm'>{items.desc}</h2>
              </div>
            ))}
          </div>
        </div>


        <div className='mt-10 p-5'>
          <h2 className='text-xl my-3 font-medium text-white'>Who are you travelling with?</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 flex-wrap'>
            {exportTravelList.map((items, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('Traveler', items.people)}
                className={`text-white  cursor-pointer p-4 border text-center rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-sm hover:shadow-purple-200 hover:border-purple-700 ${formData?.Traveler === items.people ? 'shadow-md border-purple-900  shadow-purple-700' : ''}`}>
                <h2 className='text-4xl'>{items.icon}</h2>
                <h2 className='font-bold text-lg'>{items.title}</h2>
                <h2 className='text-gray-400 text-sm'>{items.desc}</h2>
              </div>
            ))}
          </div>
          <Button className='p-6 text-md mt-10 bg-black hover:bg-black' onClick={onGenerateTrip}>Generate Trip</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateTrip