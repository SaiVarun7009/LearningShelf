// import { useEffect, useState } from "react"
// import { getCurrentUser, signOut } from "../auth"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

export default function UserProfile() {
const { user, sessionDetails, signOut } = useContext(AuthContext)

return (
  <div>
    {console.log(user.sub)}
    {user && (
      <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>UserId: {user.sub}</p>
      <p>{Date.now().toString()}</p>
      <p>ID Token: {sessionDetails.idToken.jwtToken}</p>
      {/* <p>Access Token: {user.signInUserSession.accessToken.jwtToken}</p> */}
      {/* Display any other user data here */}
      </div>
    )}
  <button onClick={signOut}>Sign Out</button>
  </div>
)
}