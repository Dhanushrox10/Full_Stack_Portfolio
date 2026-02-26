import { useEffect } from "react";
import About from "./Components/about";
import Admin from "./Components/admin";
import Chat from "./Components/chat";
import Contact from "./Components/contact";
import Education from "./Components/education";
import Experience from "./Components/experience";
import Footer from "./Components/footer";
import Hero from "./Components/hero";
import Navbar from "./Components/navbar";
import Projects from "./Components/projects";
import Skills from "./Components/skills";
import useinView from "./Hooks/useinView";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Portfolio() { // Portfolio Component
  useinView(); // call the hook at the top level of the component to ensure it runs on every render
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <Chat />
      <ScrollToTopOnReload />
    </>
  );
}

function ScrollToTopOnReload() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function App() {
  useEffect(() => {
    // Disable right click
    const handleContextMenu = (e) => e.preventDefault();

    // Disable dev tools shortcuts
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    // Disable drag
    const handleDragStart = (e) => e.preventDefault();

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
