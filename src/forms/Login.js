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
      <Card border="info" style={{ width: '40rem'}} className="mb-3">
        <Card.Title>Log In</Card.Title>
        <Card.Body>        
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="username" className="mb-3">
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
            </Form.Group>
            <Form.Group as={Row} controlId="password" className="mb-3">
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
            </Form.Group>             
            {loginErr && 
             <Alert key={"err"} variant="danger">{loginErr}</Alert>
            }
            <Button type="submit">
              Log in!
            </Button>
          </Form>
        </Card.Body>          
      </Card>
    </div>            
  )
}

export default Login;