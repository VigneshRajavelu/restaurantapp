import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.name.trim().length < 2) {
      alert("Name must contain at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (form.message.trim().length < 10) {
      alert("Message must contain at least 10 characters.");
      return;
    }

    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <section className="section contact-layout">
      <div className="contact-intro">
        <span className="eyebrow">GET IN TOUCH</span>
        <h1>We'd love to hear from you.</h1>
        <p>
          Have a question about our menu or an order? Send us a
          message using the form.
        </p>

        <div className="contact-detail">
          <span>📍</span>
          <div>
            <strong>Our location</strong>
            <p>Chennai, Tamil Nadu, India</p>
          </div>
        </div>

        <div className="contact-detail">
          <span>✉️</span>
          <div>
            <strong>Email</strong>
            <p>hello@Cocoa&Cream.example</p>
          </div>
        </div>

        <div className="contact-detail">
          <span>🕒</span>
          <div>
            <strong>Opening hours</strong>
            <p>Monday – Sunday, 10 AM – 10 PM</p>
          </div>
        </div>
      </div>

      <form className="panel contact-form" onSubmit={handleSubmit}>
        <h2>Send a message</h2>

        <label>Full name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          minLength={2}
          required
        />

        <label>Email address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />

        <label>Subject</label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="How can we help?"
          required
        />

        <label>Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message..."
          rows="5"
          minLength={10}
          required
        />

        <button type="submit" className="primary-btn">
          Send Message
        </button>

        {submitted && (
          <p className="success-message">
            Thank you! Your message has been submitted.
          </p>
        )}

        <p className="muted">
          Demo form: messages are validated in the browser and are not
          sent to a server.
        </p>
      </form>
    </section>
  );
}