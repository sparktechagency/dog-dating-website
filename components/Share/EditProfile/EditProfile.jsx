"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from 'axios';

export default function EditProfile(props) {
  const [formData, setFormData] = useState({
    name: "Sara SNS",
    email: "example@gmail.com",
    location: "Los Angeles, California, USA", // Default empty
    phone: "00000000",
  });
const {toggleEditProfile,profileEdit,setProfileEdit}=props
const profileRef = useRef(null);

useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileEdit && profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileEdit(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileEdit, setProfileEdit]);
 


  const [mapCenter, setMapCenter] = useState(null); // Initially null
  const [marker, setMarker] = useState(null); // To hold marker instance
  const mapRef = useRef(null); // Reference to the map instance
  const inputRef = useRef(null); // Reference to the location input element
  const [autocomplete, setAutocomplete] = useState(null); // To store the Autocomplete instance
  const [error, setError] = useState('');

  // useEffect(() => {
  //   // Get current location for the initial marker and map center
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setMapCenter({ lat: latitude, lng: longitude });
  //       },
  //       (error) => {
  //         console.error("Error getting geolocation: ", error);
  //         // Set a default location if geolocation fails
  //         setMapCenter({ lat: 34.0522, lng: -118.2437 }); // Default to Los Angeles
  //       }
  //     );
  //   }

  //   // Wait for the window.google object to be available
  //   const checkGoogleMapsLoaded = setInterval(() => {
  //     if (window.google && window.google.maps) {
  //       // Initialize Google Places Autocomplete when the Google Maps API is available
  //       if (inputRef.current) {
  //         const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current);
  //         autocompleteInstance.setFields(["address_component", "geometry"]);
  //         autocompleteInstance.addListener("place_changed", () => handlePlaceChange(autocompleteInstance));
  //         setAutocomplete(autocompleteInstance);
  //       }
  //       clearInterval(checkGoogleMapsLoaded); // Clear interval once loaded
  //     }
  //   }, 100); // Check every 100ms for google.maps

  //   return () => clearInterval(checkGoogleMapsLoaded); // Cleanup interval on unmount
  // }, []);

  // const handlePlaceChange = (autocompleteInstance) => {
  //   const place = autocompleteInstance.getPlace();

  //   if (place.geometry) {
  //     const { lat, lng } = place.geometry.location;
  //     setMapCenter({ lat: lat(), lng: lng() });
  //     setFormData((prev) => ({ ...prev, location: place.formatted_address }));
  //   } else {
  //     setError("No details available for the selected place.");
  //     setMapCenter(null);
  //   }
  // };

  // const handleGetCoordinates = async () => {
  //   if (formData?.location.trim() === '') {
  //     setError('Please enter a location name.');
  //     return;
  //   }
  //   setError('');
    
  //   try {
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formData?.location)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  //     );
  //     const data = response.data;
      
  //     if (data.status === 'OK') {
  //       const { lat, lng } = data.results[0].geometry.location;
  //       setMapCenter({ lat, lng });
  //     } else {
  //       setError('Location not found.');
  //       setMapCenter(null);
  //     }
  //   } catch (err) {
  //     setError('Error fetching data.');
  //     setMapCenter(null);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div ref={profileRef}  className="flex items-center justify-center p-2 w-[600px]">
      <div className="w-full relative bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h1>
        <div
          onClick={toggleEditProfile}
          className="cursor-pointer  md:flex justify-end top-5  z-50 absolute right-5"
        >
          <p className=" text-lg font-bold ">X</p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            {/* Location input with autocomplete */}
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
{/* 
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['places']}>
                {mapCenter && (
                    <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={mapCenter}
                    zoom={15} // Adjust zoom level
                    >
                    <Marker position={mapCenter} />
                    </GoogleMap>
                )}
            </LoadScript>
          </div> */}

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button
          onClick={toggleEditProfile}
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}



