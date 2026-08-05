import { useEffect, useMemo, useState } from "react";

const SUBJECT_OPTIONS = [
  "Game Issue/Bug Report",
  "Feature Request",
  "Game Suggestion",
  "Technical Support",
  "General Inquiry",
  "Partnership/Business",
  "Copyright/Removal Request",
  "Other"
];

const MAX_MESSAGE_LENGTH = 5000;

// Letters, spaces, hyphens, and apostrophes only (covers names like "Mary-Jane" or "O'Brien")
const NAME_PATTERN = /^[A-Za-z\s'-]*$/;

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidName = (name) => {
  return NAME_PATTERN.test(name);
};

export default function ContactUs() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameWarning, setNameWarning] = useState("");

  useEffect(() => {
    document.title = "Contact Us - Quake Play";
    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", "Contact Quake Play support for help, feedback, or partnership inquiries.");
    }
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.setAttribute("href", "https://www.quakeplay.com/contact");
    }
  }, []);

  const messageLength = formState.message.length;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "name") {
      // Block any character that isn't a letter, space, hyphen, or apostrophe as the user types
      if (!isValidName(value)) {
        setNameWarning("Please enter only text");
        return;
      }
      setNameWarning("");
    }

    setFormState((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validateForm = () => {
    if (formState.name.trim().length < 2) {
      return "Please enter your full name.";
    }
    if (!isValidName(formState.name)) {
      return "Name can only contain letters, spaces, hyphens, and apostrophes.";
    }
    if (!isValidEmail(formState.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (formState.message.trim().length < 3) {
      return "Please enter a message with at least 3 characters.";
    }
    if (formState.message.length > MAX_MESSAGE_LENGTH) {
      return `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`;
    }
    if (!formState.consent) {
      return "You must agree to the privacy policy before submitting.";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.target);
      const response = await fetch("https://formspree.io/f/xkoddwzd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Unable to submit the form. Please try again later.");
      }

      setStatus("success");
      setFormState({
        name: "",
        email: "",
        message: "",
        consent: false,
      });
    } catch (submitError) {
      setStatus("error");
      setError(submitError.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusMessage = useMemo(() => {
    if (status === "success") {
      return {
        type: "success",
        text: "Thanks! Your message has been sent. We'll get back to you within 24-48 hours."
      };
    }
    if (status === "error") {
      return {
        type: "error",
        text: error || "There was a problem submitting the form. Please try again."
      };
    }
    return null;
  }, [status, error]);

  return (
    <main className="legal-page contact-page">
      <div className="contact-header">
        <div>
          <h1>Contact Us</h1>
          <p className="meta">
            Need help, want to report a bug, or have a question for the Quake Play team? Fill out the form below and we'll contact you soon.
          </p>
        </div>
        <div className="contact-quick-help">
          <p><strong>Email</strong></p>
          <a href="mailto:shaikvali0922@gmail.com">shaikvali0922@gmail.com</a>
        </div>
      </div>

      <div className="contact-grid">
        <section className="contact-card contact-form-card">
          <h2>Send us a message</h2>
          <p className="form-subtitle">All fields marked with * are required.</p>

          {error && status !== "success" && (
            <div className="status-banner error" role="alert">
              {error}
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="Quake Play Contact Form Submission" />

            <div className="form-row">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                minLength={2}
                maxLength={100}
                pattern="[A-Za-z\s'-]+"
                title="Name can only contain letters, spaces, hyphens, and apostrophes."
                inputMode="text"
                className="form-input"
              />
              {nameWarning && (
                <div className="field-warning" role="alert">
                  {nameWarning}
                </div>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-row">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell us how we can help"
                required
                minLength={3}
                maxLength={MAX_MESSAGE_LENGTH}
                className="form-textarea"
              />
              <div className="message-counter">
                {messageLength}/{MAX_MESSAGE_LENGTH} characters
              </div>
            </div>

            <div className="form-row consent-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formState.consent}
                  onChange={handleChange}
                  required
                />
                I agree to the <a href="/privacy-policy">privacy policy</a> and understand my details will be used to respond to this request.
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </section>
      </div>

      <div className="contact-postscript">
        <h3>Why contact Quake Play?</h3>
        <ul>
          <li>Report gameplay issues and bugs</li>
          <li>Share ideas for new games or features</li>
          <li>Request help with account and site access</li>
        </ul>
      </div>

      <nav className="legal-links">
        <a href="/privacy-policy">Privacy Policy</a> • <a href="/terms-of-service">Terms of Service</a>
      </nav>

      <footer className="legal-footer">© 2026 Quake Play. Last Updated: August 5, 2026</footer>
    </main>
  );
}