import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, exportTravelList, SelectBudgetOptions } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import { AiOutlineLoading3Quarters } from "react-icons/ai";



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Dot, LogIn } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { setLogLevel } from 'firebase/app';
import { useNavigate } from 'react-router-dom';





function CreateTrip() {
  const [place, setPlace] = useState();
  const[dialogBox,setDialogBox]=useState(false);
  const [formData, setFromData] = useState([]);
  const [loading, setloading]=useState(false);

   const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFromData({
      ...formData,
      [name]: value
    })
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse)=> getUserInfo(codeResponse),
    onError: (error)=>console.log(error)
    
  })

  const getUserInfo = (tokenInfo) =>{ 
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, 
      {
        headers:{
          Authorization : `Bearer ${tokenInfo?.access_token}`,
          Accept : "application/json"
        }
      }
    ) .then((response)=>{
      // console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
      setDialogBox(false);
      onGenerateTrip();
    }) 
  }

  useEffect(() => {
    // console.log(formData);
  }, [formData])

  const onGenerateTrip = async () => {
      const user = localStorage.getItem("user");
      if(!user){
        setDialogBox(true);
        return;
      }

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
    setloading(true);
const FINAL_PROMPT = AI_PROMPT

.replace('{location}', formData?.location?.label)
.replace('{totalDays}', formData?.noOfDays)
.replace('{traveler}', formData?.Traveler)
.replace('{budget}', formData?.Budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result?.response?.text());
    setloading(false);
    saveAiTrip(result?.response.text());
  }


const saveAiTrip =async (TripData) =>{
  setloading(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const docID = Date.now().toString();
await setDoc(doc(db, "AiTrips", docID), {
    userSelection:formData,
    tripData:JSON.parse(TripData),
    userEmail:user?.email,
    id:docID

});
setloading(false);
navigate("/view-trip/"+docID)
}

  return (
    <div className="bg-gradient-to-t from-[#272735] to-[#1b1b27] min-h-screen flex flex-col items-center">
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
          <Button 
  className={`p-6 text-md mt-10 bg-black hover:bg-black flex items-center justify-center`}
  onClick={onGenerateTrip} 
  disabled={loading}
>
  {loading ?   <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" /> : "Generate Trip"}
</Button>
        </div>
      </div>
      <Dialog open={dialogBox}>
  <DialogContent>
    <DialogHeader>
      <img src='logo3.webp' className='w-14 h-14 rounded-full'></img>
      
      <DialogTitle>Sign in with Google</DialogTitle>
      <DialogDescription className="flex flex-col">
        Get connected through google securely

        <Button 
        className="mt-5 bg-zinc-900 hover:bg-zinc-950"
          onClick={login}>
          <FcGoogle/>Sign in with Google
          </Button>
      </DialogDescription>
      </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default CreateTrip