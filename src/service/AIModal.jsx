import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text:   "Generate Travel Plan for Location :Goa, India for 3 Days for couple with a cheap budget, give me Hotel Options list with HotelNames, HotelAddress, Price, Hotel Image URL, geocoordinates, rating, description and suggest itenerary with PlaceName, Place Details, geo corordinates, place Image URL, ticket pricing, time to travel each location for 3 days with each day plan and best time to visit, return it JSON format",
          },

        ],
      },
      {
        role: "model",
        "parts": [
          {
            "text": "``` json\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel XYZ\",\n      \"hotelAddress\": \"Beach Road, Goa, India\",\n      \"price\": \"$100 per night\",\n      \"hotelImageURL\": \"https://example.com/hotel-image.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 15.2993,\n        \"longitude\": 74.1247\n      },\n      \"rating\": 4.5,\n      \"description\": \"A cozy hotel near the beach with great amenities and affordable pricing.\"\n    },\n    {\n      \"hotelName\": \"Hotel ABC\",\n      \"hotelAddress\": \"Panaji, Goa, India\",\n      \"price\": \"$80 per night\",\n      \"hotelImageURL\": \"https://example.com/hotel-abc-image.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 15.4981,\n        \"longitude\": 73.8246\n      },\n      \"rating\": 4.0,\n      \"description\": \"Affordable stay with easy access to main attractions in Goa.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"places\": [\n        {\n          \"placeName\": \"Calangute Beach\",\n          \"placeDetails\": \"A popular beach in Goa, great for water sports and relaxation.\",\n          \"geoCoordinates\": {\n            \"latitude\": 15.5520,\n            \"longitude\": 73.7570\n          },\n          \"placeImageURL\": \"https://example.com/calanguete-beach.jpg\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"30 mins\"\n        },\n        {\n          \"placeName\": \"Baga Beach\",\n          \"placeDetails\": \"A lively beach known for its vibrant nightlife and water activities.\",\n          \"geoCoordinates\": {\n            \"latitude\": 15.5526,\n            \"longitude\": 73.7535\n          },\n          \"placeImageURL\": \"https://example.com/baga-beach.jpg\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"15 mins\"\n        }\n      ],\n      \"bestTimeToVisit\": \"November to March\"\n    },\n    \"day2\": {\n      \"places\": [\n        {\n          \"placeName\": \"Dudhsagar Falls\",\n          \"placeDetails\": \"A breathtaking waterfall, a must-see for nature lovers.\",\n          \"geoCoordinates\": {\n            \"latitude\": 15.4004,\n            \"longitude\": 74.1825\n          },\n          \"placeImageURL\": \"https://example.com/dudhsagar-falls.jpg\",\n          \"ticketPricing\": \"$5\",\n          \"timeToTravel\": \"2 hours\"\n        },\n        {\n          \"placeName\": \"Spice Plantations\",\n          \"placeDetails\": \"Explore the spice plantations and taste some fresh spices.\",\n          \"geoCoordinates\": {\n            \"latitude\": 15.3572,\n            \"longitude\": 74.1398\n          },\n          \"placeImageURL\": \"https://example.com/spice-plantation.jpg\",\n          \"ticketPricing\": \"$10\",\n          \"timeToTravel\": \"1 hour\"\n        }\n      ],\n      \"bestTimeToVisit\": \"October to February\"\n    },\n    \"day3\": {\n      \"places\": [\n        {\n          \"placeName\": \"Fort Aguada\",\n          \"placeDetails\": \"A historical fort offering stunning views of the Arabian Sea.\",\n          \"geoCoordinates\": {\n            \"latitude\": 15.4980,\n            \"longitude\": 73.7736\n          },\n          \"placeImageURL\": \"https://example.com/fort-aguada.jpg\",\n          \"ticketPricing\": \"$2\",\n          \"timeToTravel\": \"20 mins\"\n        },\n        {\n          \"placeName\": \"Anjuna Beach\",\n          \"placeDetails\": \"A laid-back beach known for its vibrant market and party scene.\",\n          \"geoCoordinates\": {\n            \"latitude\": 15.5511,\n            \"longitude\": 73.8036\n          },\n          \"placeImageURL\": \"https://example.com/anjuna-beach.jpg\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"40 mins\"\n        }\n      ],\n      \"bestTimeToVisit\": \"November to March\"\n    }\n  }\n}\n```"
          }
        ]
      }
      
    ],
  });
  
  
  