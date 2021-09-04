import React, {useState, useEffect} from "react";
import weatherService from "./services/weather"
import Card from "react-bootstrap/Card"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

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

const TimeDisplay = ({time}) =>
  <div>
    <div
      style={{  
        width:'20vw',
        height:'8vw',
        borderRadius: '4vw',
        border:'solid 1vw lightcoral',
        backgroundColor:'pink',
        verticalAlign:'middle'
      }}>    

    <h2
    style={{
        color: 'white',
        textShadow: '0 0 .5vw black, 0 0 .5vw black',
        fontSize: '4.5vw',
        fontFamily:'Patrick Hand',
        fontWeight: 'bold',
        textAlign:'center'        
    }}>
      {time}
      </h2>
    </div>
  </div>

const WeatherDisplay = ({temperature}) =>                                
  <div              
    style={{width:'18vw',
            height:'18vw',             
            borderRadius:'2vw',
            border:'solid lightcoral',
            borderWidth:'1vw',
            backgroundImage:'url(./icons/sunshine.png)',
            backgroundPosition:'center',
            backgroundSize:'cover',
            marginLeft:'auto',
            marginRight:'auto'}}>
    <h2
      style={{color: 'white',
              textShadow: '0 0 .5vw black, 0 0 .5vw black',
              fontSize: '13vw',
              textAlign:'center',
              fontFamily:'Patrick Hand',
              fontWeight: 'bold'}}>
      {`${temperature}°`}
      </h2>
  </div>

const Scene = ({temperature, scene, time}) => 
<div
  style={{
    marginLeft:'auto',
    marginRight:'auto',
    width:'70%',
    height:'fit-content',
    position:'relative'
  }}>
  <div
      alt='a scene of a girl dressed approriately for the weather'
      style={{border:'solid lightcoral',        
              borderRadius:'2vw',
              borderWidth:'1vw',
              maxHeight:'100vh',
              width:'100%',
              height:'80vw',
              marginLeft:'auto',
              marginRight:'auto',
              backgroundImage:`url(./scenes/${scene}.png)`,
              backgroundSize:'100% 100%',
              backgroundPosition:'center'}}>
    <div style={{
      display:'block',
      marginLeft:'auto',
      width:'fit-content',
      marginRight:'2vw',
      marginTop:'2vw'
    }}> 
      <WeatherDisplay temperature={temperature} />
      <div style={{height:'.5vw'}}/>
      <TimeDisplay time={time} />
    </div>
  </div>    
</div>

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
    
const ChangeLocationModal = ({show, prevZipCode, handleNewZipCode}) => {
  const [newZipCode, setNewZipCode] = useState('')
  return  <Modal show={show}> 
    <Modal.Dialog size='lg'>
      <Modal.Header>
        <Modal.Title>Where are you?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => 
          {
            e.preventDefault()
            handleNewZipCode(newZipCode)
          }}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Enter Your Zip Code</Form.Label>
            <Form.Control     
            placeholder={prevZipCode} 
            required
            type='text'
            onChange={(e) => setNewZipCode(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal.Dialog>
  </Modal>
}

function App() {
  const [temperature, setTemperature] = useState(0)
  const [time, setTime] = useState('')
  const [iconUrl, setIconUrl] = useState('')
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [zipcode, setZipCode] = useState(13206)
  const [scene, setScene] = useState('warm')

  useEffect(() => {
    weatherService.get(zipcode).then(location => 
      {
        setTime(location.time)
        setTemperature(location.temperature)
        const hour = Number(location.time.match(/^\d\d?/)[0])
        const PMAM = location.time.match(/PM|AM/)[0]

        if (hour >= 8 && PMAM === 'PM') {
          setScene('late')
        } else if (location.temperature <= 30) {
          setScene('snow')  
        } else if (location.temperature <= 60) {
          setScene('cold')  
        } else if (location.temperature <= 80) {
          setScene('medium')  
        } else {
          setScene('warm')
        }        
      }
    )
  }
  ,[zipcode])

  const handleNewZipCode = (newZipCode) => {
    setZipCode(newZipCode)
    setShowLocationModal(false)
  }

  const handleLocationButtonClick = () => {
    setShowLocationModal(!showLocationModal)  
  }

  return <>
  <ChangeLocationModal show={showLocationModal} 
                       zipcode={zipcode}
                       handleNewZipCode={handleNewZipCode}/>
  <div className="flex"
              style={{
                display:"flex",
                flexDirection:"column",
                backgroundColor:'deepskyblue',
                minHeight:'100vh'}}>
    <TitleBar title="Coco's Weather App!" />
    <div style={{height:'1vw'}}/>
    <Scene temperature={temperature} scene={scene} time={time} />
    <div style={{height:'1vw'}}/>
    <ChangeLocationButton handleClick={handleLocationButtonClick} zipcode={zipcode} />    
    <div style={{height:'1vw'}}/>
    <Description />
    <div style={{height:'1vw'}}/>
    <Credits listOfCredits={['inventor Coco Moore', 
                              'developer Jesse Bergerstock', 
                              'artist Jasmine Sutton']}
                              style={{marginBottom:'auto'}}/>  
    </div>      
    </>}

export default App;
