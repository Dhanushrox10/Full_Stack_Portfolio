import "./contact.css";
import contactImg from "../assets/images/contact.png";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-containers">
        <h2 className="slide-in-right">
          <i className="bi bi-headset"></i> Let's{" "}
          <span className="highlight">Connect</span>
        </h2>

        <div className="contact-container slide-in-left">
          <div className="contact-image">
            <img src={contactImg} alt="Contact-img" />
          </div>

          <div className="contact-form">
            <form action="https://formspree.io/f/xaqdjljg" method="POST">
              <div className="input-icon">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
                <i className="bi bi-person-fill"></i>
              </div>

              <div className="input-icon">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
                <i className="bi bi-envelope-fill"></i>
              </div>

              <div className="input-icon textarea-icon">
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your message"
                  required
                ></textarea>
                <i className="bi bi-chat-dots"></i>
              </div>

              <button type="submit" className="contact-btn">
                Submit <i className="bi bi-send-fill btn-move"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
