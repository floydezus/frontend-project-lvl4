import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import enter from '../enter.jpeg';
import { entries } from 'lodash';

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
    // validationSchema: Yup.object().shape({
    //   username: Yup.string()
    //     .required("Пожалуйста, заполните это поле."),
    //   password: Yup.string()
    //     .required("Пожалуйста, заполните это поле.")
    // }),
    // onSubmit: values => {


  });

  return (
    <Container fluid>
      <Row className="justify-content-center pt-5">
        <Col className="col-sm-4">
          <Card>
            {/* <Card.Header>Вход</Card.Header> */}
            <Card.Title className="text-center m-3"><h1>Enter</h1></Card.Title>
            <Card.Body>
                {/* <Card.Img variant="left" src={enter} alt="Enter"/> */}
                <img src={enter} alt="Enter"/>
                <Form onSubmit={formik.handleSubmit}>
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
