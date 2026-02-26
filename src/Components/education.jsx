import "./education.css";
import collegeImg from "../assets/images/college.png";
import schoolImg from "../assets/images/school.png";

export default function Education() {
  return (
    <section id="education" className="education">
      <div className="education-container slide-in-up">
        <h2>
          <i className="bi bi-mortarboard-fill"></i> My{" "}
          <span className="edu-highlight">Education</span>
        </h2>

        <div className="education-list">
          <div className="education-item slide-in-right">
            <img
              className="education-pic"
              src={collegeImg}
              alt="KCG College of Technology"
            />
            <div className="edu-content">
              <h3>Bachelor of Engineering in Computer Science</h3>
              <p>KCG College of Technology | HITS</p>
              <span>2021 – 2025 | Completed</span>
            </div>
          </div>

          <div className="education-item slide-in-left">
            <img
              className="education-pic"
              src={schoolImg}
              alt="Sri Sankara Vidyashramam School"
            />
            <div className="edu-content">
              <h3>HSC Science | Computer Science</h3>
              <p>Sri Sankara Vidyashramam Matric Hr Sec School | SB</p>
              <span>2019 – 2021 | Completed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}