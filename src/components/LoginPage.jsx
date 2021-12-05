import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
// import * as Yup from "yup";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import enter from '../../assets/enter.jpeg';

const LoginPage = () => {
  const auth = useAuth();
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const inputUsername = useRef();
  useEffect(() => {
    inputUsername.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsAuthFailed(false);
      console.log('onSubmit');
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('user', JSON.stringify(res.data));
        auth.logIn();
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setIsAuthFailed(true);
          inputUsername.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid>
      <Row className="justify-content-center align-content-center pt-5 h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow">
            {/* <Card.Header>Вход</Card.Header> */}
            <Card.Title className="text-center m-3"><h1>Enter</h1></Card.Title>
            <Card.Body className="row p-5">
                <Card.Img variant="left" className="h-50 w-50" src={enter} alt="Enter"/>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <Form.Group className="p-3">
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="username"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={isAuthFailed}
                    required
                    ref={inputUsername}
                  />
                  </Form.Group>
                  <Form.Group className="p-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="password"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      isInvalid={isAuthFailed}
                      required
                    />
                    <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="p-3">
                  <Button className="w-100" type="submit" variant="outline-primary" size="lg" disabled={formik.isSubmitting}>Enter</Button>
                </Form.Group>
                </Form>
            </Card.Body>
          </Card>
         </Col>
      </Row>
    </Container>

  );

}

export default LoginPage;
