import "./experience.css";
export default function Experience() {
  const experiences = [
    {
      company: "Full Stack Developer",
      role: "Self Employed",
      date: "Jun 2021 - Present",
      side: "left",
    },
    {
      company: "NSIC",
      role: "Web Developer | Internship",
      date: "Aug 3, 2023 - Aug 10, 2023",
      side: "right",
    },
    {
      company: "Codsoft",
      role: "Web Developer | Internship",
      date: "Mar 10, 2024 - Apr 10, 2024",
      side: "left",
    },
    {
      company: "Cognifyz Technologies",
      role: "Web Developer | Internship",
      date: "Jul 8, 2024 - Aug 8, 2024",
      side: "right",
    },
    {
      company: "SriD Software Solutions",
      role: "Data Engineer Associate",
      date: "Sep 16, 2025 - Present",
      side: "left",
    },
  ];

  return (
    <section id="experience" className="experience">
      <div className="experience-container slide-in-up">
        <h2>
          <i className="bi bi-file-text"></i> Experience
          <span className="highlight"> & Journey</span>
        </h2>

        <div className="timeline slide-in-up">
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item ${exp.side}`}>
              <i className="bi bi-calendar-check timeline-icon"></i>

              <div className="exp-content slide-in-up">
                <h3>{exp.company}</h3>
                <p className="role">{exp.role}</p>
                <h5>{exp.date}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
