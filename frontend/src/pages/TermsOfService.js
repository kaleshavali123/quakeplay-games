import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service - Quake Play";
    const desc = document.querySelector("meta[name='description']");
    if (desc) desc.setAttribute("content", "Read Quake Play's Terms of Service for rules, rights, and responsibilities when using our online gaming platform.");
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) canonical.setAttribute("href", "https://www.quakeplay.com/terms-of-service/");
  }, []);

  return (
    <main className="legal-page">
      <h1>Terms of Service</h1>
      <p className="meta">Effective Date: August 2026 | Last Updated: August 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using Quake Play (<a href="https://www.quakeplay.com">https://www.quakeplay.com</a>) (the "Site" or "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service. We reserve the right to modify these Terms at any time, and your continued use of the Site constitutes acceptance of any changes.</p>

      <h2>2. User Eligibility</h2>
      <p>You must be at least 13 years of age to use this Service. If you are under 18, you represent that you have the permission of your parent or legal guardian to access and use this Site. We do not knowingly allow children under 13 to use our Service in violation of COPPA (Children's Online Privacy Protection Act). Parents or guardians concerned about their child's access should review our Privacy Policy and contact us immediately.</p>

      <h2>3. License and Use Restrictions</h2>
      <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use the Site and games solely for your personal, non-commercial entertainment purposes. You agree not to:</p>
      <ul>
        <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Site or games</li>
        <li>Modify, reverse engineer, decompile, or attempt to access the source code</li>
        <li>Remove or obscure any copyright, trademark, or proprietary notices</li>
        <li>Use the Service for any unlawful, illegal, or fraudulent purpose</li>
        <li>Engage in harassment, hate speech, violence, or discrimination</li>
        <li>Attempt to gain unauthorized access to our systems or servers</li>
        <li>Use automated tools, bots, or scripts to access or manipulate the Service</li>
      </ul>

      <h2>4. Intellectual Property Rights</h2>
      <p>All content on Quake Play, including games, graphics, text, images, logos, and design elements, are the property of Quake Play or its content providers and are protected by international copyright and intellectual property laws. Unauthorized use, reproduction, or distribution is prohibited without express written permission from Quake Play.</p>

      <h2>5. Third-Party Content and Links</h2>
      <p>Our Site may contain links to third-party websites and may feature third-party games or content. We do not endorse or assume responsibility for the content, accuracy, or practices of third-party sites. Your use of third-party sites is subject to their terms and privacy policies. We are not responsible for any third-party services, products, or content.</p>

      <h2>6. User Conduct and Content</h2>
      <p>Any comments, submissions, or communications you make on our Site must not be defamatory, abusive, offensive, or violate any laws. You are solely responsible for your conduct. We reserve the right to remove any content that violates these Terms without notice and to suspend or terminate your access to the Service.</p>

      <h2>7. Disclaimer of Warranties</h2>
      <p>The Site and all games are provided "AS IS" without warranty of any kind, express or implied. We disclaim all warranties, including merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that the Service will be uninterrupted, error-free, secure, or that any defects will be corrected. Your use of the Service is at your own risk.</p>

      <h2>8. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, Quake Play shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or use, even if advised of the possibility of such damages. Our total liability is limited to the amount you have paid to us (if any). Some jurisdictions do not allow the exclusion of certain warranties, so some of these exclusions may not apply to you.</p>

      <h2>9. Termination</h2>
      <p>We reserve the right to terminate or suspend your access to the Site immediately, without notice or liability, for any violation of these Terms or for any other reason at our sole discretion. Upon termination, your right to use the Service will immediately cease.</p>

      <h2>10. Advertisements and Sponsored Content</h2>
      <p>Our Site displays advertisements powered by Google AdSense and other advertising networks. These advertisements are served by third parties and are subject to their terms and privacy policies. We are not responsible for the content, accuracy, or practices of any advertisements. Ad networks may use cookies and other tracking technologies to serve personalized ads.</p>

      <h2>11. Indemnification</h2>
      <p>You agree to indemnify, defend, and hold harmless Quake Play and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney's fees) arising from your violation of these Terms, your use of the Service, or any illegal or unauthorized use of the Site.</p>

      <h2>12. Governing Law</h2>
      <p>These Terms are governed by and construed in accordance with the laws of the jurisdiction where Quake Play operates, without regard to its conflict of law provisions. You irrevocably submit to the exclusive jurisdiction of the courts in that location for the resolution of any disputes.</p>

      <h2>13. Severability</h2>
      <p>If any provision of these Terms is found to be invalid, unlawful, or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect, and the invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.</p>

      <h2>14. Entire Agreement</h2>
      <p>These Terms constitute the entire agreement between you and Quake Play regarding your use of the Service and supersede all prior agreements or communications, whether written or oral. There are no other understandings, promises, or representations, expressed or implied.</p>

      <h2>15. Contact Information</h2>
      <p>For questions or concerns about these Terms of Service, please contact us at:</p>
      <p>Quake Play<br />
      Email: <a href="mailto:shaikvali0922@gmail.com">shaikvali0922@gmail.com</a><br />
      Website: <a href="https://www.quakeplay.com">https://www.quakeplay.com</a></p>

      <nav className="legal-links">
        <a href="/privacy-policy">Privacy Policy</a> • <a href="/about-us">About Us</a>
      </nav>

      <footer className="legal-footer">Last Updated: August 2026</footer>
    </main>
  );
}
