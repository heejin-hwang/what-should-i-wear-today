import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Clothes from './Clothes';

const currentWeatherApi = process.env.REACT_APP_WEATHER_API_KEY;
const lat = 37.5287313;
const lon = 126.7257212;

const Weather = () => {
  const [todayDate, setTodayDate] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');
  const [cityName, setCityName] = useState('');
  const [icon, setIcon] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');

  useEffect(() => {
    getCurrentWeather();
    getForecastWeather();
  }, []);

  const getCurrentWeather = useCallback(() => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${currentWeatherApi}`,
      )
      .then(response => {
        const currentData = response.data.data[0];
        setCurrentTemp(currentData.temp);
        setCityName(currentData.city_name);
        setIcon(currentData.weather.icon);
      })
      .catch(err => console.log(err));
  });

  const getForecastWeather = useCallback(() => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/forecast/daily?days=7&lat=${lat}&lon=${lon}&key=${currentWeatherApi}`,
      )
      .then(response => {
        const todayData = response.data.data[0];
        setTodayDate(todayData.datetime);
        setMaxTemp(todayData.max_temp);
        setMinTemp(todayData.min_temp);
      })
      .catch(err => console.log(err));
  });

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        {todayDate}
        <h4>{cityName}</h4>
        <img src={`/images/weatherIcon/new/${icon}.png`} />
        <h1>{currentTemp}˚</h1>
        <h3>
          최저 {minTemp}˚/ 최고 {maxTemp}˚
        </h3>
        <Clothes currentTemp={currentTemp} />
      </Grid>
    </>
  );
};

export default Weather;
