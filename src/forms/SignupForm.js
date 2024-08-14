import React, {useState} from "react";
import { Alert, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

// Signup Form Component
// simple signup form for Jobly
// Requires the following fields to have data
//    username (text)
//    password (must be at least 5 characters)
//    firstName (text)
//    lastName (text)
//    email
//
// react controls input for validation
// On submit, call handleSubmit and pass form
// data to parent.

const SignupForm = ({signup}) => {

  const initialState = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",    
  }

  const [formData, setFormData] = useState(initialState);
  const [signupErr, setSignupErr] = useState("");
  
  const navigate = useNavigate();

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
      await signup(formData);
      setFormData(initialState);
      navigate("/");      
    } catch(e) {
      setSignupErr(e);
    }
  }

  return (
    <div className="mainContainer">
      <div className="card border-info mb-2" style={{width: '20rem'}}>
        <div className="card-body mb-2">
          <h1 className="card-title text-center mb-2">Sign Up</h1>
          <p className="card-text text-center mb-2"></p>   
            <form onSubmit={handleSubmit}>
            <label for="username">Username</label>
              <input 
                required
                className="form-control mb-2"
                id="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />        
            <label for="password">Password</label>
              <input 
                required
                className="form-control mb-2"
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />                          
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
              signupErr && 
              <Alert color="danger">
                {signupErr}
              </Alert>
            }                                              
            <Button type="submit" color="primary">
              Sign Up!
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupForm;