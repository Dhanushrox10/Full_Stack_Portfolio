import "./projects.css";
import dataEngImg from "../assets/images/dataeng.png";
import tripAdvisorImg from "../assets/images/tripadvisor.jpeg";
import portfolioImg from "../assets/images/portfolio.png";

export default function Projects() {
  const projects = [
    {
      img: dataEngImg,
      title: "Retail and E-commerce Analytics Platform",
      stack: "Databricks, Apache Spark, Azure, Delta Lake, Python.",
      description:
        "Built a data processing pipeline and analytics platform for structured & unstructured data.",
      link: "https://github.com/Dhanushrox10/Retail_And_Ecommerce_Analytics_Platform.git",
    },
    {
      img: tripAdvisorImg,
      title: "Trip Advisor Review Analysis Engine",
      stack: "Flask, Python, CNN, NLP, MySQL, Frontend: HTML, CSS, JavaScript.",
      description:
        "Created a website to search and recommend places based on reviews using NLP and CNN.",
      link: "https://github.com/Dhanushrox10/Trip_Advisor_Review_Analysis_Engine.git",
    },
    {
      img: portfolioImg,
      title: "Full Stack Web Application, Personal Portfolio",
      stack:
        "React, Node.js, Express.js, HTML, CSS, JS, Web Socket, JS Libraries.",
      description:
        "Personal Portfolio Website. You’re already here — just scroll and explore!",
      link: "#",
    },
  ];

  // Mouse tracking movement
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // tilt strength
    const rotateY = ((centerX - x) / centerX) * 10; // left/right tilt
    const rotateX = ((y - centerY) / centerY) * 10; // top/bottom tilt

    // opposite side comes up
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <section id="projects" className="projects">
      <h2 className="slide-in-right">
        <i className="bi bi-folder"></i> Featured
        <span className="highlights"> Projects</span>
      </h2>

      <div className="projects-container slide-in-left">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card slide-in-left"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={project.img}
              alt={project.title}
              className="project-image"
            />

            <div className="project-info">
              <h3>{project.title}</h3>
              <p className="stack">
                <span>Tech Stack:</span> {project.stack}
              </p>
              <p>{project.description}</p>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  View <i className="bi bi-code-slash"></i>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}