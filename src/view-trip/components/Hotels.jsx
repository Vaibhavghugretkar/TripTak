import React from "react";
import { Link } from "react-router-dom";

export default function Hotels({ trip }) {
  return (
    <>
      <h1 className="text-2xl font-bold mt-8 text-white">
        Hotel Reccomendation
      </h1>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trip.tripData?.hotels.map((hotel, index) => (
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel.HotelName +
              "," +
              hotel?.HotelAddress
            }
            target="_blank"
          >
            <div className="hover:scale-105 transition-all">
              <img src="/logo3.webp" className="rounded-md shadow-md"></img>
              <div className="my-2">
                <h2 className="text-white font-medium">🏨{hotel.HotelName}</h2>
                <h2 className="text-gray-400 text-xs">
                  📍{hotel.HotelAddress}
                </h2>
                <h2 className="text-gray-100 font-bold text-xs">
                  🏨{hotel.Price}
                </h2>
                <h2 className="text-gray-400 text-xs">⭐ {hotel.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
