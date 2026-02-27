import { useEffect, useState, useRef } from "react";
import "./navbar.css";
import logo from "../assets/images/logo.png";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        menuRef.current && !menuRef.current.contains(e.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Active section detection (mobile + desktop)
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleLinkClick = (id) => {
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <a href="#" className="logo-name" onClick={() => handleLinkClick("home")}>
        <img src={logo} alt="Logo" />
        <h1>Dhanush</h1>
      </a>

      <ul className="nav-menu">
        <li>
          <a href="#home" className={active === "home" ? "active" : ""}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" className={active === "about" ? "active" : ""}>
            About
          </a>
        </li>
        <li>
          <a href="#skills" className={active === "skills" ? "active" : ""}>
            Skills
          </a>
        </li>
        <li>
          <a
            href="#education"
            className={active === "education" ? "active" : ""}
          >
            Education
          </a>
        </li>
        <li>
          <a href="#projects" className={active === "projects" ? "active" : ""}>
            Projects
          </a>
        </li>
        <li>
          <a
            href="#experience"
            className={active === "experience" ? "active" : ""}
          >
            Experience
          </a>
        </li>
        <li>
          <a href="#contact" className={active === "contact" ? "active" : ""}>
            Contact
          </a>
        </li>
      </ul>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <li>
          <a
            href="#home"
            className={active === "home" ? "active" : ""}
            onClick={() => handleLinkClick("home")}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className={active === "about" ? "active" : ""}
            onClick={() => handleLinkClick("about")}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className={active === "skills" ? "active" : ""}
            onClick={() => handleLinkClick("skills")}
          >
            Skills
          </a>
        </li>
        <li>
          <a
            href="#education"
            className={active === "education" ? "active" : ""}
            onClick={() => handleLinkClick("education")}
          >
            Education
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className={active === "projects" ? "active" : ""}
            onClick={() => handleLinkClick("projects")}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#experience"
            className={active === "experience" ? "active" : ""}
            onClick={() => handleLinkClick("experience")}
          >
            Experience
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={active === "contact" ? "active" : ""}
            onClick={() => handleLinkClick("contact")}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}