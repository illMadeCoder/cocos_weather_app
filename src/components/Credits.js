// eslint-disable-next-line import/no-anonymous-default-export
export default ({listOfCredits}) =>
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