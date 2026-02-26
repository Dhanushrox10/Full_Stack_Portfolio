import "./skills.css";
import html from "../assets/images/html.png";
import css from "../assets/images/css.png";
import js from "../assets/images/js.png";
import react from "../assets/images/react-js.png";
import python from "../assets/images/python.png";
import bootstrap from "../assets/images/bootstrap.png";
import mysql from "../assets/images/mysql.png";
import git from "../assets/images/git-vcs.png";
import cprog from "../assets/images/c-prog.png";
import github from "../assets/images/github.WEBP";
import mongodb from "../assets/images/mongodb.png";
import sass from "../assets/images/sass.png";
import nodejs from "../assets/images/nodejs.png";
import expressjs from "../assets/images/expressjs.png";
import databricks from "../assets/images/databricks.png";
import apache_spark from "../assets/images/apache_spark.png";
import azure from "../assets/images/azure.png";
import delta_lake from "../assets/images/delta_lake.png";
import data_pipelines from "../assets/images/data_pipelines.png";
import netlify from "../assets/images/netlify.png";

export default function Skills() {
  const skills = [
    { img: react, name: "ReactJS" },
    { img: html, name: "HTML" },
    { img: css, name: "CSS" },
    { img: js, name: "JavaScript" },
    { img: nodejs, name: "NodeJS" },
    { img: expressjs, name: "ExpressJS" },
    { img: bootstrap, name: "Bootstrap" },
    { img: sass, name: "SASS" },
    { img: python, name: "Python" },
    { img: cprog, name: "C" },
    { img: databricks, name: "Databricks" },
    { img: mysql, name: "MySQL" },
    { img: apache_spark, name: "Apache Spark" },
    { img: delta_lake, name: "Delta Lake" },
    { img: data_pipelines, name: "Data Pipelines" },
    { img: mongodb, name: "MongoDB" },
    { img: azure, name: "Azure" },
    { img: git, name: "Git VCS" },
    { img: github, name: "GitHub" },
    { img: netlify, name: "Netlify" },
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container slide-in-up">
        <h2>
          <i className="bi bi-laptop"></i>Skills <span>& Abilities</span>
        </h2>

        <div className="image-icons">
          {skills.map((skill, index) => (
            <div className="skill" key={index}>
              <img src={skill.img} alt={skill.name} />
              <h5>{skill.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}