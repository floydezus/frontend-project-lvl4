import React from 'react';
import {useLocation} from "react-router-dom";
import { Image } from 'react-bootstrap';

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className="d-flex justify-content-center">
      {/* Not Found for <code>{location.pathname}</code> */}
      <Image src="https://www.matt-thornton.net/wordpress/wp-content/uploads/page-not-found.png" alt="Not found"/>
    </div>
  );
}

export default NotFoundPage;
