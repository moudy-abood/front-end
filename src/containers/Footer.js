import React from "react";
import { Link } from "react-router-dom";

import "../assets/css/footer.css";
import "../assets/css/home.css";
import instagramIcon from "../assets/images/Instagram.svg";
import facebookIcon from "../assets/images/facebook.svg";
import youtubeIcon from "../assets/images/youtube.svg";
import logoIcon from "../assets/images/logo.png";

function Footer() {
  return (
    <div>
      <footer className="footer-flex">
        <div className="logo-icon">
          <Link to="/">
            <img src={logoIcon} alt="logo" className="logo-icon-2" />
          </Link>
        </div>
        <div className="contact-us">
          <h3>Contact Us</h3>
          <p>target@email.com</p>
          <p>+962459934012</p>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="help-support">
          <h3>Customer Support</h3>
          <ul>
            <li>
              <Link to="#">FAQs</Link>
            </li>
            <li>
              <Link to="#">Shipping Info</Link>
            </li>
            <li>
              <Link to="#">Return Policy</Link>
            </li>
          </ul>
        </div>
        <div className="connect-with-us">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <Link to="">
              <img
                src={instagramIcon}
                alt="Instagram"
                title="Instagram"
                className="instagram-icon"
              />
            </Link>
            <Link to="">
              <img
                src={facebookIcon}
                alt="Facebook"
                title="Facebook"
                className="facebook-icon"
              />
            </Link>
            <Link to="">
              <img
                src={youtubeIcon}
                alt="YouTube"
                className="youtube-icon"
                title="Youtube"
              />
            </Link>
          </div>
        </div>
      </footer>
      <div className="terms-privacy">
        <p>
          © 2025 Target. All rights reserved.
          <Link to="#">Privacy Policy</Link> |<Link to="#">Terms</Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
