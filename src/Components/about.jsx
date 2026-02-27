import "./about.css";
import site2 from "../assets/images/site2.jpeg";

export default function About() {
  return (
    <section id="about" className="about-me">
      <div className="about-container">
        <h1 className="about-heading slide-in-right">
          <i className="bi bi-person-fill"></i> About <span>Me</span>
        </h1>

        <div className="about-content slide-in-left">
          <div className="profile-image-2">
            <img className="pic-2" src={site2} alt="Profile" />
          </div>
          <div className="about-text">
            <h2>I'm Dhanush</h2>
            <h4>Data Engineer & Full Stack Developer</h4>
            <p>
              Hello! I'm a Databricks Certified Data Engineer Associate with a
              strong focus on building efficient and scalable data pipelines.
              Experienced in data processing, ETL workflows, and handling large
              datasets using modern data engineering tools. Skilled in designing
              reliable data solutions that transform raw data into meaningful
              insights. Alongside data engineering, I also work as a Full Stack
              Developer, building responsive and user-focused web applications.
              Passionate about creating end-to-end solutions that combine strong
              backend systems with intuitive frontend experiences.
              <br />
              <br />
              <span className="label">Email: </span>dhanushsm10@gmail.com <br />
              <span className="label">Place: </span>Tamil Nadu, India
            </p>

            <button
              className="about-button"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/189OAC4OVBzOzh-Tal0szIZRIyYqPVqZy/view",
                  "_blank",
                )
              }
            >
              Resume <i className="bi bi-arrow-right-circle shake-arrow"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
