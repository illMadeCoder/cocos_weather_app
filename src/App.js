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
        width:'30vw',
        height:'30vw',
        marginRight:'75%',
        marginLeft:'auto',
        borderRadius: '2em',
        maxHeight: '15em',
        maxWidth: '15em',
        minHeight:'10em',
        minWidth:'10em',
        border:'solid .9em lightcoral',
        marginBottom:'auto'
      }}>    
      5:00 PM
    </Card>
  </div>

const WeatherDisplay = ({temperature}) => 
<div>                                
<Card              
  style={{    width:'30vw',
              height:'30vw',
              marginLeft:'75%',
              marginRight:'auto',                  
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
        textShadow: '0 0 5px black, 0 0 5px black',
        fontSize: '11vw',
        fontFamily:'Patrick Hand',
        fontWeight: 'bold'        
    }}>
      {temperature}
      </Card.Title>
   </Card.ImgOverlay>
  </Card>
</div>

const Scene = ({temperature}) => 
  <Card 
    style={{backgroundColor:'aliceblue',
            width:'1000px',
            maxWidth:'95%',
            height:'1000px',
            marginLeft:'auto',
            marginRight:'auto',
            marginTop:'3%',                
            marginBottom:'1%',
            borderRadius:'2em',
            border:'solid .9em lightcoral'            
            }}>
  <Card.Img src='./scenes/sample.png'
    style={{
      marginTop:'auto',
      width:'100%',
      height:'100%'
    }}
  />
  <Card.ImgOverlay>
  <div style={{paddingTop:"1%"}}>
   <WeatherDisplay temperature={temperature}/>
  </div>
  {/* <div>
    <TimeDisplay />
  </div> */}
  </Card.ImgOverlay>
  </Card>

const Description = () => 
  <Card
  style={{
    margin:'4% auto auto auto',      
    width:'1000px',
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
      width:'1000px',
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
  const [iconUrl, setIconUrl] = useState('')
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [zipcode, setZipCode] = useState(13206)

  useEffect(() => {
    weatherService.get(zipcode).then(location => 
      {
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
  <div className="flex-container"
              style=
              {{
                display:"flex",
                flexDirection:"column",
                height:'100vh',
                backgroundColor:'deepskyblue'
              }}>
    <TitleBar title="Coco's Weather App!"
    style={{display:'flex'}}/>
    <div 
     style={{
        backgroundColor:'deepskyblue',
        height:'auto',
        width:'100%'}}>
    <Scene temperature={temperature}      
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
                   marginRight: 'auto'}}>
      <Credits listOfCredits={['inventor Coco Moore', 
                              'developer Jesse Bergerstock', 
                              'artist Jasmine Sutton']}
                              style={{marginBottom:'auto'}}/>     
      </div>
      </div>
    </div>      
    </>}

export default App;
