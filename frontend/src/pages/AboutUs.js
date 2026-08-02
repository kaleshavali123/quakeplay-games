import { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us - Quake Play";
    const desc = document.querySelector("meta[name='description']");
    if (desc) desc.setAttribute("content", "Learn about Quake Play — our mission, vision, game categories, and commitment to players.");
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) canonical.setAttribute("href", "https://www.quakeplay.com/about-us/");
  }, []);

  return (
    <main className="legal-page">
      <h1>About Us</h1>

      <p className="meta">At Quake Play, we are passionate about providing the best free online gaming experience. Our mission is to bring entertaining, high-quality games directly to players' browsers without the need for downloads, installations, or payments.</p>

      <h2>1. Welcome to Quake Play</h2>
      <p>At Quake Play, we are passionate about providing the best free online gaming experience. Our mission is to bring entertaining, high-quality games directly to players' browsers without the need for downloads, installations, or payments.</p>
      <p>Whether you're looking to kill some time during a break, challenge yourself with a puzzle game, or enjoy competitive gameplay with action-packed adventures, Quake Play has something for everyone. We believe that gaming should be accessible to all, anytime, anywhere.</p>

      <h2>2. Our Vision</h2>
      <p>We believe that quality entertainment should be accessible to everyone, everywhere, and at any time. Our vision is to create a thriving gaming community where players from around the world can discover, enjoy, and share their favorite games without barriers.</p>
      <p>We're committed to fostering an inclusive environment where players of all ages and skill levels can find games they love. By removing barriers to entry—no downloads, no installations, no costs—we make gaming truly accessible to anyone with an internet connection.</p>

      <h2>3. What We Offer</h2>
      <p>Quake Play hosts a diverse collection of games across multiple genres, ensuring there's something for every gaming preference:</p>
      <ul>
        <li><strong>Action Games:</strong> Experience fast-paced gameplay and thrilling adventures. Test your reflexes with challenging action games that keep you on the edge of your seat.</li>
        <li><strong>Racing Games:</strong> Feel the rush of high-speed competitions on exciting tracks. From realistic simulators to arcade-style racers, we have racing games for every skill level.</li>
        <li><strong>Puzzle Games:</strong> Challenge your mind with brain-teasing puzzles and logical problems. Perfect for mental stimulation and relaxation.</li>
        <li><strong>Sports Games:</strong> Enjoy realistic simulations and competitive sports matches. Compete in your favorite sports without leaving your browser.</li>
        <li><strong>Arcade Games:</strong> Experience classic fun and nostalgic gameplay. Relive the golden age of arcade gaming with timeless titles.</li>
        <li><strong>Strategy Games:</strong> Test your tactical skills with strategic challenges and planning-based gameplay. Use your intelligence to outthink your opponents.</li>
        <li><strong>Multiplayer Games:</strong> Connect and compete with players worldwide. Join communities, team up with friends, or challenge strangers in exciting multiplayer experiences.</li>
      </ul>

      <h2>4. Why Choose Quake Play?</h2>
      <ul>
        <li><strong>Free Access</strong> — Play unlimited games without spending a penny. No hidden costs, no premium memberships—just pure gaming fun.</li>
        <li><strong>No Downloads Required</strong> — Play instantly in your browser. No installations, no storage needed. Start playing in seconds.</li>
        <li><strong>Wide Variety</strong> — Discover new games across all your favorite genres. We're constantly adding fresh titles to keep the fun going.</li>
        <li><strong>User-Friendly Interface</strong> — Easy navigation and intuitive gameplay. Our platform is designed for gamers of all skill levels.</li>
        <li><strong>Safe and Secure</strong> — Protected gaming environment for all ages. We prioritize security and provide COPPA-compliant experiences for younger players.</li>
        <li><strong>Regular Updates</strong> — Constantly adding new games and features. Your feedback shapes our platform's evolution.</li>
      </ul>

      <h2>5. Our Commitment</h2>
      <p>At Quake Play, we are committed to upholding these core values:</p>
      <ul>
        <li><strong>Quality & Entertainment</strong> — Providing high-quality, engaging games that entertain and challenge our players. We carefully curate our game library to ensure fun for everyone.</li>
        <li><strong>Community Safety</strong> — Maintaining a safe, welcoming, and respectful community for players of all ages. Zero tolerance for harassment, hate speech, or inappropriate content.</li>
        <li><strong>Privacy & Security</strong> — Protecting player privacy and data through strict security measures. We comply with COPPA, GDPR, and other privacy regulations.</li>
        <li><strong>Continuous Improvement</strong> — Continuously improving our platform with new features and game titles. We listen to player feedback and evolve accordingly.</li>
        <li><strong>Transparent Operations</strong> — Operating transparently and ethically in all our business practices. Honesty and integrity are core to who we are.</li>
      </ul>

      <h2>6. Community and Support</h2>
      <p>We value our players and are always listening to feedback. Our community is at the heart of everything we do. If you have suggestions for new games, ideas for improvements, or encounter any issues, we encourage you to reach out to our support team. Your input helps us make Quake Play better every day.</p>
      <p>Join thousands of gamers worldwide who enjoy quality entertainment on Quake Play. Whether you're a casual player or a hardcore gamer, you'll find games you love and a community that welcomes you.</p>

      <h2>7. Get in Touch</h2>
      <p>Have questions, suggestions, or feedback? We'd love to hear from you! Reach out to our team anytime:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:shaikvali0922@gmail.com">shaikvali0922@gmail.com</a></li>
        <li><strong>Website:</strong> <a href="https://www.quakeplay.com">https://www.quakeplay.com</a></li>
      </ul>

      <p className="cta"><strong>Ready to Play?</strong> Start your gaming adventure today. Explore our collection of free games and discover your next favorite.</p>

      <nav className="legal-links">
        <a href="/privacy-policy">Privacy Policy</a> • <a href="/terms-of-service">Terms of Service</a>
      </nav>

      <footer className="legal-footer">© 2024 Quake Play. Last Updated: July 11, 2026</footer>
    </main>
  );
}
