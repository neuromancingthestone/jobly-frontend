import React, {useContext} from "react";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";

// Home Component
// Welcome a returning user or
// show links to login and signup

function Home() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="mainContainer">   
      <div className="card border-info mb-3" style={{width: '20rem'}}>
        <div className="card-body">
          <h1 className="card-title text-center">Jobly</h1>
          <p className="card-text text-center">
            "All the jobs in one, convenient place."         
          </p>
          {currentUser && 
            <div className="card-footer bg-info">             
              <h5 className="text-center">Welcome back, {currentUser.username}</h5>
            </div> 
          }               

          {!currentUser &&
          <div className="text-center">
            <Link className="btn btn-primary mb-3" to="/login">Log in</Link>{' '}
            <Link className="btn btn-primary mb-3" to="/signup">Sign up</Link>    
          </div>
        }          
        </div>     
      </div>
    </div>    
  )
}

export default Home;