import React from 'react';
import PlaceCardItem from './PlaceCardItem';

export default function PlacesToVisit({ trip }) {
  return (
    <div className="bg-[#1E1E1E] min-h-screen text-white">
      <h2 className="text-3xl mt-10 pt-5 font-bold text-center">Places to Visit</h2>
      <div className="mt-5">
        {trip.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary)
            .sort(([dayA], [dayB]) => {
              const numA = parseInt(dayA.replace('day', ''), 10);
              const numB = parseInt(dayB.replace('day', ''), 10);
              return numA - numB;
            })
            .map(([day, details]) => (
              <div key={day} className="mt-6 p-4 border border-gray-600 rounded-lg">
                <h3 className="text-2xl font-semibold">
                  {day.toUpperCase()} - Best Time to Visit: {details.bestTimeToVisit}
                </h3>
                <div className="mt-4 grid gap-6">
                  {details.places.map((place, i) => (
                    <PlaceCardItem key={i} place={place} />
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
