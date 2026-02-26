import "./footer.css";
export default function Footer() {
  return (
    <section className="footer">
      <div className="footer-0">
        <div className="footer-1">
          <h2>Dhanush's Portfolio</h2>
          <p>
            Thank you for visiting my personal portfolio website. <br />
            Reach out through social media⚡.
          </p>
        </div>

        <div className="footer-2">
          <h2>Go To</h2>
          <ul className="footer-3-menu">
            <li>
              <a href="#home">
                <i className="bi bi-arrow-right-circle"></i> Home
              </a>
            </li>
            <li>
              <a href="#about">
                <i className="bi bi-arrow-right-circle"></i> About
              </a>
            </li>
            <li>
              <a href="#skills">
                <i className="bi bi-arrow-right-circle"></i> Skills
              </a>
            </li>
            <li>
              <a href="#education">
                <i className="bi bi-arrow-right-circle"></i> Education
              </a>
            </li>
            <li>
              <a href="#projects">
                <i className="bi bi-arrow-right-circle"></i> Projects
              </a>
            </li>
            <li>
              <a href="#experience">
                <i className="bi bi-arrow-right-circle"></i> Experience
              </a>
            </li>
            <li>
              <a href="#contact">
                <i className="bi bi-arrow-right-circle"></i> Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-3">
          <h2>Contact Info</h2>
          <p>
            <i
              className="bi bi-telephone-fill"
              style={{ color: "#F9E400" }}
            ></i>{" "}
            +91 ##########
          </p>
          <p>
            <i className="bi bi-envelope-fill" style={{ color: "#F9E400" }}></i>{" "}
            dhanushsm10@gmail.com
          </p>
          <p>
            <i className="bi bi-geo-alt-fill" style={{ color: "#F9E400" }}></i>{" "}
            TamilNadu, India - 600041
          </p>

          <div className="social-icons footer-social-icons">
            <a
              href="https://www.linkedin.com/in/dhanush-s-68198b23b/"
              className="linkedin"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              href="https://github.com/Dhanushrox10"
              className="github"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.instagram.com/dhanxzh/"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=dhanushsm10@gmail.com"
              className="gmail"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-envelope gmail"></i>
            </a>
          </div>
        </div>
      </div>
      <hr />

      <div className="last-line">
        <p style={{ color: "white" }}>
          Made With
          <span className="emoji-spin" style={{ color: "red" }}>
            <i className="bi bi-heart-fill"></i>
          </span>
          By<span style={{ color: "#F9E400" }}> Dhanush Saravanan</span>
        </p>
      </div>
    </section>
  );
}
