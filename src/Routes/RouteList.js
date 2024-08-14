import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../Home";
import Companies from "../company/Companies";
import Jobs from "../jobs/Jobs";
import CompanyDetail from "../company/CompanyDetail";
import Login from "../forms/Login";
import Logout from "../Logout";
import Signup from "../forms/SignupForm";
import Profile from "../forms/Profile";

// RouteList Component
// Handle the routes for Jobly
// Allow only /login /signup and / for anon users
// Show other routes for logged in users

function RouteList({user, login, logout, signup, updateProfile}) {
  return (  
    <Routes>
      {console.log(`Route List`, user)}              
      {!user && 
        <>     
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />         
        </>     
      }
      <Route path="/" element={<Home />} />      
      {user && 
        <>          
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile updateProfile={updateProfile} />} />
          <Route path="/logout" element={<Logout logout={logout} />} />      
        </>
      }      
      <Route path="*" element={<Navigate to="/" />} />          
    </Routes>
  )
}

export default RouteList;
