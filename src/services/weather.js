import axios from 'axios'

const accessKey = 'aba14dbc4236450a384bc9d0ebf7a0c0'
const baseUrl =  `http://api.weatherstack.com/current?access_key=${accessKey}`
const spoof = false
const ctof = (c) => c*(9/5)+32
const extractTime = (dateTime) => dateTime.match(/\d{2}:\d{2}/)[0]
const militaryToRegTime = (militaryTime) => {
    const militaryTimeSections = militaryTime.match(/(\d{2}):(\d{2})/)
    const hour = Number(militaryTimeSections[1]) >= 13 ? Number(militaryTimeSections[1])-12 : Number(militaryTimeSections[1])
    const minute = Number(militaryTimeSections[2])
    const isAfternoon = Number(militaryTimeSections[1]) >= 12
    return `${hour}:${minute}${isAfternoon ? ' PM' : ' AM'}`
}

function get(zipcode) {
    if (spoof) {
        return new Promise((resolve) => 
        {
            if (typeof zipcode !== "string") {
                zipcode = '13206'
            }
            resolve({temperature:zipcode.substring(0,2), 
                        time:`${zipcode.substring(2,3)}:${zipcode.substring(3,5)} PM`})
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