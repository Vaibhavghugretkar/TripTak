# TripTak - Your Personalized Trip Planner

## Overview

TripTak is a dynamic and user-friendly web application designed to simplify trip planning. Leveraging the Gemini API and Google Maps API, TripTak offers personalized travel itineraries based on user preferences such as the number of days, traveler type (solo, couple, family), and budget. Additionally, it provides hotel recommendations to ensure a seamless travel experience.

## Features

Customized Trip Planning: Generate travel itineraries tailored to your preferences.

Traveler Type Support: Options for solo, couple, or family travelers.

Budget-Friendly Recommendations: Plan trips that fit within your specified budget.

Hotel Recommendations: Find the best accommodations for your trip.

Interactive Maps: Use Google Maps for precise navigation and location details.

Secure Data Storage: Powered by Firebase to store user data securely.

## Tech Stack

Frontend: React.js

Backend: Gemini API, Google Maps API

Database: Firebase

Installation and Setup

Prerequisites

Node.js installed

Firebase project setup

API keys for Gemini API and Google Maps API

## Steps

Clone the Repository:

git clone https://github.com/your-username/triptak.git
cd triptak

Install Dependencies:

npm install

Configure Environment Variables:
Create a .env file in the root directory and add the following:

REACT_APP_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id

Start the Development Server:

npm start

The application will run on http://localhost:3000.

Usage

Enter Trip Details:
Provide the number of days, traveler type, and budget.

Plan Your Trip:
View the suggested itinerary and hotel recommendations.

Explore with Maps:
Use Google Maps for navigating your destinations.

Firebase Configuration

Ensure your Firebase project has Firestore and Authentication enabled. Update the Firebase SDK configurations in the .env file with your Firebase project credentials.

Deployment

To deploy the application, you can use Firebase Hosting or any other preferred hosting platform.

Build the Application:

npm run build

Deploy to Firebase:

firebase deploy

Contributing

Contributions are welcome! Please follow the standard Git workflow:

Fork the repository

Create a new branch (feature/your-feature-name)

Commit your changes

Push to the branch

Submit a pull request

License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

Gemini API: For powering the trip planning functionality.

Google Maps API: For interactive mapping and location features.

Firebase: For secure and scalable data storage.
