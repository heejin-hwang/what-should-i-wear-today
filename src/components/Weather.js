import React, {Component} from 'react';
import axios from 'axios';

const currentWeatherApi = process.env.REACT_APP_WEATHER_API_KEY;
const lat = 37.5287313;
const lon = 126.7257212;

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTemp: '',
            cityName: '',
            todayDate: '',
            maxTemp: '',
            minTemp: '',
            yesterdayDate: '',
            yesterdayMaxTemp: '',
            compareWeather: ''
        }
    }

    componentDidMount() {
        this.getCurrentWeather();
        this.getForecastWeather();
        this.getYesterdayDate();
    }

    getCurrentWeather() {
        axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${currentWeatherApi}`)
        .then(response => {
            const currentData = response.data.data[0];
            this.setState ({
                currentTemp : currentData.temp,
                cityName: currentData.city_name,
            })
        })
        .catch(err => console.log(err));
    }


    getForecastWeather() {
        axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?days=7&lat=${lat}&lon=${lon}&key=${currentWeatherApi}`)
        .then(async response => {
            const todayData = response.data.data[0];
            this.setState({
                todayDate: todayData.datetime,
                maxTemp: todayData.max_temp,
                minTemp: todayData.min_temp
            })
            await this.getYesterdayWeather();
            
        })
        .catch(err => console.log(err));
    }

    getYesterdayDate() {
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
        this.setState({
            yesterdayDate: resultData
        })
    }

    getYesterdayWeather() {
        axios.get(`https://api.weatherbit.io/v2.0/history/daily?start_date=${this.state.yesterdayDate}&end_date=${this.state.todayDate}&lat=${lat}&lon=${lon}&key=${currentWeatherApi}`)
        .then(response => {
            const yesterdayData = response.data.data[0];
            this.setState({
                yesterdayMaxTemp: yesterdayData.max_temp
            })
            this.getCompareWithYesterday();
        })
        .catch(err => console.log(err));
    }

    getCompareWithYesterday() {
        let compareWeather;

        if(this.state.maxTemp > this.state.yesterdayMaxTemp) {
            compareWeather = `어제보다 ${Math.floor(this.state.maxTemp-this.state.yesterdayMaxTemp)}˚ 높아요.`
            
        } else if (this.state.maxTemp < this.state.yesterdayMaxTemp) {
            compareWeather = `어제보다 ${Math.floor(this.state.yesterdayMaxTemp-this.state.maxTemp)}˚ 낮아요.`
        } else {
            compareWeather = '어제와 같아요.'
        }
        this.setState({
            compareWeather: compareWeather
        })
    }

    
    
    render() {
        const { currentTemp, cityName, todayDate, maxTemp, minTemp, compareWeather } = this.state;
        
        return (
            <>
                {todayDate}
                <h4>{cityName}</h4>
                <h1>{currentTemp}˚</h1>
                <h3>최저 {minTemp}˚/ 최고 {maxTemp}˚</h3>
                {compareWeather}
            </>
        );
    }
}

export default Weather;