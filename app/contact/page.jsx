"use client";
import Layout from "@/components/layout/Layout";
import "../../public/assets/css/policy-pages.css";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get("website")) {
      setStatus("error");
      setMessage("Submission rejected.");
      return;
    }

    try {
      // For static export, use a third-party service like Formspree, Netlify Forms, or EmailJS
      // Example with Formspree (replace with your endpoint):
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      
      if (res.ok) {
        setStatus("success");
        setMessage(
          "Thanks! Your message has been sent. We'll get back to you soon."
        );
        form.reset();
      } else {
        setStatus("error");
        setMessage(
          "Sorry, we couldn't send your message. Please try again later."
        );
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Contact Us">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="contact-form-wrap">
              <h1>Contact NEWWATCH24</h1>
              <p>
                We'd love to hear from you! Get in touch for questions,
                suggestions, partnerships, or press inquiries.
              </p>

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="form-control"
                        autoComplete="name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="form-control"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="form-control"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="business">Business Partnership</option>
                    <option value="content">Content Suggestion</option>
                    <option value="technical">Technical Issue</option>
                    <option value="copyright">Copyright Concern</option>
                    <option value="advertising">Advertising Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="form-control"
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                </div>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="website"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="form-group form-consent">
                  <label className="checkbox">
                    <input type="checkbox" name="consent" required /> I agree to
                    the{" "}
                    <a href="/terms-of-service" target="_self" rel="nofollow">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" target="_self" rel="nofollow">
                      Privacy Policy
                    </a>
                    .
                  </label>
                  <p className="muted small">
                    This site may be protected by anti-spam measures. By
                    submitting this form, you consent to our processing your
                    data to respond to your inquiry.
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status !== "idle" && message && (
                  <div className={`form-status ${status}`}>{message}</div>
                )}
              </form>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="contact-info">
              <h3>Get In Touch</h3>

              <div className="info-item">
                <div className="icon">
                  <i className="las la-envelope"></i>
                </div>
                <div className="content">
                  <h4>Email Us</h4>
                  <p>
                    General:{" "}
                    <a href="mailto:usnewswatch24@gmail.com">
                      usnewswatch24@gmail.com
                    </a>
                  </p>
                  <p>
                    Business:{" "}
                    <a href="mailto:usnewswatch24@gmail.com">
                      usnewswatch24@gmail.com
                    </a>
                  </p>
                  <p>
                    DMCA:{" "}
                    <a href="mailto:usnewswatch24@gmail.com">
                      usnewswatch24@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">
                  <i className="las la-clock"></i>
                </div>
                <div className="content">
                  <h4>Response Time</h4>
                  <p>General inquiries: 24–48 hours</p>
                  <p>Business inquiries: 2-3 business days</p>
                  <p>DMCA notices: 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="faq-section">
              <h2>Frequently Asked Questions</h2>

              <div className="faq-item">
                <h4>How can I submit a movie news tip?</h4>
                <p>
                  Send us an email at{" "}
                  <a href="mailto:usnewswatch24@gmail.com">
                    usnewswatch24@gmail.com
                  </a>{" "}
                  with <strong>"News Tip"</strong> in the subject line.
                  Include all relevant details and sources.
                </p>
              </div>

              <div className="faq-item">
                <h4>Do you accept guest posts?</h4>
                <p>
                  We occasionally accept high-quality guest posts. Please email
                  your proposal and writing samples to{" "}
                  <a href="mailto:usnewswatch24@gmail.com">
                    usnewswatch24@gmail.com
                  </a>
                  .
                </p>
              </div>

              <div className="faq-item">
                <h4>How do I report copyright infringement?</h4>
                <p>
                  Please follow the process in our{" "}
                  <a href="/dmca">DMCA Policy</a> or email{" "}
                  <a href="mailto:usnewswatch24@gmail.com">usnewswatch24@gmail.com</a>.
                </p>
              </div>

              <div className="faq-item">
                <h4>Can I advertise on your website?</h4>
                <p>
                  For advertising opportunities, contact{" "}
                  <a href="mailto:usnewswatch24@gmail.com">
                    usnewswatch24@gmail.com
                  </a>{" "}
                  with details about your needs.
                </p>
              </div>
            </div>

            <p className="consent-note mt-4">
              By using our website and contacting us, you agree to our{" "}
              <a href="/terms-of-service">Terms of Service</a> and{" "}
              <a href="/privacy-policy">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}