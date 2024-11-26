import React from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

export default function Hotels({ trip }) {
  return (
    <>
      <h1 className="text-2xl font-bold mt-8 text-white">
        Hotel Reccomendation
      </h1>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trip.tripData?.hotels.map((hotel, index) => (
          <HotelCardItem hotel={hotel}/>
        ))}
      </div>
    </>
  );
}
