"use client"; // Ensure this is a client-side component

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import axios from "axios";

interface MapProps {
  setShippingInfo: React.Dispatch<React.SetStateAction<any>>;
}

const Map = ({ setShippingInfo }: MapProps) => {
  const [location, setLocation] = useState<any>(null); // Store the latitude and longitude
  const [address, setAddress] = useState<string>("");

  // OpenCage Geocoder API
  const geocodeApiKey = "YOUR_OPENCAGE_API_KEY"; // Add your OpenCage API key here

  // Function to fetch the address based on latitude and longitude (reverse geocoding)
  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${geocodeApiKey}`
      );
      if (response.data.results && response.data.results.length > 0) {
        // We can restrict the result to Kenya only
        const result = response.data.results[0];
        if (result.components.country === "Kenya") {
          setAddress(result.formatted);
          setShippingInfo((prevState) => ({
            ...prevState,
            address: result.formatted,
            latitude: lat,
            longitude: lng,
          }));
        } else {
          alert("Please select a location in Kenya.");
        }
      } else {
        alert("No address found for this location.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Handle map click event
  const handleMapClick = (e: { latlng: LatLng }) => {
    const { lat, lng } = e.latlng;
    setLocation({ lat, lng });
    fetchAddress(lat, lng); // Fetch address after clicking on the map
  };

  // Use map events to capture clicks on the map
  useMapEvents({
    click: handleMapClick,
  });

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <MapContainer center={[-1.286389, 36.817223]} zoom={6} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && <Marker position={location}><Popup>{address}</Popup></Marker>}
      </MapContainer>
    </div>
  );
};

export default Map;
