import React, {useState} from "react";
import { Form, Row, Col, Button, Card, Alert } from "react-bootstrap";
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
// uses react bootstrap for form handling
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
      <Card border="info" style={{ width: '40rem'}} className="mb-2">
        <Card.Title>Sign Up</Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="username">
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
            <Form.Group as={Row} className="mb-3" controlId="password">
              <Form.Label column>
                Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control 
                  required
                  type="password" 
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group> 
            <Form.Group as={Row} className="mb-3" controlId="firstName">
              <Form.Label column>
                First Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control 
                  required
                  type="text" 
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>      
            <Form.Group as={Row} className="mb-3" controlId="lastName">
              <Form.Label column>
                Last Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control 
                  required
                  type="text" 
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>  
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column>
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control 
                  required
                  type="email" 
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>          
            {signupErr && 
             <Alert key={"err"} variant="danger">{signupErr}</Alert>
            }                                              
            <Button type="submit">
              Sign Up!
            </Button>
          </Form>
        </Card.Body>          
      </Card>
    </div>
  )
}

export default SignupForm;