import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { BiUserCircle } from 'react-icons/bi';
import { SignUp } from "../Auth";
import '../PageStyles/FormStyles.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await SignUp(username, email, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <Navigate to="/confirm-signup" />
      // <div>
      //   <h2>SignUp successful!</h2>
      //   <p>Please check your email for the confirmation code.</p>
      // </div>
    );
  }

  // If the user is logged in, don't show the signup form
  if (user) {
    // Redirect to the profile page
    return <Navigate to="/profile" />;
  }

  return (
    <div className="LoginPage">
      <form onSubmit={handleSubmit}>
        <div className="loginContainer">
          <h1>Sign Up</h1>

          <div className="input-container">
            <label>Username </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <label>Email </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/login/">Already Have an account, Login</Link>

          <button className="loginBut" onClick={handleSubmit}>
            <p>Sign Up</p>
          </button>

        </div>
      </form>
    </div>
  );
}
