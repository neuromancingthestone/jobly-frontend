import React, {useState, useContext} from "react";
import UserContext from "../UserContext";
import { Alert, Button } from "reactstrap";

// Profile component
// List the user data
//    username (immutable)
//    firstName
//    lastName
//    email
// User can change everything but username
// let react control the form for validation
// Call updateProfile and pass to parent

function Profile({updateProfile}) {
  const { currentUser } = useContext(UserContext);

  const [updated, setUpdated] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const initialState = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,   
  }

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData(data => ({
      ...data,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();      
      await updateProfile(formData);
      setUpdated(true);
    } catch (e) {
      setErrMsg(e);
      setUpdated(false);
    }
  }  

  return (
    <div className="mainContainer">
      <div className="card border-info mb-2" style={{width: '20rem'}}>
        <div className="card-body mb-2">
          <h1 className="card-title text-center mb-2">{currentUser.username}</h1>
          <p className="card-text text-center mb-2"></p>   
            <form onSubmit={handleSubmit}>
              <label for="firstName">First Name</label>
              <input 
                required
                className="form-control mb-2"
                id="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />      
              <label for="lastName">Last Name</label>
              <input 
                required
                className="form-control mb-2"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />        
              <label for="email">Email</label>
              <input 
                required
                className="form-control mb-2"
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />                                                                                 
            {
              updated && 
                <Alert color="success">
                  Profile Updated!
                </Alert>}  
            {
              errMsg && 
                <Alert color="danger">
                  API Error: {errMsg}
                </Alert>
            }                        
            <Button type="submit" color="primary">
              Update Profile
            </Button>
          </form> 
        </div>
      </div>
    </div>
  )
}

export default Profile;