import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy - Quake Play";
    const desc = document.querySelector("meta[name='description']");
    if (desc) desc.setAttribute("content", "Read Quake Play's Privacy Policy to understand how we collect, use, and protect your data on our gaming platform.");
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) canonical.setAttribute("href", "https://www.quakeplay.com/privacy-policy/");
  }, []);

  return (
    <main className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="meta">Effective Date: January 2024 | Last Updated: January 2024</p>

      <h2>1. Introduction</h2>
      <p>Welcome to Quake Play ("we," "us," "our," or "Company"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website quakeplay.com (the "Site") and play our online games.</p>

      <h2>2. Information We Collect</h2>
      <h3>2.1 Automatically Collected Information</h3>
      <p>When you access our Site, we automatically collect certain information about your device and usage, including:</p>
      <ul>
        <li>IP address</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Pages visited and time spent</li>
        <li>Referring website</li>
        <li>Game performance and scores</li>
      </ul>

      <h3>2.2 Cookies and Tracking Technologies</h3>
      <p>We use cookies, web beacons, and similar tracking technologies to enhance your experience, remember your preferences, and analyze Site usage. You can control cookies through your browser settings.</p>

      <h3>2.3 Third-Party Advertising</h3>
      <p>Our Site uses Google AdSense and other advertising partners that may collect information about your browsing habits to deliver personalized advertisements. These partners have their own privacy policies. For more information, visit Google's Privacy Policy.</p>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect for the following purposes:</p>
      <ul>
        <li>To provide, operate, and maintain our games and services</li>
        <li>To improve and optimize user experience</li>
        <li>To display personalized advertisements</li>
        <li>To analyze website traffic and user behavior</li>
        <li>To prevent fraud and enhance security</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>4. Children's Privacy (COPPA Compliance)</h2>
      <p>Quake Play does not knowingly collect personal information from children under 13 years of age. If we become aware that we have collected information from a child under 13, we will delete such information immediately. Our games are intended for users aged 13 and above. Parents or guardians who believe their child has provided information to us should contact us immediately at <a href="mailto:shaikvali0922@gmail.com">shaikvali0922@gmail.com</a>.</p>

      <h2>5. Data Sharing and Disclosure</h2>
      <p>We do not sell your personal information. However, we may share information with:</p>
      <ul>
        <li>Third-party service providers (analytics, hosting, advertising)</li>
        <li>Law enforcement or courts if required by law</li>
        <li>In case of business transfer or acquisition</li>
      </ul>

      <h2>6. Data Security</h2>
      <p>We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and keep your browser up-to-date.</p>

      <h2>7. Your Rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access your personal information</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Opt-out of personalized advertising</li>
      </ul>
      <p>To exercise any of these rights, please contact us at <a href="mailto:shaikvali0922@gmail.com">shaikvali0922@gmail.com</a>.</p>

      <h2>8. Third-Party Links</h2>
      <p>Our Site may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing any information.</p>

      <h2>9. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy periodically. Changes will be effective immediately upon posting to the Site. Your continued use of our Site after modifications indicates your acceptance of the updated policy. We recommend reviewing this page regularly to stay informed.</p>

      <h2>10. Contact Us</h2>
      <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
      <p>Quake Play<br />
      Email: <a href="mailto:shaikvali0922@gmail.com">shaikvali0922@gmail.com</a><br />
      Website: <a href="https://www.quakeplay.com">https://www.quakeplay.com</a></p>

      <nav className="legal-links">
        <a href="/terms-of-service">Terms of Service</a> • <a href="/about-us">About Us</a>
      </nav>

      <footer className="legal-footer">Last Updated: January 2024</footer>
    </main>
  );
}
