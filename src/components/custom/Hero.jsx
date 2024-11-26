import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function Hero() {
    return (
        <div
  className="bg-gradient-to-t from-[#272735] to-[#1b1b27] min-h-screen flex flex-col items-center">

            <h1 className="text-transparent text-center bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-700 text-[52px] font-bold mt-16 drop-shadow-md">
                Plan Your Trips with TripTak
            </h1>
            <p className='text-2xl mt-4 p-3 text-gray-400 text-center'>A website that is your personalized trip planner and tour guide, Wherever you wanna go !</p>
            <Link to={'/create-trip'}>
            <Button className='bg-[black] mt-10 hover:bg-black p-6 text-xl shadow-md'>Get Started</Button>
            </Link>
        </div>
    );
}

export default Hero;
