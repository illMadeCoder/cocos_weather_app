import axios from 'axios'

const accessKey = 'aba14dbc4236450a384bc9d0ebf7a0c0'
const baseUrl =  `http://api.weatherstack.com/current?access_key=${accessKey}`
const spoof = true
const ctof = (c) => c*(9/5)+32

function get(zipcode) {
    if (spoof) {
        return new Promise((resolve) => 
        {
            resolve({temperature:typeof zipcode === "string" ? zipcode.substring(0,2) : 13, time:null})
        })
    } else {
        return axios.get(baseUrl + `&query=${zipcode}`)
        .then(req => {return {temperature:Math.floor(ctof(req.data.current.temperature)),
                              time:req.data.location.localtime}}
        )
    }    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    get
}