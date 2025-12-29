import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  Download,
  ExternalLink,
  Send,
  Menu,
  X,
  Server,
  Monitor,
  Database
} from 'lucide-react';

/* --- CSS STYLES (Pure CSS - No Tailwind) --- */
const styles = `
  :root {
    --bg-color: #f8fafc;
    --text-color: #1e293b;
    --text-muted: #64748b;
    --primary: #2563eb;
    --primary-hover: #1d4ed8;
    --secondary: #06b6d4;
    --card-bg: #ffffff;
    --border-color: #e2e8f0;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    /* spacing system */
    --container-pad: clamp(14px, 3.5vw, 20px);
    --section-pad: clamp(54px, 6.5vw, 80px);
    --section-head-mb: clamp(28px, 4.8vw, 54px);
    --grid-gap: clamp(16px, 3vw, 30px);
    --card-pad: clamp(18px, 3vw, 30px);
  }

  .dark {
    --bg-color: #0f172a;
    --text-color: #f1f5f9;
    --text-muted: #94a3b8;
    --primary: #3b82f6;
    --primary-hover: #60a5fa;
    --secondary: #22d3ee;
    --card-bg: #1e293b;
    --border-color: #334155;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; transition: background-color 0.3s, color 0.3s; }

  html, body {
    width: 100%;
    overflow-x: hidden; /* removes left/right scroll issue */
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  a { text-decoration: none; color: inherit; }
  ul { list-style: none; }

  /* better anchor offset for fixed navbar */
  section[id] { scroll-margin-top: 90px; }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--container-pad);
  }

  /* Navbar */
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    padding: 14px 0;
    background: transparent;
    transition: all 0.3s ease;
    backdrop-filter: saturate(130%) blur(10px);
  }
  .navbar.scrolled {
    background: rgba(30, 41, 59, 0.82);
    box-shadow: var(--shadow);
    padding: 10px 0;
  }
  .dark .navbar.scrolled {
    background: rgba(15, 23, 42, 0.78);
  }

  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    font-family: monospace;
    color: var(--text-color);
    white-space: nowrap;
  }
  .logo span { color: var(--primary); }

  .nav-links-desktop { display: flex; align-items: center; gap: 26px; }
  .nav-link {
    color: var(--text-muted);
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s;
    cursor: pointer;
  }
  .nav-link:hover { color: var(--primary); }

  .theme-btn {
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    width: 42px;
    height: 42px;
    border-radius: 999px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
  }

  .mobile-menu-btn { display: none; gap: 10px; align-items: center; }
  .mobile-menu {
    background: var(--card-bg);
    border-bottom: 1px solid var(--border-color);
    padding: 16px var(--container-pad);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Hero Section */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 96px; /* navbar safe space */
    padding-bottom: 20px;
    position: relative;
    overflow: hidden;
  }
  .hero-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: var(--grid-gap);
    align-items: center;
  }
  .hero-subtitle {
    color: var(--primary);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
    display: block;
  }
  .hero-title {
    font-size: clamp(2.2rem, 4.6vw, 3.5rem);
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 12px;
    color: var(--text-color);
  }
  .gradient-text {
    background: linear-gradient(to right, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .typing-text {
    font-size: clamp(1.35rem, 3.2vw, 2rem);
    color: var(--text-muted);
    min-height: 44px;
    border-right: 3px solid var(--primary);
    padding-right: 6px;
    margin-bottom: 16px;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .hero-desc {
    font-size: 1.05rem;
    color: var(--text-muted);
    max-width: 560px;
    margin-bottom: 26px;
  }

  .btn-group { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn {
    padding: 12px 22px;
    border-radius: 999px;
    font-weight: 650;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border: none;
    font-size: 1rem;
    transition: transform 0.2s;
  }
  .btn:hover { transform: translateY(-2px); }
  .btn-primary {
    background: var(--primary);
    color: white;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.28);
  }
  .btn-outline {
    border: 2px solid var(--border-color);
    color: var(--text-color);
    background: transparent;
  }
  .btn-outline:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  .social-icons { display: flex; gap: 18px; margin-top: 28px; flex-wrap: wrap; }
  .social-icon { color: var(--text-muted); transition: 0.2s; cursor: pointer; }
  .social-icon:hover { color: var(--primary); transform: scale(1.08); }

  /* Code Card */
  .code-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: var(--card-pad);
    box-shadow: var(--shadow);
    transform: rotate(2.2deg);
    transition: 0.3s;
    max-width: 100%;
  }
  .code-card:hover { transform: rotate(0deg); }

  .window-dots { display: flex; gap: 8px; margin-bottom: 18px; border-bottom: 1px solid var(--border-color); padding-bottom: 14px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .code-line { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 0.92rem; margin-bottom: 10px; color: var(--text-muted); }
  .kw { color: #ec4899; }
  .str { color: #22c55e; }
  .fn { color: #eab308; }

  /* Sections */
  .section { padding: var(--section-pad) 0; }
  .section-header { text-align: center; margin-bottom: var(--section-head-mb); }
  .section-title {
    font-size: clamp(1.9rem, 3.2vw, 2.45rem);
    font-weight: 800;
    margin-bottom: 8px;
    display: inline-block;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    color: transparent;
  }
  .section-subtitle { color: var(--text-muted); }

  /* About */
  .about-card {
    background: var(--card-bg);
    border-radius: 18px;
    padding: clamp(22px, 3.5vw, 40px);
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
    display: flex;
    gap: clamp(16px, 3vw, 34px);
    align-items: center;
  }
  .avatar-box {
    width: clamp(150px, 18vw, 200px);
    height: clamp(150px, 18vw, 200px);
    border-radius: 18px;
    background: linear-gradient(135deg, var(--primary), #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(3rem, 6vw, 4rem);
    flex-shrink: 0;
  }
  .about-content h3 { font-size: clamp(1.35rem, 2.4vw, 1.8rem); margin-bottom: 12px; color: var(--text-color); }
  .about-content p { margin-bottom: 18px; color: var(--text-muted); }
  .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; margin-bottom: 22px; }
  .info-item { display: flex; align-items: center; gap: 10px; color: var(--text-color); font-weight: 600; min-width: 0; }
  .info-item span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* Skills */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: var(--grid-gap);
    align-items: stretch;
  }
  .skill-card {
    background: var(--card-bg);
    padding: var(--card-pad);
    border-radius: 16px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
  }
  .skill-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--text-color);
  }
  .skill-item { margin-bottom: 18px; }
  .skill-info { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 8px; font-weight: 650; color: var(--text-color); }
  .progress-bg { width: 100%; height: 10px; background: rgba(255,255,255,0.06); border: 1px solid var(--border-color); border-radius: 999px; overflow: hidden; }
  .progress-bar { height: 100%; border-radius: 999px; }

  /* Experience */
  .timeline { position: relative; max-width: 900px; margin: 0 auto; }
  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: var(--border-color);
  }
  .exp-item { display: flex; justify-content: space-between; margin-bottom: clamp(26px, 4vw, 46px); position: relative; gap: 18px; }
  .exp-content {
    width: 45%;
    background: var(--card-bg);
    padding: var(--card-pad);
    border-radius: 16px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
    position: relative;
  }
  .exp-dot {
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translate(-50%, 0);
    width: 14px;
    height: 14px;
    background: var(--primary);
    border: 4px solid var(--bg-color);
    border-radius: 50%;
    z-index: 2;
  }
  .exp-role { font-size: 1.15rem; font-weight: 850; color: var(--text-color); }
  .exp-company { color: var(--primary); font-weight: 750; margin-bottom: 6px; }
  .exp-period {
    display: inline-block;
    background: rgba(255,255,255,0.06);
    padding: 5px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 14px;
    border: 1px solid var(--border-color);
  }
  .tech-tag {
    display: inline-block;
    padding: 4px 10px;
    background: rgba(37, 99, 235, 0.12);
    color: var(--primary);
    border-radius: 7px;
    font-size: 0.82rem;
    margin-right: 6px;
    margin-bottom: 8px;
    font-weight: 650;
  }
  .exp-spacer { width: 45%; }

  /* Projects */
  .filter-btns { display: flex; justify-content: center; gap: 10px; margin-bottom: 26px; flex-wrap: wrap; }
  .filter-btn {
    padding: 8px 16px;
    border-radius: 999px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    color: var(--text-muted);
    cursor: pointer;
    font-weight: 650;
    transition: 0.2s;
  }
  .filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }

  .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--grid-gap); }
  .project-card { background: var(--card-bg); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow); transition: 0.3s; display: flex; flex-direction: column; }
  .project-card:hover { transform: translateY(-4px); }
  .project-img { height: 190px; background: rgba(255,255,255,0.06); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--text-muted); }
  .overlay { position: absolute; inset: 0; background: rgba(37, 99, 235, 0.9); display: flex; align-items: center; justify-content: center; gap: 14px; opacity: 0; transition: 0.3s; }
  .project-card:hover .overlay { opacity: 1; }
  .icon-btn { width: 44px; height: 44px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); transition: 0.2s; cursor: pointer; }
  .icon-btn:hover { transform: scale(1.08); }
  .project-body { padding: var(--card-pad); display: flex; flex-direction: column; gap: 12px; height: 100%; }
  .project-title { font-size: 1.18rem; font-weight: 850; color: var(--text-color); }
  .project-cat { font-size: 0.8rem; color: #10b981; font-weight: 750; text-transform: uppercase; background: rgba(16, 185, 129, 0.12); padding: 2px 8px; border-radius: 6px; }
  .project-desc { font-size: 0.96rem; color: var(--text-muted); margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

  /* Contact */
  .contact-container { display: grid; grid-template-columns: 1fr 1.35fr; gap: var(--grid-gap); align-items: start; }
  .contact-info-item { display: flex; align-items: center; gap: 18px; margin-bottom: 22px; }
  .contact-icon-box { width: 50px; height: 50px; background: rgba(255,255,255,0.06); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); box-shadow: var(--shadow); border: 1px solid var(--border-color); flex: 0 0 auto; }
  .contact-form { background: var(--card-bg); padding: clamp(22px, 3.5vw, 40px); border-radius: 18px; border: 1px solid var(--border-color); box-shadow: var(--shadow); }
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; margin-bottom: 8px; font-weight: 650; color: var(--text-color); }
  .form-input { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid var(--border-color); background: rgba(255,255,255,0.06); color: var(--text-color); font-family: inherit; outline: none; transition: 0.2s; }
  .form-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12); }
  textarea.form-input { resize: vertical; min-height: 120px; }
  .submit-btn { width: 100%; }

  /* Footer */
  .footer { text-align: center; padding: 34px 0; border-top: 1px solid var(--border-color); color: var(--text-muted); margin-top: 30px; }

  /* Tablet */
  @media (max-width: 1024px) {
    .hero-grid { grid-template-columns: 1fr; gap: 26px; text-align: center; }
    .hero-desc { margin-left: auto; margin-right: auto; }
    .btn-group { justify-content: center; }
    .social-icons { justify-content: center; }
    .code-card { display: none; }
    .contact-container { grid-template-columns: 1fr; }
    .nav-links-desktop { gap: 18px; }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .nav-links-desktop { display: none; }
    .mobile-menu-btn { display: flex; }
    .about-card { flex-direction: column; text-align: center; }
    .info-grid { grid-template-columns: 1fr; }
    .info-item { justify-content: center; }
    .hero-section { padding-top: 92px; }

    .timeline { padding-left: 0; }
    .timeline::before { left: 16px; transform: none; }
    .exp-item { flex-direction: column; padding-left: 34px; }
    .exp-content { width: 100%; }
    .exp-dot { left: 16px; transform: translate(0, 0); top: 18px; }
    .exp-spacer { display: none; }
  }

  /* Small phones */
  @media (max-width: 420px) {
    .btn { width: 100%; justify-content: center; }
    .typing-text { min-height: 40px; }
    .projects-grid { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: 1fr; }
  }
`;

/* --- PORTFOLIO DATA (Based on Chandu Yadav's CV) --- */
const PERSONAL_DETAILS = {
  name: "Chandu Yadav",
  role: "Full Stack Developer",
  location: "Mumbai, India",
  email: "chanduy421@gmail.com",
  phone: "+91 9011402723",
  github: "https://github.com/chanduyadav23",
  linkedin: "https://linkedin.com/in/chandu-yadav",
  about: "I am an entry-level Full Stack Developer with a strong foundation in Python, Django, and MySQL, alongside modern frontend expertise in React.js and Bootstrap. Passionate about problem-solving and building scalable web applications, I have hands-on experience from real-world internships and academic projects.",
};

const SKILLS = [
  { name: "Python", category: "Backend", level: 85 },
  { name: "Django", category: "Backend", level: 80 },
  { name: "MySQL / SQL", category: "Database", level: 75 },
  { name: "React.js", category: "Frontend", level: 75 },
  { name: "JavaScript (ES6+)", category: "Frontend", level: 80 },
  { name: "HTML5 & CSS3", category: "Frontend", level: 90 },
  { name: "Bootstrap / Tailwind", category: "Frontend", level: 85 },
];

const EXPERIENCE = [
  {
    id: 1,
    role: "Web Development Intern",
    company: "Quadigy",
    period: "Ongoing",
    description: "Working on frontend development using React, integrating APIs, and managing content with WordPress and PHP. Collaborating with senior developers to optimize web performance and user experience.",
    tech: ["React", "PHP", "WordPress", "API"]
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Lenskart Clone",
    category: "Full Stack",
    tech: ["Python", "Django", "SQLite/MySQL", "HTML", "CSS", "Bootstrap"],
    description: "A functional e-commerce clone of Lenskart built with Django MVT architecture. Features include product browsing, cart management, and user authentication.",
    github: "https://github.com/chanduyadav23/lenskart-clone",
    live: null
  },
  {
    id: 2,
    title: "Ecom-React",
    category: "Frontend",
    tech: ["React", "DummyJSON API", "React Router", "Context API"],
    description: "A dynamic e-commerce frontend application fetching real-time data from DummyJSON API. Implemented advanced routing, cart functionality, and responsive product grids.",
    github: "https://github.com/chanduyadav23/ecom-react",
    live: "#"
  }
];

/* --- COMPONENTS --- */

const Navbar = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#home" className="logo" aria-label="Home">
          <span>&lt;</span>Chandu<span>/&gt;</span>
        </a>

        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle Theme">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="mobile-menu-btn">
          <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle Theme (Mobile)">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="theme-btn"
            style={{ border: 'none' }}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mobile-menu"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="nav-link"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const toRotate = ["Full Stack Developer", "React & Django Developer", "Python Enthusiast"];

  useEffect(() => {
    let ticker = setTimeout(() => {
      let i = loopNum % toRotate.length;
      let fullText = toRotate[i];
      let updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, isDeleting ? 90 : 170);

    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum]);

  return (
    <section id="home" className="hero-section container">
      <div className="hero-grid">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="hero-subtitle">Welcome to my world</span>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{PERSONAL_DETAILS.name}</span>
          </h1>
          <div className="typing-text">{text}</div>
          <p className="hero-desc">
            Building robust web applications with Python, Django, and React.
            Turning complex problems into clean code.
          </p>

          <div className="btn-group">
            <a href="#contact" className="btn btn-primary">
              <Send size={18} /> Let's Connect
            </a>
            <a
              href={PERSONAL_DETAILS.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <Github size={20} /> GitHub
            </a>
          </div>

          <div className="social-icons">
            <a href={PERSONAL_DETAILS.github} target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href={PERSONAL_DETAILS.linkedin} target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${PERSONAL_DETAILS.email}`} className="social-icon" aria-label="Email">
              <Mail size={24} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="code-card"
        >
          <div className="window-dots">
            <div className="dot" style={{ background: '#ef4444' }}></div>
            <div className="dot" style={{ background: '#eab308' }}></div>
            <div className="dot" style={{ background: '#22c55e' }}></div>
          </div>
          <div className="code-content">
            <div className="code-line"><span className="kw">class</span> <span className="fn">Developer</span>:</div>
            <div className="code-line" style={{ paddingLeft: '20px' }}><span className="kw">def</span> <span className="fn">__init__</span>(self):</div>
            <div className="code-line" style={{ paddingLeft: '40px' }}>self.name = <span className="str">"{PERSONAL_DETAILS.name}"</span></div>
            <div className="code-line" style={{ paddingLeft: '40px' }}>self.stack = [<span className="str">"Django"</span>, <span className="str">"React"</span>]</div>
            <div className="code-line" style={{ paddingLeft: '20px' }}><span className="kw">def</span> <span className="fn">code</span>(self):</div>
            <div className="code-line" style={{ paddingLeft: '40px' }}><span className="kw">return</span> <span className="str">"High Impact Solutions"</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section container">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know me</p>
      </div>

      <div className="about-card">
        <div className="avatar-box">👨‍💻</div>

        <div className="about-content">
          <h3>Full Stack Developer & Tech Enthusiast</h3>
          <p>{PERSONAL_DETAILS.about}</p>

          <div className="info-grid">
            <div className="info-item">
              <MapPin size={18} color="var(--primary)" />
              <span>{PERSONAL_DETAILS.location}</span>
            </div>
            <div className="info-item">
              <Mail size={18} color="var(--primary)" />
              <span>{PERSONAL_DETAILS.email}</span>
            </div>
            <div className="info-item">
              <Phone size={18} color="var(--primary)" />
              <span>{PERSONAL_DETAILS.phone}</span>
            </div>
          </div>

          <button className="btn btn-outline" style={{ borderRadius: '10px' }}>
            <Download size={18} /> Download CV
          </button>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section container">
      <div className="section-header">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">My Technical Level</p>
      </div>

      <div className="skills-grid">
        {['Frontend', 'Backend', 'Database'].map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="skill-card"
          >
            <div className="skill-header">
              {category === 'Frontend' && <Monitor size={24} color="#3b82f6" />}
              {category === 'Backend' && <Server size={24} color="#22c55e" />}
              {category === 'Database' && <Database size={24} color="#a855f7" />}
              {category}
            </div>

            <div className="skill-list">
              {SKILLS.filter(s => s.category === category).map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="progress-bg">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.9 }}
                      className="progress-bar"
                      style={{
                        background:
                          category === 'Frontend' ? '#3b82f6' :
                          category === 'Backend' ? '#22c55e' : '#a855f7'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="section container">
      <div className="section-header">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">My Professional Journey</p>
      </div>

      <div className="timeline">
        {EXPERIENCE.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="exp-item"
            style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
          >
            <div className="exp-content">
              <h3 className="exp-role">{exp.role}</h3>
              <div className="exp-company">{exp.company}</div>
              <span className="exp-period">{exp.period}</span>
              <p style={{ marginBottom: '14px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                {exp.description}
              </p>
              <div>
                {exp.tech.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="exp-dot"></div>

            <div className="exp-spacer"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter || p.tech.includes(filter));

  return (
    <section id="projects" className="section container">
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">What I have built</p>
      </div>

      <div className="filter-btns">
        {['All', 'Full Stack', 'Frontend', 'Django', 'React'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <motion.div
            layout
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="project-card"
          >
            <div className="project-img">
              🚀
              <div className="overlay">
                {project.github && (
                  <a href={project.github} className="icon-btn" title="GitHub" target="_blank" rel="noreferrer">
                    <Github size={20} />
                  </a>
                )}
                {project.live && (
                  <a href={project.live} className="icon-btn" title="Live Demo" target="_blank" rel="noreferrer">
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            <div className="project-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
                <h3 className="project-title">{project.title}</h3>
                <span className="project-cat">{project.category}</span>
              </div>

              <p className="project-desc">{project.description}</p>

              <div>
                {project.tech.map(t => (
                  <span key={t} className="tech-tag" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus(null), 2500);
    }, 1200);
  };

  return (
    <section id="contact" className="section container">
      <div className="section-header">
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">Get in Touch</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3 style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.8rem)', marginBottom: '12px' }}>
            Let's talk about everything!
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '22px' }}>
            Whether you have a question, want to collaborate on a project, or just want to say hi, I'll try my best to get back to you.
          </p>

          <div className="contact-info-item">
            <div className="contact-icon-box"><Mail size={20} /></div>
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email</div>
              <div style={{ fontWeight: 650 }}>{PERSONAL_DETAILS.email}</div>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-box"><Phone size={20} /></div>
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Phone</div>
              <div style={{ fontWeight: 650 }}>{PERSONAL_DETAILS.phone}</div>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon-box"><MapPin size={20} /></div>
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Location</div>
              <div style={{ fontWeight: 650 }}>{PERSONAL_DETAILS.location}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-input" required placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label className="form-label">Your Email</label>
            <input type="email" className="form-input" required placeholder="john@example.com" />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-input" rows="4" required placeholder="Tell me about your project..." />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className="btn btn-primary submit-btn"
          >
            {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer container">
      <p style={{ marginBottom: '10px' }}>
        Designed & Built by <span style={{ color: 'var(--primary)', fontWeight: 750 }}>{PERSONAL_DETAILS.name}</span>
      </p>
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
};

/* --- MAIN APP --- */
export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
