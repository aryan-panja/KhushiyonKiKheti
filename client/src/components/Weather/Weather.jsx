// Weather.js
import React, { useContext, useEffect, useState } from 'react';
import useUserContext from '../../Hooks/useUserContext';

const Weather = () => {
  const { location } = useUserContext();
  const [temperature, setTemperature] = useState(null);
  const { dispatch } = useUserContext();


  useEffect(() => {
    const fetchWeather = async () => {
      if (!location || !location.city || !location.state || !location.country) {
        console.error('Invalid or undefined location data.');
        return;
      }

      const weatherApiKey = '8df720f8f7b2566c94d2a5d408445e58'; // Replace with your OpenWeatherMap API key

      try {
        // Construct the API request URL
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.state},${location.country}&appid=${weatherApiKey}`;
        console.log(apiUrl);

        // Fetch weather information
        const weatherResponse = await fetch(apiUrl);

        if (!weatherResponse.ok) {
          throw new Error('Failed to fetch weather information');
        }

        const weatherData = await weatherResponse.json();
        console.log(weatherData); // Log the weather data for debugging

        const temperatureInKelvin = weatherData.main.temp; // Temperature in Kelvin
        const temperatureInCelsius = temperatureInKelvin - 273.15; // Convert to Celsius
        setTemperature(temperatureInCelsius);
        dispatch({type : "setTemperature" , payload : temperatureInCelsius})
      } catch (error) {
        console.error('Error fetching weather:', error.message);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div>
      <h2>Weather Information</h2>
      <p>
        Location: {location ? `${location.city}, ${location.state}, ${location.country}` : 'Loading...'} <br />
        Temperature: {temperature !== null ? `${temperature.toFixed(2)} °C` : 'Loading...'}
      </p>
    </div>
  );
};

export default Weather;
