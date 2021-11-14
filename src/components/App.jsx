import React, { useContext, useState } from 'react';
import { BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";
import { Navbar } from 'react-bootstrap';

import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">Chat</Navbar.Brand>
      </Navbar>
      <div className="container p-3">
      <Routes>
        <Route path="/" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
    </Router>
  </AuthProvider>
);

const Home = () => {
    return <h1 className="text-center mt-5 mb-4">Welcome to the club, buddy!</h1>;
};

export default App;
