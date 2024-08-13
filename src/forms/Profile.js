import React, {useState, useContext} from "react";
import UserContext from "../UserContext";
import { Form, Button, Card, Alert } from "react-bootstrap";

// Profile component
// List the user data
//    username (immutable)
//    firstName
//    lastName
//    email
// User can change everything but username
// This uses react bootstrap forms for data capture and validation
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
      <Card border="info" style={{width: '30rem'}} className="mb-3">
        <Card.Title>{currentUser.username}</Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>
                First Name
              </Form.Label>
                <Form.Control 
                  required
                  type="text" 
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
            </Form.Group>      
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>
                Last Name
              </Form.Label>
                <Form.Control 
                  required
                  type="text" 
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
            </Form.Group>  
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>
                Email
              </Form.Label>
                <Form.Control 
                  required
                  type="email" 
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
            </Form.Group>                                            
            {updated && 
            <Alert key="updated" variant="success">
              Profile Updated!
            </Alert>}  
            {errMsg && 
             <Alert key={"err"} variant="danger">API Error: {errMsg}</Alert>
            }                        
            <Button type="submit">
              Update Profile
            </Button>
          </Form> 
        </Card.Body>
      </Card>
    </div>
  )
}

export default Profile;