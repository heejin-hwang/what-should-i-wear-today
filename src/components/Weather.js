import React, { useEffect, useState } from 'react';
import axios from 'axios';

const currentWeatherApi = process.env.REACT_APP_WEATHER_API_KEY;
const lat = 37.5287313;
const lon = 126.7257212;

const Weather = () => {
    const [state, setState] = useState({
        currentTemp: '',
        cityName: '',
        todayDate: '',
        maxTemp: '',
        minTemp: '',
        yesterdayDate: '',
        yesterdayMaxTemp: '',
        compareWeather: ''
    })

    useEffect(() => {
        getCurrentWeather();
        getForecastWeather();
        getYesterdayDate();
    }, [])

    const getCurrentWeather = () => {
        axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${currentWeatherApi}`)
        .then(response => {
            const currentData = response.data.data[0];
            setState ({...state, 
                currentTemp : currentData.temp,
                cityName: currentData.city_name,
            })
        })
        .catch(err => console.log(err));
    }


    const getForecastWeather = () => {
        axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?days=7&lat=${lat}&lon=${lon}&key=${currentWeatherApi}`)
        .then(async response => {
            const todayData = response.data.data[0];
            setState ({...state, 
                todayDate: todayData.datetime,
                maxTemp: todayData.max_temp,
                minTemp: todayData.min_temp
            })
            await getYesterdayWeather();
            
        })
        .catch(err => console.log(err));
    }

    const getYesterdayDate = () => {
        const nowDate = new Date();
        const yesterdayDate = nowDate.getTime() - (1*24*60*60*1000);
        nowDate.setTime(yesterdayDate);

        const year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1;
        let day = nowDate.getDate();

        if(month < 10) {
            month = "0" + month;
        }
        if(day < 10) {
            day = "0" + day; 
        }

        const resultData = `${year}-${month}-${day}`;
        setState ({...state, 
            yesterdayDate: resultData
        })
    }

    const getYesterdayWeather = () => {
        axios.get(`https://api.weatherbit.io/v2.0/history/daily?start_date=${state.yesterdayDate}&end_date=${state.todayDate}&lat=${lat}&lon=${lon}&key=${currentWeatherApi}`)
        .then(response => {
            const yesterdayData = response.data.data[0];
            setState ({...state, 
                yesterdayMaxTemp: yesterdayData.max_temp
            })
            getCompareWithYesterday();
        })
        .catch(err => console.log(err));
    }

    const getCompareWithYesterday = () => {
        let compareWeather;

        if(state.maxTemp > state.yesterdayMaxTemp) {
            compareWeather = `어제보다 ${Math.floor(state.maxTemp-state.yesterdayMaxTemp)}˚ 높아요.`
            
        } else if (state.maxTemp < state.yesterdayMaxTemp) {
            compareWeather = `어제보다 ${Math.floor(state.yesterdayMaxTemp-state.maxTemp)}˚ 낮아요.`
        } else {
            compareWeather = '어제와 같아요.'
        }
        setState ({...state, 
            compareWeather: compareWeather
        })
    }

    
    
        
        return (
            <>
                {state.todayDate}
                <h4>{state.cityName}</h4>
                <h1>{state.currentTemp}˚</h1>
                <h3>최저 {state.minTemp}˚/ 최고 {state.maxTemp}˚</h3>
                {state.compareWeather}
            </>
        );
}

export default Weather;