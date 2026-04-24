import React, { useState, useEffect } from 'react';
import axios from 'axios';

// The API URL for your Node.js backend
const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Handle Sticky Nav and Scroll Button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Fetch projects from your MongoDB backend
  useEffect(() => {
    axios.get(`${API_BASE}/projects`)
      .then(res => setProjects(res.data))
      .catch(err => console.error("Could not fetch projects", err));
  }, []);

  return (
    <div className={isMenuOpen ? "disabled-scroll" : ""}>
      
      {/* Scroll to Top Button */}
      <div className="scroll-button" style={{ display: isSticky ? 'block' : 'none' }}>
        <a href="#home"><i className="fas fa-arrow-up"></i></a>
      </div>

      {/* Navigation Menu */}
      <nav className={isSticky ? "sticky" : ""}>
        <div className={`navbar ${isMenuOpen ? "active" : ""}`}>
          <div className="logo"><a href="#">Portfolio.</a></div>
          <ul className="menu">
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
            <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            <div className="cancel-btn" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-times"></i>
            </div>
          </ul>
          <div className="media-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="menu-btn" onClick={() => setIsMenuOpen(true)} style={{ opacity: isMenuOpen ? 0 : 1 }}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>

      {/* Home Section */}
      <section className="home" id="home">
        <div className="home-content">
          <div className="text">
            <div className="text-one" style={{ color: 'white' }}>Hello,</div>
            <div className="text-two" style={{ color: 'white' }}>I'm Ramya</div>
            <div className="text-three">UI/UX Designer</div>
            <div className="text-four" style={{ color: 'white' }}>From India</div>
          </div>
          <div className="button">
            <button>Hire Me</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="content">
          <div className="title"><span>About Me</span></div>
          <div className="about-details">
            <div className="left">
              <img src="images/about.jpg" alt="About" />
            </div>
            <div className="right">
              <div className="topic">Designing Is My Passion</div>
              <p>
                I am a professional designer and developer... (your text here).
              </p>
              <div className="button">
                <button>Download CV</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Projects Section (Replacing your static Skills/Services) */}
      <section className="services" id="services">
        <div className="content">
          <div className="title"><span>My Live Projects</span></div>
          <div className="boxes">
            {projects.map((project) => (
              <div className="box" key={project._id}>
                <div className="icon">
                  <i className="fas fa-desktop"></i>
                </div>
                <div className="topic">{project.title}</div>
                <p>{project.description}</p>
                <div className="text-blue-500 font-bold mt-2">
                    <a href={project.link}>View Work</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Me section */}
      <section className="contact" id="contact">
        <div className="content">
          <div className="title"><span>Contact Me</span></div>
          <div className="text">
            <div className="topic">Have Any Project?</div>
            <p>I'm available for freelance work. Let's build something together.</p>
            <div className="button">
              <button>Let's Chat</button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="text">
          <span>Created By <a href="#">Ramya</a> | &#169; 2026 All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
}