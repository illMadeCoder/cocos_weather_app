import React, {useState, useEffect} from "react";
import weatherService from "./services/weather"
import { Textfit } from 'react-textfit'
import Modal from "react-modal"
import GridLoader from "react-spinners/GridLoader"

Modal.setAppElement('#root');

const TitleBar = ({title}) => 
  <div 
  style={{backgroundColor:"pink",
          borderBottom:'solid 1vw lightcoral',
          paddingTop:'1vw',
          height:'fit-content'}}>
    <h1
      style={{backgroundColor:"lightcoral",
              borderRadius:'3vw',   
              width:'fit-content',           
              height:'fit-content',
              paddingLeft:'2%',
              paddingRight:'2%',
              color:'white',
              fontFamily:'Patrick Hand',
              fontSize:'10vw',
              marginLeft:'auto', // center
              marginRight:'auto',
              textAlign:'center'}}>
      {title}
   </h1>
</div>

const Scene = ({temperature, time, weatherCode}) => 
{
  let scene = 'warm'
  let icon = 'clear'

  if (time && time.length > 1) {
    const hour = Number(time.match(/^\d\d?/)[0])
    const PMAM = time.match(/PM|AM/)[0]  
    if ((hour >= 8 && PMAM === 'PM')
      || (hour < 6 && PMAM === 'AM')) {
      scene = 'late'
    } else if (temperature <= 30) {
      scene = 'snow'  
    } else if (temperature <= 60) {
      scene = 'cold'  
    } else if (temperature <= 80) {
      scene = 'medium'  
    } else {
      scene = 'warm'
    }     
    if ((hour >= 8 && PMAM === 'PM')      
    || (hour < 6 && PMAM === 'AM')) {
      icon = 'late'
    } else {
      const icon_weatherCode_map = {
        clear:[113],
        partly_cloudy:[116,119],
        cloudy:[122, 143, 176, 179, 
                200, 248, 260, 263,  
                266, 281, 293, 296],
        rain:[296, 299, 302, 205,  
              208, 356, 359, 362,
              377, 386, 389, 392],
        snow:[227, 230, 281, 284, 
              311, 314, 317, 320, 
              323, 326, 329, 335, 
              338, 350, 365, 368, 
              374, 395]
      }
      for (const [key, value] of Object.entries(icon_weatherCode_map)) {
        if (value.includes(weatherCode)) {
          icon = key
          break
        }
      }
    }

  }
return <div
      style={{border:'solid lightcoral',        
              borderRadius:'2vw',
              borderWidth:'1vw',
              maxHeight:'100vh',              
              height:'80vw',
              width:'80vw',
              maxWidth:'100vh',
              marginLeft:'auto',
              marginRight:'auto',
              backgroundImage:`url(./scenes/${scene}.png)`,
              backgroundSize:'100% 100%',
              backgroundPosition:'center'}}>
        <Textfit mode='single'
          forceSingleModeWidth={false}
          max={1000}
           style={{backgroundColor:'yellow',
                   backgroundImage:`url(./icons/${icon}.png)`,
                   backgroundPosition:'center',
                   backgroundSize:'cover',
                   width:'25%',
                   height:'25%',
                   marginLeft:'auto',
                   marginRight:'2%',
                   marginTop:'2%',
                   border:'solid lightcoral',
                   color:'white',
                   textShadow: '-.015em -.015em 0 #000, .015em -.015em 0 #000, -.015em .015em 0 #000, .015em .015em 0 #000', 
                   borderRadius:'10%',
                   fontWeight:'bold'
                   }}>
          {`${temperature}°`}
        </Textfit>    
        <Textfit mode='single'
          max={1000}
           style={{backgroundColor:'pink',
                   backgroundPosition:'center',
                   backgroundSize:'cover',
                   width:'25%',
                   height:'8%',
                   marginLeft:'auto',
                   marginRight:'2%',
                   marginTop:'2%',
                   border:'solid lightcoral',
                   color:'white',                   
                   borderRadius:'10%',
                   textAlign:'center',
                   fontWeight:'bold',                  
                   paddingLeft:'1%',
                   paddingRight:'1%',
                   paddingBottom:'9%'
                   }}>
          {`${time}`}
        </Textfit>
  </div>    
}

const Description = () => 
<div
  style={{
    marginLeft:'auto',
    marginRight:'auto',
    width:'80%',
    backgroundColor:"lightcoral",
    borderRadius:'2vw',
    border:'pink'
  }}>    
      <h2
      style={{
        color: 'white',
        fontSize: '5vw',
        fontFamily:'Patrick Hand',
        paddingLeft:'2%',
        marginTop:'1%'
    }}>
        What is this?
      </h2>
<h2
    style={{
      color: 'white',
      fontSize: '4vw',
      fontFamily:'Patrick Hand',
      paddingLeft:'2vw',
      paddingRight:'2vw'
  }}> coco's weather app presents the solution for when you just don't know what to wear outside! Come night, rain, snow, or sunshine this app will make sure you're appropriately dressed for the occasion....
  </h2>   
</div>

const Credits = ({listOfCredits}) =>
    <div
    style={{
      marginLeft:'auto',
      marginRight:'auto',
      width:'80%',
      minWidth:'80%',
      backgroundColor:"lightcoral",
      borderRadius:'2vw',
      border:'pink'
    }}>     
      <h2
      style={{
        color: 'white',
        fontSize: '5vw',
        fontFamily:'Patrick Hand',
        paddingLeft:'2%',
        marginTop:'1%'
    }}>
        Who Made This?
      </h2>
      {listOfCredits.map(credit =>       
      <h2 key={credit}
      style={{
        color: 'white',
        fontSize: '4vw',
        fontFamily:'Patrick Hand',
        paddingLeft:'2%'
    }}>> {credit}
      </h2>)}                        
    </div>

const ChangeLocationButton = ({handleClick, zipcode}) => 
      <button 
        onClick={() => handleClick()}
        style={{
          width:'50%',
          marginLeft:'auto',
          marginRight:'auto',
          backgroundColor:'lightcoral',
          border:'none',
          fontFamily:'Patrick Hand',
          fontSize:'6vw',
          outline:'none',
          color:'white'
        }}>
        {`Change Zip Code (${zipcode})`}
      </button>
    
const ChangeLocationModal = ({show, prevZipCode, handleNewZipCode, handleBadZipCode}) => {
  const [newZipCode, setNewZipCode] = useState(prevZipCode)
  return <Modal     
            isOpen={show}
            onAfterOpen={() => {}}
            onRequestClose={() => {}}
            style={{content:{top:'50%', 
                            left:'50%', 
                            right:'auto', 
                            bottom:'auto', 
                            marginRight:'-50%', 
                            transform: 'translate(-50%, -50%)',
                            backgroundColor:'lightcoral'}}}>
              <h2 style={{
                color:'white',
                fontFamily:'Patrick Hand',
                fontSize:'4em'
              }}>
                Type in a ZipCode!
                </h2>
              <form onSubmit={(e) => {
                e.preventDefault()
                if (/^\d{5}$/.test(newZipCode)) {
                  handleNewZipCode(newZipCode)
                } else {
                  handleBadZipCode(newZipCode)
                }
              }}>
                <input autoFocus 
                       onChange={(e) => {
                         if (/^\d{0,5}$/.test(e.target.value)) {
                          setNewZipCode(e.target.value)
                         }
 

                       }}
                       value={newZipCode}
                       style={{
                         fontFamily:'Patrick Hand',
                         fontSize:'4em',
                         width:'4em'
                       }}
                />
              </form>
  </Modal>
}

function App() {
  const [temperature, setTemperature] = useState(0)
  const [weatherCode, setWeatherCode] = useState(0)
  const [time, setTime] = useState('')
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [zipcode, setZipCode] = useState(null)
  const [userZipCode, setUserZipCode] = useState(null)

  useEffect(() => {    
    if (userZipCode) {
      weatherService.getbyzipcode(userZipCode).then(location => 
        {
          setTime(location.time)
          setTemperature(location.temperature)
          setZipCode(location.zipcode)
          setWeatherCode(location.weatherCode)
        }
      )
    } else {
      weatherService.get().then(location => 
        {
          setTime(location.time)
          setTemperature(location.temperature)
          setZipCode(location.zipcode)
          setWeatherCode(location.weatherCode)
        }
      )
    }
  }
  ,[zipcode, userZipCode])

  const handleNewZipCode = (formZipCode) => {    
    setZipCode(formZipCode)
    setUserZipCode(formZipCode)
    setShowLocationModal(false)
  }

  const handleBadZipCode = (formZipCode) => {    
    setShowLocationModal(false)
  }  

  const handleLocationButtonClick = () => {
    setShowLocationModal(true)  
  }

  if (temperature !== 0) {
      return <div style={{backgroundColor:'pink'}}>
                <ChangeLocationModal 
                  show={showLocationModal} 
                  zipcode={zipcode}
                  handleNewZipCode={handleNewZipCode}
                  handleBadZipCode={handleBadZipCode}/>
                      <div className="flex"
                      style={{
                      display:"flex",
                      flexDirection:"column",
                      backgroundColor:'deepskyblue',
                      minHeight:'100vh',
                      gap:'1vw'}}>        
                  <TitleBar title="Coco's Weather App!" />
                  <Scene temperature={temperature} time={time} weatherCode={weatherCode} />
                  <ChangeLocationButton handleClick={handleLocationButtonClick} zipcode={zipcode} />    
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
    return <div className='sweet-loading'
    style={{
      position:'fixed',
      left:"50%",
      top:"50%",
      transform: "translate(-50%, 50%)"
    }}>
      <GridLoader 
        color={'pink'} 
        loading={true} 
        css=''
        size={30}
        margin={1} />
    </div>
  }
  
}

export default App;
