import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Github, Linkedin, Mail, ExternalLink, Code, 
  Database, Server, Terminal, Download, User, Send, 
  Cpu, MapPin, Phone 
} from 'lucide-react';

/* --- CSS STYLES (Modern Dark Theme - Pure CSS) --- */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap');

:root {
  --bg-dark: #0f172a;
  --bg-card: #1e293b;
  --primary: #38bdf8;       /* Sky Blue */
  --secondary: #818cf8;     /* Indigo */
  --accent: #2dd4bf;        /* Teal */
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
  --gradient-main: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  --glass-bg: rgba(30, 41, 59, 0.7);
  --glass-border: rgba(255, 255, 255, 0.08);
  --shadow-glow: 0 0 20px rgba(56, 189, 248, 0.15);
  --nav-height: 80px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-dark);
  color: var(--text-main);
  line-height: 1.7;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

/* Scrollbar Customization */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: var(--bg-dark);
}
::-webkit-scrollbar-thumb {
  background: var(--bg-card);
  border-radius: 5px;
  border: 1px solid var(--glass-border);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--secondary);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes blink {
  50% { border-color: transparent; }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

/* Navbar */
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

header.scrolled {
  box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
  padding: 5px 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--nav-height);
}

.logo {
  font-size: 1.8rem;
  font-weight: 800;
  background: var(--gradient-main);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
  position: relative;
  z-index: 1001;
}

.nav-links {
  display: flex;
  gap: 40px;
  align-items: center;
}

.nav-links a {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
}

.nav-links a:hover {
  color: var(--primary);
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background: var(--primary);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-main);
  cursor: pointer;
  z-index: 1002;
}

/* Mobile Nav */
.mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  height: 100vh;
  background: var(--bg-card);
  padding: 100px 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  border-left: 1px solid var(--glass-border);
  box-shadow: -10px 0 30px rgba(0,0,0,0.5);
  z-index: 1000;
}

.mobile-nav.open {
  transform: translateX(0);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.overlay.open {
  opacity: 1;
  pointer-events: all;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: var(--nav-height);
}

.hero::before {
  content: '';
  position: absolute;
  top: -10%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(15, 23, 42, 0) 70%);
  border-radius: 50%;
  z-index: -1;
  animation: float 6s ease-in-out infinite;
}

.hero-content {
  max-width: 800px;
}

.hero-subtitle {
  color: var(--accent);
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  display: block;
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.highlight {
  background: var(--gradient-main);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.typing-container {
  font-family: 'Fira Code', monospace;
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  min-height: 1.5em;
  display: flex;
  align-items: center;
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 1.2em;
  background-color: var(--primary);
  margin-left: 5px;
  animation: blink 1s step-end infinite;
}

.hero p {
  font-size: 1.15rem;
  color: var(--text-muted);
  max-width: 600px;
  margin-bottom: 2.5rem;
}

.btn-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  transition: all 0.3s ease;
  text-align: center;
  justify-content: center;
}

.btn-primary {
  background: var(--gradient-main);
  color: white;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
  border: 1px solid var(--glass-border);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary);
  transform: translateY(-2px);
}

/* Sections */
section {
  padding: 100px 0;
}

.section-header {
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 15px;
}

.section-header h2::after {
  content: '';
  display: block;
  height: 1px;
  background: var(--glass-border);
  flex-grow: 1;
  max-width: 300px;
}

/* About Grid */
.about-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 4rem;
  align-items: start;
}

.about-text p {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.tech-stack-mini {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 2rem;
}

.profile-card {
  position: relative;
  max-width: 350px;
  margin: 0 auto;
}

.profile-card::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  border: 2px solid var(--primary);
  border-radius: 10px;
  z-index: -1;
  transition: all 0.3s ease;
}

.profile-card:hover::after {
  top: 15px;
  left: 15px;
}

.profile-img-placeholder {
  width: 100%;
  aspect-ratio: 1/1;
  background: linear-gradient(135deg, #1e293b, #2a3855);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--glass-border);
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.skill-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: var(--shadow-glow);
}

.skill-icon-wrapper {
  width: 50px;
  height: 50px;
  background: rgba(56, 189, 248, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.skill-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-pill {
  font-size: 0.85rem;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  color: var(--text-muted);
  transition: all 0.2s;
  border: 1px solid transparent;
}

.skill-card:hover .skill-pill {
  background: rgba(56, 189, 248, 0.1);
  color: var(--primary);
  border-color: rgba(56, 189, 248, 0.2);
}

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

.project-card {
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border-color: var(--secondary);
}

.project-header {
  height: 120px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.project-header::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(var(--glass-border) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
}

.folder-icon {
  color: var(--primary);
  z-index: 1;
  transform: scale(1);
  transition: transform 0.4s ease;
}

.project-card:hover .folder-icon {
  transform: scale(1.1) rotate(-5deg);
}

.project-body {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-type {
  color: var(--primary);
  font-size: 0.8rem;
  font-family: 'Fira Code', monospace;
  margin-bottom: 8px;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: var(--text-main);
  line-height: 1.2;
}

.project-title:hover {
  color: var(--primary);
}

.project-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
}

.project-tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  font-family: 'Fira Code', monospace;
  color: var(--text-muted);
}

.project-links {
  display: flex;
  gap: 20px;
  border-top: 1px solid var(--glass-border);
  padding-top: 1rem;
}

.project-link-icon {
  color: var(--text-muted);
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
}

.project-link-icon:hover {
  color: var(--primary);
}

/* Resume Section Styled */
.resume-section {
  background: linear-gradient(180deg, var(--bg-dark) 0%, #172033 100%);
  position: relative;
}

.resume-box {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 40px;
  border-left: 4px solid var(--primary);
  box-shadow: var(--shadow-glow);
  max-width: 900px;
  margin: 0 auto;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.exp-title {
  font-size: 1.5rem;
  color: var(--text-main);
  font-weight: 700;
}
.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

.exp-date {
  color: var(--primary);
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  background: rgba(56, 189, 248, 0.1);
  padding: 5px 10px;
  border-radius: 4px;
}

.exp-company {
  color: var(--secondary);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.exp-list {
  list-style: none;
  color: var(--text-muted);
}

.exp-list li {
  margin-bottom: 12px;
  display: flex;
  gap: 12px;
  font-size: 1rem;
}

.bullet {
  color: var(--primary);
  font-size: 1.2rem;
  line-height: 1.5;
}

/* Contact */
.contact-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.contact-card {
  background: var(--bg-card);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 14px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: var(--text-main);
  font-size: 1rem;
  transition: all 0.3s;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
}

.contact-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 3rem;
  text-align: center;
}

.contact-mini-item {
  background: rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--glass-border);
}

.social-bar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.social-item {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all 0.3s;
}

.social-item:hover {
  transform: translateY(-5px);
  background: var(--bg-card);
  color: var(--primary);
  border-color: var(--primary);
}

/* Footer */
footer {
  padding: 40px 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  border-top: 1px solid var(--glass-border);
  background: var(--bg-dark);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .mobile-menu-btn { display: block; }
  
  .hero { text-align: center; justify-content: center; }
  .hero-content { margin: 0 auto; }
  .typing-container { justify-content: center; }
  .btn-group { justify-content: center; }
  
  .about-grid { grid-template-columns: 1fr; }
  .profile-card { margin-top: 2rem; }
  
  .projects-grid { grid-template-columns: 1fr; }
  
  .form-row { grid-template-columns: 1fr; gap: 0; }
  .contact-card { padding: 1.5rem; }
  
  .exp-header { flex-direction: column; align-items: flex-start; gap: 5px; }
  .exp-date { margin-bottom: 5px; }
}
`;

// --- DATA ---
const DATA = {
  name: "Chandu Yadav",
  role: "Full Stack Developer",
  email: "chanduy421@gmail.com",
  phone: "+91 9011402723",
  location: "Mumbai, India",
  github: "https://github.com/chanduyadav23",
  linkedin: "https://www.linkedin.com/in/chanduyadavvv23/",
  about: "I am an entry-level Full Stack Developer with a strong foundation in Python, Django, and MySQL, alongside modern frontend expertise in React.js and Bootstrap. Passionate about problem-solving and building scalable web applications, I have hands-on experience from real-world internships and academic projects.",
  skills: [
    {
      category: "Frontend",
      icon: <Code size={24} />,
      items: ["React.js", "JavaScript (ES6+)", "HTML5 & CSS3", "Bootstrap", "Tailwind"]
    },
    {
      category: "Backend",
      icon: <Server size={24} />,
      items: ["Python", "Django", "REST APIs", "FastAPI"]
    },
    {
      category: "Database",
      icon: <Database size={24} />,
      items: ["MySQL", "SQL", "SQLite"]
    },
    {
      category: "Tools",
      icon: <Terminal size={24} />,
      items: ["Git", "GitHub", "VS Code", "Postman"]
    }
  ],
  projects: [
    {
      title: "Lenskart Clone",
      type: "Full Stack Project",
      tech: ["Python", "Django", "SQLite/MySQL", "Bootstrap"],
      desc: "A functional e-commerce clone of Lenskart built with Django MVT architecture. Features include product browsing, cart management, and user authentication.",
      github: "https://github.com/chanduyadav23/lenskart-clone",
      live: null
    },
    {
      title: "Ecom-React",
      type: "Frontend Application",
      tech: ["React", "DummyJSON API", "Context API", "CSS"],
      desc: "A dynamic e-commerce frontend application fetching real-time data. Implemented advanced routing, cart functionality, and responsive product grids.",
      github: "https://github.com/chanduyadav23/ecom-react",
      live: "https://ecom-react-blue.vercel.app"
    }
  ],
  experience: {
    role: "Web Development Intern",
    company: "Quadigy",
    period: "Ongoing",
    points: [
      "Working on frontend development using React and integrating APIs.",
      "Managing content with WordPress and PHP for client sites.",
      "Collaborating with senior developers to optimize web performance and user experience."
    ]
  }
};

// --- COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-content">
          <a href="#" className="logo">Chandu<span style={{color: 'var(--text-main)'}}>/&gt;</span></a>
          
          <nav className="nav-links">
            {navItems.map((item, index) => (
              <a key={item.name} href={item.href}>
                <span style={{color: 'var(--primary)', marginRight: '5px'}}>0{index + 1}.</span>
                {item.name}
              </a>
            ))}
            <a href="/resume.pdf" download className="btn btn-secondary" style={{padding: '8px 16px', fontSize: '0.9rem'}}>
              Resume <Download size={14} style={{marginLeft: '5px'}}/>
            </a>
          </nav>

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} style={{fontSize: '1.2rem', fontWeight: 600}}>
            <span style={{color: 'var(--primary)'}}>//</span> {item.name}
          </a>
        ))}
        <a 
          href="/resume.pdf" 
          download 
          className="btn btn-primary" 
          onClick={() => setIsOpen(false)}
          style={{marginTop: 'auto'}}
        >
          Download Resume
        </a>
      </div>
    </>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const toRotate = ["Full Stack Developer", "Python Enthusiast", "React Developer"];
  const period = 2000;
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => clearInterval(ticker);
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content animate-fade-in">
          <span className="hero-subtitle">Hi, my name is</span>
          <h1>
            {DATA.name}<span style={{color: 'var(--primary)'}}>.</span><br />
            <span className="highlight">I build things for the web.</span>
          </h1>
          
          <div className="typing-container">
             &gt; {text}<span className="cursor"></span>
          </div>

          <p>
            I am a {DATA.location} based Full Stack Developer specializing in React, Python, and Django. 
            Currently focused on building accessible, human-centered products.
          </p>
          
          <div className="btn-group">
            <a href="#projects" className="btn btn-primary">Check out my work</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="section-header">
          <h2><span style={{color: 'var(--primary)', fontSize: '1.5rem', marginRight: '10px'}}>01.</span> About Me</h2>
        </div>
        
        <div className="about-grid">
          <div className="about-text">
            <p>{DATA.about}</p>
            <p>
              I enjoy creating software that crosses the bridge between design and engineering. 
              My main focus these days is building accessible, inclusive products and digital experiences using 
              <span style={{color: 'var(--primary)', fontWeight: 'bold'}}> React</span> and <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>Django</span>.
            </p>
            <p>Here are a few technologies I've been working with recently:</p>
            
            <div className="tech-stack-mini">
              {['React.js', 'Python', 'Django', 'MySQL', 'Bootstrap', 'JavaScript'].map(tech => (
                <span key={tech} className="skill-pill" style={{color: 'var(--primary)', borderColor: 'rgba(56, 189, 248, 0.2)'}}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
  <div className="profile-card">
  <div className="profile-img-placeholder">
    <img
      src="/profile.jpg"
      alt="Chandu Yadav"
      className="profile-img"
    />
  </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
           <h2><span style={{color: 'var(--primary)', fontSize: '1.5rem', marginRight: '10px'}}>02.</span> Technical Skills</h2>
        </div>
        
        <div className="skills-grid">
          {DATA.skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon-wrapper">
                {skill.icon}
              </div>
              <h3>{skill.category}</h3>
              <div className="skill-list">
                {skill.items.map((item, i) => (
                  <span className="skill-pill" key={i}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-header">
          <h2><span style={{color: 'var(--primary)', fontSize: '1.5rem', marginRight: '10px'}}>03.</span> Some Things I've Built</h2>
        </div>
        
        <div className="projects-grid">
          {DATA.projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-header">
                <div className="folder-icon">
                  <Code size={45} />
                </div>
              </div>
              <div className="project-body">
                <div className="project-type">{project.type}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tech-stack">
                  {project.tech.map((t, i) => <span key={i}>#{t}</span>)}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-icon">
                      <Github size={18} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link-icon">
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="resume" className="resume-section">
      <div className="container">
        <div className="section-header">
          <h2><span style={{color: 'var(--primary)', fontSize: '1.5rem', marginRight: '10px'}}>04.</span> Experience</h2>
        </div>
        
        <div className="resume-box">
           <div className="exp-header">
              <h3 className="exp-title">{DATA.experience.role}</h3>
              <span className="exp-date">{DATA.experience.period}</span>
           </div>
           <div className="exp-company">@ {DATA.experience.company}</div>
           
           <ul className="exp-list">
              {DATA.experience.points.map((point, i) => (
                <li key={i}>
                  <span className="bullet">▹</span>
                  {point}
                </li>
              ))}
           </ul>
           
           <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
             <a href="/resume.pdf" download className="btn btn-secondary">
               <Download size={18} style={{marginRight: '8px'}} /> Download Full Resume
             </a>
           </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    }, 1500);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-header" style={{textAlign: 'center'}}>
           <p style={{color: 'var(--primary)', marginBottom: '1rem', fontWeight: 600}}>05. What's Next?</p>
           <h2 style={{justifyContent: 'center', fontSize: '3rem'}}>Get In Touch</h2>
           <p style={{maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)'}}>
             I am currently looking for full-time opportunities. Whether you have a question about my stack or just want to say hi, my inbox is always open!
           </p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info-grid">
             <div className="contact-mini-item">
                <MapPin size={24} style={{marginBottom: '10px', color: 'var(--primary)'}} />
                <div>{DATA.location}</div>
             </div>
             <div className="contact-mini-item">
                <Mail size={24} style={{marginBottom: '10px', color: 'var(--primary)'}} />
                <div>{DATA.email}</div>
             </div>
             <div className="contact-mini-item">
                <Phone size={24} style={{marginBottom: '10px', color: 'var(--primary)'}} />
                <div>{DATA.phone}</div>
             </div>
          </div>

          <div className="contact-card">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                  className="form-input" 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'} 
                {status !== 'sending' && <Send size={18} style={{marginLeft: '8px'}}/>}
              </button>
            </form>
          </div>

          <div className="social-bar">
            <a href={DATA.github} target="_blank" rel="noopener noreferrer" className="social-item">
              <Github size={20} />
            </a>
            <a href={DATA.linkedin} target="_blank" rel="noopener noreferrer" className="social-item">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${DATA.email}`} className="social-item">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>Designed & Built by <span style={{color: 'var(--primary)'}}>{DATA.name}</span></p>
        <div style={{marginTop: '10px', fontSize: '0.8rem', opacity: 0.6}}>
          <span style={{marginRight: '15px'}}><Code size={12} style={{verticalAlign: 'middle'}}/> React</span>
          <span><Cpu size={12} style={{verticalAlign: 'middle'}}/> Pure CSS</span>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <div className="App">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}