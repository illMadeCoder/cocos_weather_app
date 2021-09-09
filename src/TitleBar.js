// eslint-disable-next-line import/no-anonymous-default-export
export default ({title}) => 
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