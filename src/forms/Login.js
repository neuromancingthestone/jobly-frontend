import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "reactstrap";

// Login Component 
// Get user data and allow react to control the form data
// Check that data is valid
// On submit, call login, and pass to parent

function Login({login}) {

  const initialState = {
    username: "",
    password: "",    
  }

  const [formData, setFormData] = useState(initialState);
  const [loginErr, setLoginErr] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData(data => ({
      ...data,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/");      
    } catch (e) {
      setLoginErr(e);
    }
  }  

  return (
    <div className="mainContainer">
      <div className="card border-info mb-2" style={{width: '20rem'}}>
        <div className="card-body mb-2">
          <h1 className="card-title text-center mb-2">Log In</h1>
          <p className="card-text text-center mb-2"></p>      
          <Form onSubmit={handleSubmit}>
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
              placeholder="Username"
              autoComplete="on"
              value={formData.password}
              onChange={handleChange}
            />                      
            {
              loginErr && 
              <Alert color="danger">
                {loginErr}
              </Alert>
            }
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Log in!
            </Button>          
          </Form>
        </div>
      </div>  
    </div>            
  )
}

export default Login;