import React, { useContext, useState } from 'react';
import { BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Redirect,
} from "react-router-dom";
import { Navbar } from 'react-bootstrap';

import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';

const App = () => (
  <Router>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Chat</Navbar.Brand>
    </Navbar>
    <div className="container p-3">
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </div>
  </Router>

);

const Home = () => {
    return <h1 className="text-center mt-5 mb-4">Welcome to the club, buddy!</h1>;
};

export default App;
