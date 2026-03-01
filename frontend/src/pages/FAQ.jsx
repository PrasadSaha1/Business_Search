import { useState } from "react";
import Base from "../components/Base";
import "../styles/FAQ.css";
import { Link } from "react-router-dom";

function FAQ() {
  const [expanded, setExpanded] = useState({});

  // allows for the information to be shown or hidden
  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // all of the data
  const faqs = [
    { key: "q1", section: "Searching for a Business", question: "How does the website get businesses?", answer: "The website fetches data from OpenWebNinja’s Local Business Data. OpenWebNinja is a real-time public data API stack that allows this website to be possible." },
    { key: "q2", section: "Searching for a Business", question: "Why were the businesses completely different from the location I provided?", answer: "Occasionally, OpenWebNinja may glitch and ignore the provided zipcode. When this happens, attempting the search again will usually fix it." },
    { key: "q3", section: "Searching for a Business", question: "How does saving a business work?", answer: "When you click save business, the business will appear on the saved businesses page for you to access at any time. " },

    { key: "q4", section: "Reviews", question: "How do I leave a review?", answer: "If you are logged in, you can click View Reviews for a business and be prompted to leave a review." },
    { key: "q5", section: "Reviews", question: "Can I leave more than one review for the same business?", answer: "No, you may only leave one review per business." },
    { key: "q6", section: "Reviews", question: "Can I see other people’s reviews?", answer: "Yes, that can be seen under All Reviews and the reviews page." },

    { key: "q7", section: "The Account System", question: "What benefits does creating an account have?", answer: "Creating an account allows you to save businesses for future reference and leave reviews on businesses." },
    { key: "q8", section: "The Account System", question: "How will my email be used?", answer: "Your email will be used to help you recover your account in case you forget your account information." },
  ];

  let currentSection = "";

  return (
    <Base>
      <div className="faq-container">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Frequently Asked Questions</h1>

        <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <Link to="/help" style={{ display: "block", marginBottom: "10px" }}>Help Menu</Link>
            <Link to="/contact_us" style={{ display: "block" }}>Contact Us</Link>
        </div>


        {faqs.map((faq) => {
          const showSection = faq.section !== currentSection;
          currentSection = faq.section;

          return (
            <div key={faq.key}>
              {showSection && <h2>{faq.section}</h2>}
              <div className="faq-item">
                <button onClick={() => toggle(faq.key)}>{faq.question}</button>
                <div className={`faq-answer ${expanded[faq.key] ? "expanded" : ""}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Base>
  );
}

export default FAQ;
