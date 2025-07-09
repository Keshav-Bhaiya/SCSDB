import React, { useState } from 'react';

const Footer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Join Button Section */}
        <div className="footer-brand">
          <div className="footer-logo">
            <h2 className="logo-text">
              THE
              <br />
              <span className="logo-highlight">SCSDB</span>
            </h2>
          </div>
          <button className="join-button">
            JOIN THE COMMUNITY
          </button>
        </div>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button className="hamburger-menu" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        {/* Footer Links Section */}
        <div className={`footer-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          {/* The Basics Column */}
          <div className="footer-column">
            <h3 className="footer-heading">THE BASICS</h3>
            <ul className="footer-list">
              <li><a href="/about">About SCSDB</a></li>
              <li><a href="/contactus">Contact Us</a></li>
              <li><a href="/support">Support Forums</a></li>
              <li><a href="/api">API Documentation</a></li>
              <li><a href="/status">System Status</a></li>
            </ul>
          </div>

          {/* Get Involved Column */}
          <div className="footer-column">
            <h3 className="footer-heading">GET INVOLVED</h3>
            <ul className="footer-list">
              <li><a href="/contribute">Contribution Bible</a></li>
              <li><a href="/add-movie">Add New Movie</a></li>
              <li><a href="/add-show">Add New TV Show</a></li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="footer-column">
            <h3 className="footer-heading">COMMUNITY</h3>
            <ul className="footer-list">
              <li><a href="/guidelines">Guidelines</a></li>
              <li><a href="/discussions">Discussions</a></li>
              <li><a href="/leaderboard">Leaderboard</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h3 className="footer-heading">LEGAL</h3>
            <ul className="footer-list">
              <li><a href="/terms">Terms of Use</a></li>
              <li><a href="/api-terms">API Terms of Use</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/dmca">DMCA Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: #1F1E24;
          color: white;
          padding: 60px 0 20px;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          gap: 80px;
          align-items: flex-start;
          position: relative;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 30px;
          min-width: 200px;
        }

        .footer-logo {
          margin-bottom: 10px;
        }

        .logo-text {
          font-size: 32px;
          font-weight: bold;
          line-height: 1;
          margin: 0;
          color: #00d4aa;
        }

        .logo-highlight {
          color: #6556CD;
        }

        .join-button {
          background-color: transparent;
          border: 2px solid #6556CD;
          color: #6556CD;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .join-button:hover {
          background-color: #6556CD;
          color: white;
          transform: translateY(-2px);
        }

        .hamburger-menu {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
        }

        .hamburger-line {
          width: 25px;
          height: 3px;
          background-color: #6556CD;
          margin: 3px 0;
          transition: 0.3s;
          transform-origin: center;
        }

        .hamburger-line.active:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger-line.active:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.active:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .footer-links {
          display: flex;
          gap: 50px;
          flex: 1;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-heading {
          font-size: 16px;
          font-weight: bold;
          margin: 0;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-list li a {
          color: #b5b5b5;
          text-decoration: none;
          font-size: 15px;
          transition: color 0.3s ease;
          line-height: 1.4;
        }

        .footer-list li a:hover {
          color: #6556CD;
        }

        .footer-bottom {
          border-top: 1px solid #333;
          margin-top: 40px;
          padding-top: 20px;
          text-align: center;
        }

        .footer-bottom p {
          margin: 0;
          color: #888;
          font-size: 14px;
        }

        /* Mobile Responsive Design */
        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }

          .footer-brand {
            align-items: flex-start;
            width: 100%;
            gap: 20px;
          }

          .hamburger-menu {
            display: flex;
          }

          .footer-links {
            flex-direction: column;
            gap: 20px;
            width: 100%;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
          }

          .footer-links.mobile-open {
            max-height: 1000px;
          }

          .footer-column {
            align-items: flex-start;
            width: 100%;
          }

          .footer-heading {
            font-size: 16px;
            text-align: left;
          }

          .footer-list {
            align-items: flex-start;
            text-align: left;
          }

          .logo-text {
            font-size: 28px;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 40px 0 20px;
          }

          .footer-container {
            padding: 0 15px;
          }

          .footer-links {
            gap: 15px;
          }

          .join-button {
            padding: 10px 20px;
            font-size: 12px;
          }

          .hamburger-menu {
            top: 15px;
            right: 15px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;