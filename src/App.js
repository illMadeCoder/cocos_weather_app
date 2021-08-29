import React, {useState, useEffect} from "react";
import weatherService from "./services/weather"
import Card from "react-bootstrap/Card"

function App() {
  const [temperature, setTemperature] = useState(0)
  const [iconUrl, setIconUrl] = useState('')

  useEffect(() => {
    weatherService.get().then(res => 
      {
        const ctof = (c) => c*(9/5)+32
        setTemperature(10)
        //setTemperature(Math.floor(ctof(res.temperature)))
        // if (res.weather_icons.length > 0) {
        //   setIconUrl(res.weather_icons[0])
        // } else {
        //   setIconUrl('')
        // }        
      }
        )
  }
  ,[])

  return <div className="flex-container"
              style=
              {{
                display:"flex",
                flexDirection:"column",
                height:'100vh'
              }}>
    <div 
      style={{backgroundColor:"pink",              
              display:'flex',
              minWidth:'100vw',
              }}>
      <Card className='text-center'
        style={{backgroundColor:"lightcoral",
                border:'none',
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
          Coco's Weather App!
        </Card.Title>
      </Card>
    </div>
    <div 
    style={{
            backgroundColor:'deepskyblue',
            height:'auto',
            width:'100vw'}}>
      <Card 
        style={{backgroundColor:'aliceblue',
                width:'1040px',
                height:'1251px',
                marginLeft:'auto',
                marginRight:'auto',
                marginTop:'3%',                
                marginBottom:'1%',
                borderRadius:'2em',
                border:'solid .9em lightcoral',
                
                }}>
      <Card.Img src='./scenes/sample.png'
        style={{marginTop:'auto'}}
      />
      <Card.ImgOverlay>
      <div style={{paddingTop:"1%"}}>
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
                fontSize: '11em',
                fontFamily:'Patrick Hand',
                fontWeight: 'bold'
            }}>
              {temperature}
              </Card.Title>
           </Card.ImgOverlay>
          </Card>
        </div>
      </div>
      </Card.ImgOverlay>
      </Card>
    </div>
    <div 
      className='flexbox-container'
      style={{
        display:'flex',
        flexGrow:1,
        backgroundColor:'deepskyblue'
        }}>
          <Card
          style={{
            margin:'auto',
            marginTop:'5%',
            width:'1040px',            
            backgroundColor:"lightcoral",
            borderRadius:'2em',
            border:'pink'
          }}>
            <Card.Title
            style={{
              color: 'white',
              fontSize: '3em',
              fontFamily:'Patrick Hand',
              paddingLeft:'2%'
          }}>
              Credits:
            </Card.Title>
            <Card.Text
            style={{
              color: 'white',
              fontSize: '3em',
              fontFamily:'Patrick Hand',
              paddingLeft:'2%'
          }}>> inventor Coco Moore
            </Card.Text>
            <Card.Text
            style={{
              color: 'white',
              fontSize: '3em',
              fontFamily:'Patrick Hand',
              paddingLeft:'2%'
          }}>> developer Jesse Bergerstock
            </Card.Text>
            <Card.Text
            style={{
              color: 'white',
              fontSize: '3em',
              fontFamily:'Patrick Hand',
              paddingLeft:'2%'
          }}>> artist Jasmine Sutton
            </Card.Text>                          
          </Card>
      </div>      
  </div>      
}

export default App;
