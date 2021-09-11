import axios from 'axios'
const baseUrl =  `/api/location`

async function getbyzipcode(zipcode) {     
    const response = await axios.get(baseUrl+'?zipcode='+zipcode)        
    return response.data
}   

async function get() {
    const geo = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
    const lat = geo.coords.latitude
    const lng = geo.coords.longitude
    const response = await axios.get(baseUrl+'?lat='+lat+'&lng='+lng) 
    return response.data    
}        

// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    get,
    getbyzipcode
}