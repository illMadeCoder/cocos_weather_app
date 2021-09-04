import axios from 'axios'

const accessKey = '223eb5ead2f2f020ce1bfa262fbbc8a7'
const baseUrl =  `http://api.weatherstack.com/current?access_key=${accessKey}`

const spoof = false
const ctof = (c) => c*(9/5)+32

function get(zipcode) { 
    if (spoof) {
        return new Promise((resolve) => 
        {
            if (!zipcode || typeof zipcode !== "string") {
                zipcode = '13206'
            }
            resolve({temperature:zipcode.substring(0,2), 
                     time:`${zipcode.substring(2,3)}:${zipcode.substring(3,5)} PM`,
                     zipcode:zipcode,
                     weatherCode:119
                })
        })
    }
    else 
    {
        return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject))
        .then(r => {
            const lat = r.coords.latitude
            const lng = r.coords.longitude
            return axios.get(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${lng}&username=bebo`)
            .then(r => {
                const geozipcode =  (zipcode.length > 1 && zipcode) || r.data.postalCodes[0].postalCode            
                return axios.get(baseUrl + `&query=${geozipcode}`)
                .then(req => {
                    console.log(req)
                    var time = new Date();
                    return {temperature:Math.floor(ctof(req.data.current.temperature)),
                            time:time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                            weatherCode:req.data.current.weather_code,
                            zipcode: geozipcode}
                })
            })
        })
    }
}                    
    

// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    get
}