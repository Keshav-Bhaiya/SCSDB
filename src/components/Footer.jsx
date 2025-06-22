import React from 'react';

const Footer = () => {
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

        {/* Footer Links Section */}
        <div className="footer-links">
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

      {/* Footer Bottom */}
     

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

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            gap: 40px;
            text-align: center;
          }

          .footer-brand {
            align-items: center;
          }

          .footer-links {
            flex-direction: column;
            gap: 30px;
            width: 100%;
          }

          .footer-column {
            align-items: center;
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
            gap: 25px;
          }

          .join-button {
            padding: 10px 20px;
            font-size: 12px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;