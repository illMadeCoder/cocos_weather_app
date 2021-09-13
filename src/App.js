import React, {useState, useEffect} from "react";
import weatherService from "./services/weather"
import ChangeLocationModal from "./components/ChangeLocationModal"
import TitleBar from "./components/TitleBar"
import Scene from "./components/Scene"
import Description from "./components/Description";
import Credits from "./components/Credits";
import ChangeLocationButton from "./components/ChangeLocationButton";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage"
    
function App() {
  const [temperature, setTemperature] = useState(0)
  const [weatherCode, setWeatherCode] = useState(0)
  const [time, setTime] = useState('')
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [zipcode, setZipCode] = useState(null)
  const [userZipCode, setUserZipCode] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [isBadZipCode, setIsBadZipCode] = useState(false)
  const [locationName, setLocationName] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
 
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
        setLocationName(location.name) 
      }
      catch (err) {
        if (err.response) {
          if (err.response.status === 400) {
            setIsBadZipCode(true)
            setLoaded(true)
            setShowLocationModal(true)              
          } else {
            setErrorMessage(err.response.data)      
          }         
        }
      }                            
    })()
  }
  ,[userZipCode])

  const handleNewZipCode = (formZipCode) => {  
    if (formZipCode) {
      setZipCode(formZipCode)
      setUserZipCode(formZipCode)
      setShowLocationModal(false)
    } else {
      setShowLocationModal(false)
      setIsBadZipCode(false)
    }
  }

  const handleBadZipCode = (formZipCode) => {   
    setShowLocationModal(true)
    setIsBadZipCode(true)
  }  

  const handleLocationButtonClick = () => {
    setShowLocationModal(true)  
  }
  if (errorMessage) {
    return <ErrorMessage errorMessage={errorMessage} />
  } else if (loaded && temperature && weatherCode && time && zipcode) {
      return <div style={{
      backgroundColor: 'deepskyblue'
      }}>
                <ChangeLocationModal 
                    show={showLocationModal || isBadZipCode} 
                    setShow={(val) => setShowLocationModal(val)}
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
                                        location={locationName}  />    
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
