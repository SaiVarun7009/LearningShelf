import { useState, useContext } from "react"
import { SignUp } from "../Auth"
import { BiUserCircle } from 'react-icons/bi';
import { AuthContext } from "../Context/AuthContext"
import { Navigate, Link } from "react-router-dom";
import '../PageStyles/FormStyles.css'

export default function UserSignUp() {

  const { user } = useContext(AuthContext)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await SignUp(username, email, password)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {
    return (
      <div>
        <h2>SignUp successful!</h2>
        <p>Please check your email for the confirmation code.</p>
      </div>
    )
  }

  // If the user is logged in, don't show the login form
  if (user) {
    // Redirect to the profile page
    return <Navigate to="/profile" />
  }

//   return (
//     <div>
//       <h2>SignUp</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">SignUp</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   )

  return (
    <div>
        <div className="loginContainer">
          <h1>Sign Up</h1>

          <div className="input-container">
            <label>Username </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className="input-container">
            <label>Email </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {/* {renderErrorMessage("pass")} */}
          </div>

          <Link to="/login/forgot-password">Forgot Password</Link>
          <Link to="/login/">Already Have an account, Login</Link>

          <button className="loginBut" onClick={handleSubmit}>
            <p>Sign Up</p>
          </button>

          <button className="siG">
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
              alt="Trees"
              height="30"
            />
            <p>Sign in with Google</p>
            
          </button>
      </div>
    </div>
  )
}