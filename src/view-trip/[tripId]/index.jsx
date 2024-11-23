import React ,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import {doc, getDoc} from 'firebase/firestore'
import { db } from '@/service/firebaseConfig';
export default function ViewTrip() {

  const {tripId} = useParams();
  

  useEffect(() => {
    tripId&&getTripData();
  }, [tripId])
  

  //******Getting data from firestore********

  const getTripData = async () => {
    const docRef = doc(db,'AiTrips',tripId);
    const docSnap =  await getDoc(docRef);

    if(docSnap.exists())
    {
      console.log("Document: ", docSnap.data());
    }
    else{
      console.log("No data found");
      toast("No trip found");
    }
  }

  return (
    <div>ViewTrip</div>
  )
}
