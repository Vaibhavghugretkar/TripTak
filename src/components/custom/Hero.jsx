import React from 'react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import App from '@/constants/App';
import { toast } from 'sonner';
import Footer from '@/view-trip/components/Footer';





function Hero() {
    const user = localStorage.getItem("user");
    const navigate = useNavigate();

    const handleClick=()=>{
        if(user)
        {
            console.log(user);
            navigate('/create-trip');
        }
        else{
            toast("Please login to start planning your trip", {
                style: {
                  backgroundColor: '#ff4d4d',
                  fontWeight: 'bold',
                }
              })
        }
    }
    return (  
        <div className="bg-gradient-to-t from-[#272735] to-[#1b1b27] h-auto md:h-[40 rem] w-auto min-h-screen overflow-hidden flex flex-col items-center">

<h1 className="text-transparent text-center bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-700 
    text-[36px] sm:text-[40px] md:text-[52px] font-bold mt-16 drop-shadow-md">                Plan Your Trips with TripTak
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mt-4 p-3 text-gray-400 text-center">
    A website that is your personalized trip planner and tour guide, Wherever you wanna go!
</p>
            <Button className='bg-[black] mt-10 hover:bg-black p-6 text-xl shadow-md'onClick={handleClick}>Generate Trip</Button>
            <App/>
            <Footer/>
        </div>
    );
}

export default Hero;