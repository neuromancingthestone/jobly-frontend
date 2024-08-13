import React, {useContext} from "react";
import { Button } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import UserContext from "./UserContext";

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
          <>
            <Stack gap={2}>
              <Button as="a" variant="primary" href="/login">Log in</Button>
              <Button as="a" variant="primary" href="/signup">Sign up</Button>
            </Stack>          
          </>
        }          
        </div>     
      </div>
    </div>    
  )
}

export default Home;