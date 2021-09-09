import { Textfit } from 'react-textfit'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({temperature, time, weatherCode}) => 
{
  let scene = 'warm'
  let icon = 'clear'

  if (time && time.length > 1) {
    const hour = Number(time.match(/^\d\d?/)[0])
    const PMAM = time.match(/PM|AM/)[0]  
    if ((hour >= 8 && hour < 12 && PMAM === 'PM')
      || ((hour < 6 || hour === 12) && PMAM === 'AM')) {
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
      if (temperature <= 40) {
        icon = 'late_cold'
      } else {
        icon = 'late_warm'
      }

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