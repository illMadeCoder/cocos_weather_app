// eslint-disable-next-line import/no-anonymous-default-export
export default ({handleClick, zipcode}) => 
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