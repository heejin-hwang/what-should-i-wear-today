import React, {Component} from 'react';
import axios from 'axios';

// https://api.weatherbit.io/v2.0/current?lat=37.5287313&lon=126.7257212&key=194a7c6e211a4c78a09836a0b4963b62
// https://api.weatherbit.io/v2.0/forecast/daily?lat=37.5287313&lon=126.7257212&key=194a7c6e211a4c78a09836a0b4963b62
const currentWeatherApi = process.env.REACT_APP_WEATHER_API_KEY;
const lat = 37.5287313;
const lon = 126.7257212;

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTemp: '',
            cityName: '',
            maxTemp: '',
            minTemp: '',
        }
        console.log('constructor!!!!!!!!!!!!!!!!!!!!!!!!')
    }

   
    componentDidMount() {
        console.log('componentDidMount!!!!!!!!!!!!!!!!!!!!!!!!')
        this.getCurrentWeather();
    }

    componentDidUpdate() {
        console.log('componentDidUpdate!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    }

    getCurrentWeather() {
        console.log("1 ::", currentWeatherApi);
        console.log("this::::::" ,this);
        axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${currentWeatherApi}`)
        .then(response => {
            const currentData = response.data.data[0];
            console.log(response.data);
            console.log(currentData);
            console.log("머야!!!!!!!", currentData.temp);
            this.setState ({
                currentTemp : currentData.temp,
                cityName: currentData.city_name
            })
        }
        
        )
        .catch(err => console.log(err));
        console.log("currentTemp::",this.state.currentTemp);
        console.log("this::::::" ,this);
    }

    getForecastWeather() {
        axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${currentWeatherApi}`)
        .then(response => {
            console.log(response.data);
        }
        
        )
        .catch(err => console.log(err));
    }
    
    
    render() {
        const { currentTemp, cityName } = this.state;
        console.log('render!!!!!!!!!!!!!!!!!!!!!!!!')
        
        return (
            <>
                <h1 style={{border:'3px solid blue'}}>Weather</h1>
                <h4>{cityName}</h4>
                <h1>{currentTemp}˚</h1>
            </>
        );
    }
}

export default Weather;