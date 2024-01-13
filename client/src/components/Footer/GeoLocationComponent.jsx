import React, { useState, useEffect } from 'react';
import useUserContext from '../../Hooks/useUserContext';


const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const { dispatch, temperature } = useUserContext();

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          fetch(reverseGeocodeUrl)
            .then((response) => response.json())
            .then((data) => {
              const city = data.address.city;
              const state = data.address.state;
              const country = data.address.country;

              setLocation({ city, state, country });
              dispatch({type : "setLocation" , payload : { city, state, country }})
              
            })
            .catch((error) => {
              console.error('Error fetching location:', error);
            });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <>
      {location ? (
        <p>
          Your location: City = {location.city}, State = {location.state}, Country = {location.country}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </>
  );
};

export default LocationComponent;
