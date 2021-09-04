import React, {useState, useEffect} from "react";
import weatherService from "./services/weather"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { Textfit } from 'react-textfit'

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

const Scene = ({temperature, time}) => 
{
  let scene = 'warm'
  if (time.length > 1) {
    const hour = Number(time.match(/^\d\d?/)[0])
    const PMAM = time.match(/PM|AM/)[0]  
    console.log(time)
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
                   backgroundImage:'url(./icons/sunshine.png)',
                   backgroundPosition:'center',
                   backgroundSize:'cover',
                   width:'25%',
                   height:'25%',
                   marginLeft:'auto',
                   marginRight:'2%',
                   marginTop:'2%',
                   border:'solid lightcoral',
                   color:'white',
                   textShadow: '-.1vw -.1vw 0 #000, .1vw -.1vw 0 #000, -.1vw .1vw 0 #000, .1vw .1vw 0 #000', 
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
                   height:'10%',
                   marginLeft:'auto',
                   marginRight:'2%',
                   marginTop:'2%',
                   border:'solid lightcoral',
                   color:'white',                   
                   borderRadius:'10%',
                   textAlign:'center',
                   fontWeight:'bold',                  
                   verticalAlign:'middle',
                   paddingLeft:'1%',
                   paddingRight:'1%',
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
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [zipcode, setZipCode] = useState(13206)

  useEffect(() => {
    weatherService.get(zipcode).then(location => 
      {
        setTime(location.time)
        setTemperature(location.temperature)
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
                minHeight:'100vh',
                gap:'1vw'}}>        
    <TitleBar title="Coco's Weather App!" />
    <Scene temperature={temperature} time={time} />
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
    </>}

export default App;
