import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:8000/api';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [aboutInfo, setAboutInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const [skillsRes, experiencesRes, projectsRes, contactRes, aboutRes] = await Promise.all([
        fetch(`${API_BASE_URL}/skills/`),
        fetch(`${API_BASE_URL}/experiences/`),
        fetch(`${API_BASE_URL}/projects/`),
        fetch(`${API_BASE_URL}/contact-info/`),
        fetch(`${API_BASE_URL}/about-info/`)
      ]);

      const [skillsData, experiencesData, projectsData, contactData, aboutData] = await Promise.all([
        skillsRes.json(),
        experiencesRes.json(),
        projectsRes.json(),
        contactRes.json(),
        aboutRes.json()
      ]);

      setSkills(skillsData);
      setExperiences(experiencesData);
      setProjects(projectsData);
      setContactInfo(contactData);
      setAboutInfo(aboutData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <h2>Loading Portfolio...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <HeroSection />
      <AboutSection aboutInfo={aboutInfo} />
      <SkillsSection skills={skills} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <ContactSection contactInfo={contactInfo} />
    </div>
  );
}

function Navigation({ activeSection, scrollToSection, isMenuOpen, setIsMenuOpen }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection('home')}>
          <span>Portfolio</span>
        </div>
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <div
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay-text">
        <div className="overlay-text">BHAVIN&nbsp;&nbsp;&nbsp;&nbsp;IS&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;STATEMENT&nbsp;&nbsp;&nbsp;&nbsp;OF&nbsp;&nbsp;&nbsp;&nbsp;LIFE</div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Bhavin Modh</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack Developer & Creative Technologist</h2>
            <p className="hero-description">
              Crafting exceptional digital experiences with modern technologies.
              Specializing in React, Django, and innovative solutions that transform ideas into reality.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Let's Collaborate
              </button>
              <button className="btn-secondary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                View Portfolio
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-content">
                  <div className="phone-avatar">BM</div>
                  <h3>Portfolio</h3>
                  <p>Professional developer creating innovative digital solutions with passion and precision.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ aboutInfo }) {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              {aboutInfo.intro_text || "A dedicated craftsman of digital experiences, specializing in the art of transforming visionary concepts into exceptional realities."}
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">🚀</div>
                <div className="highlight-content">
                  <h4>Fast Learner</h4>
                  <p>Quickly adapt to new technologies and frameworks</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">💡</div>
                <div className="highlight-content">
                  <h4>Problem Solver</h4>
                  <p>Creative solutions for complex technical challenges</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🤝</div>
                <div className="highlight-content">
                  <h4>Team Player</h4>
                  <p>Collaborative approach to achieving project goals</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">{aboutInfo.years_experience || 3}+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{aboutInfo.projects_completed || 50}+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{aboutInfo.client_satisfaction || 100}%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ skills }) {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="skill-category">{skill.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection({ experiences }) {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>
        <div className="timeline">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <span className="experience-period">{exp.period}</span>
                </div>
                <h4 className="experience-company">{exp.company}</h4>
                <p className="experience-description">{exp.description}</p>
                <div className="experience-technologies">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Some of my recent work</p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="project-phone">
                  <div className="project-phone-screen">
                    {project.image}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <button className="project-button">View Project</button>
                  <button className="project-button secondary">Live Demo</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ contactInfo }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/contact-message/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitMessage('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('There was an error sending your message. Please try again.');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's work together</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>{contactInfo.email || 'bhavin.modh@email.com'}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p>{contactInfo.phone || '+1 (555) 123-4567'}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h4>Location</h4>
                <p>{contactInfo.location || 'Your City, Country'}</p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  className="form-input"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  className="form-textarea" 
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="form-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitMessage && (
                <p className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
