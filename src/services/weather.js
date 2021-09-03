import axios from 'axios'

const accessKey = 'aba14dbc4236450a384bc9d0ebf7a0c0'
const baseUrl =  `http://api.weatherstack.com/current?access_key=${accessKey}`
const spoof = true
const ctof = (c) => c*(9/5)+32
const extractTime = (dateTime) => dateTime.match(/\d{2}:\d{2}/)[0]
const militaryToRegTime = (militaryTime) => {
    const militaryTimeSections = militaryTime.match(/(\d{2}):(\d{2})/)
    const hour = Number(militaryTimeSections[1])
    const minute = Number(militaryTimeSections[2])
    const isAfternoon = hour >= 12
    return `${hour}:${minute}${isAfternoon ? ' PM' : ' AM'}`
}

function get(zipcode) {
    if (spoof) {
        return new Promise((resolve) => 
        {
            resolve({temperature:typeof zipcode === "string" ? zipcode.substring(0,2) : 13, time:"12:34 PM"})
        })
    } else {
        return axios.get(baseUrl + `&query=${zipcode}`)
        .then(req => {return {temperature:Math.floor(ctof(req.data.current.temperature)),
                              time:militaryToRegTime(extractTime(req.data.location.localtime))}}
        )
    }    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    get
}