import axios from 'axios'

const accessKey = 'bd7f4784ba3f00f56066371e4f77b9c4'
const baseUrl =  `http://api.weatherstack.com/current?access_key=${accessKey}`

function get() {
    return axios.get(baseUrl + '&query=Syracuse').then(req => req.data.current)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    get
}