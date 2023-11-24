import { useState, useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { Navigate, Link } from "react-router-dom";
import '../PageStyles/FormStyles.css'
// import { signIn } from "../auth"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { user, signIn } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await signIn(username, password)
      // Redirect to the app's main page or dashboard
    } catch (err) {
      setError(err.message)
    }
  }

  // If the user is logged in, don't show the login form
  if (user) {
    // Redirect to the profile page
    return <Navigate to="/profile" />
  }

  return (
    <div className="LoginPage">
      <form onSubmit={handleSubmit}>
        <div className="loginContainer">
          <h1>Log in</h1>

          <div className="input-container">
            <label>Username </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {/* {renderErrorMessage("pass")} */}
          </div>

          <Link to="/login/forgot-password">Forgot Password</Link>
          <Link to="/signup/">Don't have an account, Register</Link>

          <button type="submit" className="loginBut" onSubmit={handleSubmit}>
            <p>Login</p>
          </button>

          {/* <button className="siG">
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
              alt="Trees"
              height="30"
            />
            <p>Sign in with Google</p>
            
          </button> */}
      </div>
      </form>    
      {/* <Link to="/login/forgot-password">Forgot Password</Link>
      <Link to="/signup">Don't have an account, kindly sigup</Link> */}
      {error && console.log(error)}
      {/* {error && <p>{error}</p>} */}
    </div>
  )
}