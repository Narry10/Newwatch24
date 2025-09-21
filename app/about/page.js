import React from "react";
import Layout from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout breadcrumbTitle="About Us">
      <div className="container py-5 about-page">
        <h1>About NewsWatch24</h1>

        <section>
          <h2>Who We Are</h2>
          <p>
            NewsWatch24 is an independent digital platform created to deliver
            timely, accurate, and easy-to-read news updates. Founded by an
            individual passionate about journalism and online media, this site
            aims to make quality information accessible to readers everywhere.
          </p>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to provide trustworthy news and insights that
            empower readers to stay informed. We focus on clarity, transparency,
            and credibility, ensuring that every article is carefully selected
            and published to meet high editorial standards.
          </p>
        </section>

        <section>
          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Accuracy:</strong> Every piece of content is verified
              before being shared.
            </li>
            <li>
              <strong>Independence:</strong> We are not influenced by external
              parties or hidden agendas.
            </li>
            <li>
              <strong>Accessibility:</strong> News and information should be
              available to everyone, regardless of background.
            </li>
            <li>
              <strong>Transparency:</strong> We always aim to be open about our
              sources and editorial practices.
            </li>
          </ul>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            We welcome feedback, suggestions, and inquiries from our readers.
            Feel free to reach out anytime:
          </p>
          <p>
            📧 Email:{" "}
            <a href="mailto:contacts.usnewswatch24@gmail.com">
              contacts.usnewswatch24@gmail.com
            </a>
          </p>
          <p>
            Or visit our <a href="/contact">Contact Page</a> to send us a
            message directly.
          </p>
        </section>
      </div>
    </Layout>
  );
}
