import React, {useEffect, useState} from "react";
import RouteList from "./Routes/RouteList";
import JoblyApi from "./api/JoblyAPI";
import { jwtDecode } from "jwt-decode";
import UserContext from "./UserContext";
import NavBar from "./Routes/NavBar";
import useJwtToken from "./hooks/useJwtToken";
import "core-js/stable/atob";

import "./css/App.css"

// Main App Component
// Load token and user on page load from localstorage
// Makes calls to hook to handle token
// 

function App() {

  const [currentUser, setCurrentUser] = useState({
    loaded: false,
    data: null
  });
  const {token, saveToken, removeToken} = useJwtToken("jToken");  

  // Call on load to check for token
  // If one is available, get it and load user data
  useEffect(() => {
    async function getUser() {
      if(token) {
        try {
          let {username} = jwtDecode(token);
          JoblyApi.token = token;
          let user = await JoblyApi.getUserData(username);       
          setCurrentUser({data: user});    
        } catch (e) {
          console.error(`Login Error`, e);
        }
  // If no token found, set user to anon
      } else {
        setCurrentUser({
          data: null
        });   
      }
    }
    getUser();     
  }, [token]);  // Call again when token needs to change

  // Call login API to get token data
  async function login (formData) {
    let res = await JoblyApi.login(formData);
    saveToken(res);
  }

  // Sign up a new user and get token data
  async function signup(formData) {
    let res = await JoblyApi.signup(formData);
    saveToken(res);
  }

  // Clear user data and remove token from localstorage
  function logout() {
    removeToken();
    setCurrentUser({
      loaded: false,
      data:null
    });
  }

  // Apply for a job
  async function submitApply(id) {
    try {
      JoblyApi.submitApply(currentUser.data.username, id);
      let currApps = currentUser.data.applications;
      currApps.push(id);                // Create a temp array, and push on applied to job
  
      setCurrentUser(user => ({         // This call updates the user with an individual job application ID
        ...user,                        // Save all the other data
        data: {                         // Update only the applications array, which stores jobs that the
          ...user.data,                 // user has applied to.
          applications: currApps
        }
      }));   
    } catch (e) {
      console.error(e);
    }     
  }

  // Update the user profile
  async function updateProfile(formData) {
    let res = await JoblyApi.update(formData, currentUser.data.username);

    setCurrentUser(user => ({
      ...user,                          // This call changes only the data that has been updated
      data: {                           // and changes it in the user's state
        ...user.data,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email
      }
    }));
  }  

  return (
    <UserContext.Provider value={{          // Allow current user to be passed to children
        currentUser: currentUser.data,
        submitApply}}>    

      <NavBar logout={logout}/>
          
      <RouteList user={currentUser.data} login={login} logout={logout} signup={signup} updateProfile={updateProfile}/>
    </UserContext.Provider>    
  )
}

export default App;