import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import USerTripCardItem from './Components/USerTripCardItem';

export default function Mytrips() {
  const navigation = useNavigation();  
  const [userTrip, setUserTrip] = useState([]);

  useEffect(() => {
    getUserTrip();
  }, []);

  const getUserTrip = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      navigation('/');
      return;
    }

    // Reset state to ensure previous trips do not persist
    setUserTrip([]);
    
    const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    
    // Use an array to gather the trips data
    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      trips.push(doc.data()); // Store each trip in the array
    });

    // Once all trips are gathered, update the state in one go
    setUserTrip(trips);
  };

  return (
    <div className="bg-[#1E1E1E] min-h-screen p-6">
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='text-5xl font-bold text-white text-center'>My Trips</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
          {userTrip.length>0?userTrip.map((trip, index) => (
            <div key={index}>
              <USerTripCardItem trip={trip} key={index}/>
            </div>
          )):
          [1,2,3].map((item,index)=>(
            <div key={index} className='h-52 w-full bg-slate-300 animate-pulse rounded-md'>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
}
