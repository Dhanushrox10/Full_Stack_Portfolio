import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "./hero.css";
import site1 from "../assets/images/site1.png";

export default function Hero() {
  const [init, setInit] = useState(false);
  const typedRef = useRef(null);

  // Initialize tsParticles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Typed.js
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Data Engineering",
        "Full Stack Development",
        "Programming",
        "Web Development",
        "Machine Learning",
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1000,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  const heroImgRef = useRef(null);

  const handleHeroMove = (e) => {
    const el = heroImgRef.current;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((centerX - x) / centerX) * 8;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleHeroLeave = () => {
    heroImgRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section id="home" className="hero">
      {/* Only render Particles once it is initialized */}
      {init && (
        <Particles
          id="tsparticles"
          options={{
            fullScreen: { enable: false },
            background: { color: "transparent" },
            fpsLimit: 70,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
              modes: { repulse: { distance: 100, duration: 0.4 } },
            },
            particles: {
              color: { value: "#000000" },
              links: {
                color: "#000000",
                distance: 200,
                enable: true,
                opacity: 0.6,
                width: 1,
              },
              move: { enable: true, speed: 2 },
              number: { density: { enable: true, area: 800 }, value: 90 },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 3, max: 5 } },
            },
            detectRetina: true,
          }}
        />
      )}

      <div className="content">
        <div className="hero-left-container slide-in-down">
          <div className="hero-left">
            <h1>Hi There,</h1>
            <h2>
              I'm <span style={{ color: "#E52020" }}>Dhanush</span>
            </h2>
            <p>
              I’m into <span style={{ color: "#E52020" }} ref={typedRef}></span>
            </p>
            <a href="#about" className="about-btn">
              About Me <i className="bi bi-arrow-down-circle arrow-icon"></i>
            </a>

            <div className="social-icons slide-in-down">
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
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dhanushsm10@gmail.com&su=&tf=1"
                className="gmail"
              >
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-right-container slide-in-up">
          <div
            className="hero-right"
            onMouseMove={handleHeroMove}
            onMouseLeave={handleHeroLeave}
          >
            <img
              ref={heroImgRef}
              className="hero-image"
              src={site1}
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </section>
  );
}