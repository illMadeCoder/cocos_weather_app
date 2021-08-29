import axios from 'axios'
require('dotenv').config()

const baseUrl =  `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_ACCESS_KEY}`

function get() {
    return axios.get(baseUrl + '&query=Syracuse').then(req => req.data.current)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    get
}