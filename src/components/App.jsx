import React, { useContext, useState } from 'react';
import { BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap';

import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import Chat from './ChatPage';
import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isLogged = !!user?.token;
  const [loggedIn, setLoggedIn] = useState(isLogged);
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

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button  className="d-none">Log in</Button>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar className="justify-content-between p-3" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">Chat</Navbar.Brand>
        <AuthButton />
      </Navbar>
      <Routes>
        <Route path="/" element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
