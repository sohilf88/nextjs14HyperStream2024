import "./style.css"

function Login() {
  return (
    <div className="vid-container">
  <video className="bgvid" playsInline={false} autoPlay muted={true} preload="true" loop>
      <source src="https://0.s3.envato.com/h264-video-previews/3f56531e-3976-11e3-8c19-00505692144f/5905374.mp4"></source>
      {/* <source src="background.mp4" /> */}
  </video>
  <div className="inner-container">

    <div className="box">
      <h1>Login</h1>
      <input type="email" placeholder="Email ID" required/>
      <input type="password" placeholder="Password" required/>
      <button>Login</button>
     
    </div>
  </div>
</div>
 )
}

export default Login;
