import { useState, useContext } from "react"
import { ConfirmSignUp } from "../Auth"
import { AuthContext } from "../Context/AuthContext"
import { Navigate, Link } from "react-router-dom";

export default function ConfirmUserSignUp() {
  const [username, setUsername] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  
  const { user } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await ConfirmSignUp(username, code)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {

      // if (user) {
      //   // Redirect to the profile page
      //   return <Navigate to="/profile" />
      // }
      <div>
        <h2>Confirmation successful!</h2>
        <p>You can now log in with your credentials. Go rock that app!</p>
      </div>
  }

  return (
    <div>
      <h2>Confirm Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Confirmation code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Confirm</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}