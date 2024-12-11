import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import USerTripCardItem from './Components/USerTripCardItem';
import App from './Components/App';
import Footer from '@/view-trip/components/Footer';
import Header from '@/components/custom/Header';

export default function Mytrips() {
  const navigate = useNavigate();
  const [userTrip, setUserTrip] = useState([]);
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    getUserTrip();
  }, []);

  const getUserTrip = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      navigate('/');
      return;
    }

    setUserTrip([]);
    setLoading(true); // Set loading to true before fetching data
    
    const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });

    setUserTrip(trips);
    setLoading(false); // Set loading to false once data is fetched
  };

  return (
    <>
    <Header/>
    <div className="bg-gradient-to-t from-[#272735] to-[#1b1b27] min-h-screen items-center">
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5'>
        <h2 className='text-4xl sm:text-5xl md:text-6xl p-2 text-transparent font-bold text-center bg-clip-text bg-gradient-to-r from-purple-600 to-blue-700'>
          My Trips
        </h2>

        {userTrip.length === 0 && !loading ? (
          // Render the App component when no trips exist and not loading
          <div className="flex flex-col justify-center items-center mt-20">
            <p className="text-white text-2xl mb-1 text-center">You have no trips yet. Start planning now!</p>
            <App />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10 justify-items-center">
            {loading ? (
              // Show placeholders while loading
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-48 bg-gray-700 animate-pulse rounded-lg"
                ></div>
              ))
            ) : (
              // Render the actual trip cards
              userTrip.map((trip, index) => (
                <USerTripCardItem trip={trip} key={index} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
