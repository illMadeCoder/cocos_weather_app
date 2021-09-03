import React, {useState, useEffect} from "react";
import weatherService from "./services/weather"
import Card from "react-bootstrap/Card"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const TitleBar = ({title}) => 
  <div 
  style={{backgroundColor:"pink",              
          display:'flex',
          minWidth:'100%',
          borderBottom:'solid .4em lightcoral'
          }}>
  <Card className='text-center'
    style={{backgroundColor:"lightcoral",
            marginLeft:'auto',
            marginRight:'auto',
            height:'20vw',
            width:"60vw",
            borderRadius:'2em',
            maxHeight:'8em',
            minHeight:'8em',
            marginTop:'2%',
            marginBottom:'2%'            
            }}>
    <Card.Title
      style={{fontSize:'6vw',
              color:'white',
              fontFamily:'Patrick Hand',
              marginTop:'auto',
              marginBottom:'auto',
              paddingLeft:'1vw',
              paddingRight:'1vw'}}>
      {title}
    </Card.Title>
  </Card>
</div>

const TimeDisplay = ({time}) =>
  <div>
    <Card
      style={{
        width:'15em',
        height:'7em',
        borderRadius: '2em',
        border:'solid .9em lightcoral',
        backgroundColor:'pink'
      }}>    

    <Card.Title 
    style={{
        color: 'white',
        textShadow: '0 0 5px black, 0 0 5px black',
        fontSize: '4em',
        fontFamily:'Patrick Hand',
        fontWeight: 'bold',
        marginLeft:'auto',
        marginRight:'auto'
    }}>
      {time}
      </Card.Title>
    </Card>
  </div>

const WeatherDisplay = ({temperature}) => 
<div>                                
<Card              
  style={{    width:'30em',
              height:'30em',             
              borderRadius:'2em',
              maxHeight:'15em',
              maxWidth:'15em',
              minHeight:'10em',
              minWidth:'10em',
              border:'solid .9em lightcoral'
              }}>
   <Card.Img 
    src="./icons/sunshine.png" 
    alt="Card Image"/>
   <Card.ImgOverlay 
   style={{
    marginTop:'auto',
    marginBottom:'90%'            
   }}>
    <Card.Title 
    style={{
        color: 'white',
        textShadow: '0 0 8px black, 0 0 8px black',
        fontSize: '9em',
        fontFamily:'Patrick Hand',
        fontWeight: 'bold'        
    }}>
      {`${temperature}°`}
      </Card.Title>
   </Card.ImgOverlay>
  </Card>
</div>

const Scene = ({temperature, scene, time}) => 
  <Card 
    style={{backgroundColor:'aliceblue',
            width:'60%',
            height:'90%',
            marginLeft:'auto',
            marginRight:'auto',
            marginTop:'3%',                
            marginBottom:'1%',
            borderRadius:'2em',
            border:'solid .9em lightcoral'            
            }}>
  <Card.Img src={`./scenes/${scene}.png`}
    style={{
      marginTop:'auto',
      width:'100%',
      height:'100%'
    }}
  />
  <Card.ImgOverlay>
  <div className='flexbox-container' 
  style={{paddingTop:"1%",
          flexDirection:'column',
          marginLeft:'75%',
        marginRight:'auto', }}>
   <WeatherDisplay temperature={temperature}/>
   <div style={{height:'.5em '}}/>
   <TimeDisplay time={time}/>
  </div>
    
  </Card.ImgOverlay>
  </Card>

const Description = () => 
  <Card
  style={{
    margin:'4% auto auto auto',      
    width:'80%',
    backgroundColor:"lightcoral",
    borderRadius:'2em',
    border:'pink'
  }}>
<Card.Text
    style={{
      color: 'white',
      fontSize: '3em',
      fontFamily:'Patrick Hand',
      paddingLeft:'2%',        
  }}> coco's weather app presents the solution for when you just don't know what to wear outside! Come night, rain, snow, or sunshine this app will make sure you're appropriately dressed for the occasion....
    </Card.Text>   
    </Card>

const Credits = ({listOfCredits}) =>
    <Card
    style={{
      margin:'auto auto 2% auto',      
      width:'80%',
      minWidth:'80%',
      backgroundColor:"lightcoral",
      borderRadius:'2em',
      border:'pink'
    }}>     
      <Card.Title
      style={{
        color: 'white',
        fontSize: '3em',
        fontFamily:'Patrick Hand',
        paddingLeft:'2%',
        marginTop:'1%'
    }}>
        Credits
      </Card.Title>
      {listOfCredits.map(credit =>       
      <Card.Text key={credit}
      style={{
        color: 'white',
        fontSize: '3em',
        fontFamily:'Patrick Hand',
        paddingLeft:'2%'
    }}>> {credit}
      </Card.Text>)}                        
    </Card>

const ChangeLocationButton = ({handleClick, zipcode}) => 
      <button 
        onClick={() => handleClick()}
        style={{
          width:'auto',
          backgroundColor:'lightcoral',
          border:'none',
          fontFamily:'Patrick Hand',
          fontSize:'4em',
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
  <div className="flex-container"
              style=
              {{
                display:"flex",
                flexDirection:"column",
                height:'100vh',
                backgroundColor:'deepskyblue',
                width:'auto'
              }}>
    <TitleBar title="Coco's Weather App!"
    style={{display:'flex'}}/>
    <div 
     style={{
        backgroundColor:'deepskyblue',
        height:'auto',
        width:'100%'}}>
    <Scene temperature={temperature} scene={scene} time={time}   
    style={{
        backgroundColor:'deepskyblue',        
        width:'100%'}}/>
    </div>
    <div
      style={{
        backgroundColor:"deepskyblue",
        textAlign:'center'
      }}>
      <ChangeLocationButton handleClick={handleLocationButtonClick} zipcode={zipcode} />
    </div>
    <div 
      style={{
      display:'flex',
      flexGrow:1,
      backgroundColor:'deepskyblue',
      flexDirection:'column'   
      }}>
      <div
      style={{
        backgroundColor:'deepskyblue',
        paddingBottom:'2%'
      }}>
      <Description />
      </div>
      <div style={{marginLeft:'auto',
                   marginRight: 'auto',
                   width:'100%'}}>
      <Credits listOfCredits={['inventor Coco Moore', 
                              'developer Jesse Bergerstock', 
                              'artist Jasmine Sutton']}
                              style={{marginBottom:'auto'}}/>     
      </div>
      </div>
    </div>      
    </>}

export default App;
