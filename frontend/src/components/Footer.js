import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <nav className="footer-links" aria-label="Footer">
          <a href="/privacy-policy">Privacy Policy</a>
          <span> | </span>
          <a href="/terms-of-service">Terms of Service</a>
          <span> | </span>
          <a href="/about-us">About Us</a>
          <span> | </span>
          <a href="/contact">Contact Us</a>
        </nav>

        <div className="footer-copy">Copyright © 2026 Quake Play. All rights reserved.</div>
      </div>
    </footer>
  );
}
