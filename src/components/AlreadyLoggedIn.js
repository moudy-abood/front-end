import React from "react";
import { Link } from "react-router-dom";

const AlreadyLoggedIn = (
  <div>
    <p>
      You are already logged in, click <Link to="/">here</Link> to go to the
      main page
    </p>
  </div>
);

export default AlreadyLoggedIn;
