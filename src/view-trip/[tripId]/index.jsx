import React ,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import {doc, getDoc} from 'firebase/firestore'
import { db } from '@/service/firebaseConfig';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import Header from '@/components/custom/Header';
export default function ViewTrip() {

  const {tripId} = useParams();
  const[trip,setTrip] = useState([]);
  

  useEffect(() => {
    tripId&&getTripData();
  }, [tripId])
  

  //******Getting data from firestore********

  const getTripData = async () => {
    const docRef = doc(db,'AiTrips',tripId);
    const docSnap =  await getDoc(docRef);

    if(docSnap.exists())
    {
      // console.log("Document: ", docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("No data found");
      toast("No trip found");
    }
  }


  return (
    <div className="bg-gradient-to-t from-[#272735] to-[#1b1b27] min-h-screen p-5 md:px-20 lg:px-44 xl:px-56">
   <Header/>
    {/* Information Section */}
    <InfoSection  trip={trip} />

    {/* Hotel Information  */}
    <Hotels trip={trip}/>

    {/* Daily plan  */}
    <PlacesToVisit trip={trip}/>

    {/* Footer */}
    <Footer/>
    </div>
  )
}
