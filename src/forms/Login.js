import React, {useState} from "react";
import { Form, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Login Component 
// Uses React Bootstrap forms
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
{/*       <Card border="info" style={{ width: '40rem'}} className="mb-3"> */}
{/*         <Card.Title>Log In</Card.Title> */}
{/*         <Card.Body>         */}
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

{/*             <Form.Group as={Row} controlId="username" className="mb-3">
              <Form.Label column>
                Username
              </Form.Label>
              <Col sm={9}>
                <Form.Control 
                  required
                  type="text" 
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group> */}
{/*             <Form.Group as={Row} controlId="password" className="mb-3">
              <Form.Label column>
                Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control 
                  required
                  type="password" 
                  placeholder="Password"
                  autoComplete="on"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group> */}             
            {loginErr && 
             <Alert key={"err"} variant="danger">{loginErr}</Alert>
            }
            <Button type="submit">
              Log in!
            </Button>
          </Form>
        </div>
      </div>  
    </div>            
  )
}

export default Login;