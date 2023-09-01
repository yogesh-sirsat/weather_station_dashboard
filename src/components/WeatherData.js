import React, { useState } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import _ from 'lodash';
import * as constant from '../constants';
import { getLocalStorageCache, setLocalStorageCache } from '../cache/cityLocalStorageCache';
import { handleWeatherTheme } from '../utils/weatherTheme';

const WeatherData = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherTheme, setWeatherTheme] = useState('synthwave');
  const [error, setError] = useState(null);

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 
  const fetchWeatherData = async () => {
    const lowercaseCity = city.toLowerCase();

    const cachedData = getLocalStorageCache(lowercaseCity);
    if (cachedData) {
        setWeatherData(cachedData);
        setWeatherTheme(handleWeatherTheme(cachedData.weather[0].main));
        setError(null);
        return;
    }

    let retryAttempts = 0;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${constant.API_KEY}&exclude=minutely,hourly,daily,alerts&units=metric`;
    while (retryAttempts < constant.MAX_RETRY_ATTEMPTS) {
      try {
        const { data } = await axios.get(url);
          setWeatherData(data);
          setWeatherTheme(handleWeatherTheme(data.weather[0].main));
          setError(null);
          setLocalStorageCache(lowercaseCity, data)
          return;
      } catch (error) {
          setWeatherData(null);
          if (error.response) {
            if (error.response.status === constant.CITY_NOT_FOUND) {
              setError("Entered city not found");
              return;
            }
            else if (error.response.status === constant.RATE_LIMIT_EXCEEDED) {
              setError(`Rate limit exceeded. Retrying in ${constant.RATE_LIMIT_BACKOFF_INTERVAL} seconds...`);
              await sleep(constant.RATE_LIMIT_BACKOFF_INTERVAL);
              retryAttempts++;
            }
            else if (error.response.status >= constant.INTERNAL_SERVER_ERROR) {
              setError(`Internal server error. Retrying in ${constant.SERVER_ERROR_BACKOFF_INTERVAL} seconds...`);
              await sleep(constant.SERVER_ERROR_BACKOFF_INTERVAL);
              retryAttempts++;
            }
            else {
              setError(error.response.data.message);
              return;
            }
          }
          else {
            setError("Error fetching weather data: " + error);
            return;
          }
      }
    }

    setError("Max retry attempts reached. Weather data could not be fetched");
  };

  const getWeatherIconUrl = (iconCode) => {
    const baseUrl = 'http://openweathermap.org/img/wn/';
    return `${baseUrl}${iconCode}@2x.png`;
  };

  // Throttle the API calls to one request per second
  const throttledFetchWeatherData = _.throttle(fetchWeatherData, 1000);

  return (
    <div className="bg-primary min-h-screen flex justify-center items-center" data-theme={weatherTheme}>
      <div className="bg-secondary p-8 rounded-md shadow-md space-y-4">
        <h1 className="text-2xl font-bold">Weather Station Dashboard</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter city name"
            className="input input-bordered w-full p-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="btn btn-neutral"
            onClick={throttledFetchWeatherData}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
        {error && <p className="text-error font-semibold">{error}</p>}
        {weatherData && (
          <div>
            <h2 className="text-lg font-semibold">{weatherData.name}, {weatherData.sys.country}</h2>
            <img className="mx-auto w-20 h-20" src={getWeatherIconUrl(weatherData.weather[0].icon)} alt="Weather Icon"/>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherData;
