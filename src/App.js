import React, {useState, useEffect} from "react";
import weatherService from "./services/weather"
import ChangeLocationModal from "./components/ChangeLocationModal"
import TitleBar from "./components/TitleBar"
import Scene from "./components/Scene"
import Description from "./components/Description";
import Credits from "./components/Credits";
import ChangeLocationButton from "./components/ChangeLocationButton";
import Loader from "./components/Loader";
    
function App() {
  const [temperature, setTemperature] = useState(0)
  const [weatherCode, setWeatherCode] = useState(0)
  const [time, setTime] = useState('')
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [zipcode, setZipCode] = useState(null)
  const [userZipCode, setUserZipCode] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [isBadZipCode, setIsBadZipCode] = useState(false)

  useEffect(() => {  
    (async () => {
      setLoaded(false)
      setIsBadZipCode(false)
      try {
        const location = userZipCode ? 
                          await weatherService.getbyzipcode(userZipCode) :
                          await weatherService.get()

        setTime(location.time)
        setTemperature(location.temperature)
        setZipCode(location.zipcode)
        setWeatherCode(location.weatherCode)
        setIsBadZipCode(false)
        setShowLocationModal(false)
        setLoaded(true)            
        setUserZipCode(location.zipcode)     
      }
      catch (err) {
        setIsBadZipCode(true)
        setLoaded(true)
        setShowLocationModal(true)
        console.log(err)     
      }                            
    })()
  }
  ,[userZipCode])

  const handleNewZipCode = (formZipCode) => {  
    setZipCode(formZipCode)
    setUserZipCode(formZipCode)
    setShowLocationModal(false)
  }

  const handleBadZipCode = (formZipCode) => {   
    setShowLocationModal(true)
    setIsBadZipCode(true)
  }  

  const handleLocationButtonClick = () => {
    setShowLocationModal(true)  
  }

  if (loaded && temperature && weatherCode && time && zipcode) {
      return <div style={{
      backgroundColor: '#D011FF',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23FF77CF'/%3E%3Cstop offset='1' stop-color='%23F3FF78'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='12' height='12' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23D011FF' cx='6' cy='6' r='6'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.08'/%3E%3C/svg%3E")`,
      backgroundAttachment: 'fixed'}}>
                <ChangeLocationModal 
                    show={showLocationModal || isBadZipCode} 
                    zipcode={zipcode}
                    isBadZipCode={isBadZipCode}
                    handleNewZipCode={handleNewZipCode}
                    handleBadZipCode={handleBadZipCode}/>
                    <div className="flex"
                    style={{
                      display:"flex",
                      flexDirection:"column",
                      minHeight:'100vh',
                      gap:'1vw'}}>
                  <TitleBar title="Coco's Weather App!" />
                  <Scene temperature={temperature} time={time} weatherCode={weatherCode} />
                  <ChangeLocationButton handleClick={handleLocationButtonClick} 
                                        zipcode={zipcode}  />    
                  <div style={{flexGrow:1}}/>
                  <Description />
                  <Credits listOfCredits={['inventor Coco Moore', 
                                           'developer Jesse Bergerstock', 
                                           'artist Jasmine Sutton']}
                            style={{marginBottom:'auto'}}/>  
                  <div/>
                  <div style={{flexGrow:1}}/>
                </div> 
              </div>        
  } else {
    return <Loader/>
  }
  
}

export default App;
