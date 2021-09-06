import axios from 'axios'
const baseUrl =  `/api/location`

function getbyzipcode(zipcode) { 
    return axios.get(baseUrl+'?zipcode='+zipcode)       
        .then(r => r.data)
}   

function get() { 
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject))
    .then(r => {
        const lat = r.coords.latitude
        const lng = r.coords.longitude
        return axios.get(baseUrl+'?lat='+lat+'&lng='+lng)       
    })
    .then(r => r.data)
}        
    

// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    get,
    getbyzipcode
}