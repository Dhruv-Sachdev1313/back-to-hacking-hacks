import { Button, Form } from 'react-bootstrap';
import React from "react";

interface LoginParams {
  email: string,
  password: string
} 

const Login = () => {



    const [loginParams, setLoginParams] = React.useState<LoginParams>({ 
      email: '',
      password: ''
    })

    function login(user) {

    }

    return(
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={e => setLoginParams(prevParams => ({...prevParams, email: e.target.value}))} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={e => setLoginParams(prevParams => ({...prevParams, password: e.target.value }))} placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button onClick={() => login(loginParams)} type="primary" type="submit">Submit</Button>
        </Form>
    );
}

export default Login;