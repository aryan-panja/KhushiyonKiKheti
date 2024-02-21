// Weather.js
import React, { useContext, useEffect, useState } from 'react';
import useUserContext from '../../../Hooks/useUserContext';

const weatherApiKey = import.meta.env.VITE_WEATHER_API

const Weather = () => {
  const { location } = useUserContext();
  const [temperature, setTemperature] = useState(null);
  const { dispatch } = useUserContext();

  // console.log(weatherApiKey)


  useEffect(() => {
    const fetchWeather = async () => {
      if (!location || !location.city || !location.state || !location.country) {
        console.error('Invalid or undefined location data.');
        return; 
      }
      
      try {
        // Construct the API request URL
        // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.state},${location.country}&appid=${weatherApiKey}`;
        // console.log(apiUrl);

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${weatherApiKey}`;

        console.log("lat and long:", location.latitude, location.longitude);

        // Fetch weather information
        const weatherResponse = await fetch(apiUrl);

        if (!weatherResponse.ok) {
          throw new Error('Failed to fetch weather information');
        }

        const weatherData = await weatherResponse.json();
        console.log("Weather.jsx : ", weatherData); // Log the weather data for debugging
        dispatch({ type: "setWeatherData", payload: weatherData })
        const temperatureInKelvin = weatherData.main.temp; // Temperature in Kelvin
        const temperatureInCelsius = temperatureInKelvin - 273.15; // Convert to Celsius
        setTemperature(temperatureInCelsius);
        dispatch({ type: "setTemperature", payload: temperatureInCelsius })
      } catch (error) {
        console.error('Error fetching weather:', error.message);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <p>
      , Temperature: {temperature !== null ? `${temperature.toFixed(2)} °C` : 'Loading...'}
    </p>
  );
};

export default Weather;
