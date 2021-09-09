import HashLoader from "react-spinners/HashLoader"

// eslint-disable-next-line import/no-anonymous-default-export
export default () => <div className='sweet-loading'
style={{
  position:'fixed',
  left:"50%",
  top:"50%",
  transform: "translate(-50%, 50%)"
}}>
  <HashLoader color='#FFB7FE'/>
</div>