import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import "../css/NavBar.css"
import UserContext from "../UserContext";

// NavBar Component
// Top of page
// Show available routes for user to click
// Depends on state of login.
// If user is logged in, show hidden routes
// If user is anon, show login and signup routes

function NavBar({logout}) {

  const { currentUser } = useContext(UserContext);

  return (
    <div>   
      <nav className="Navigation navbar navbar-expand-md">
        <Link className="navbar-brand" to="/">
          Jobly
        </Link>    
        <ul className="navbar-nav ms-auto">        
          {currentUser && 
            <>
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="/companies">
                  Companies
                </NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="/jobs">
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  Log out
                </Link>
              </li>  
            </>
          }          
          {!currentUser && 
            <>
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>    
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>                
            </>
          }        
        </ul>                 
      </nav>
    </div>
  )
}

export default NavBar;