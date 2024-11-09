import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BackgroundAnimation from '../BackgroundAnimation/BackgroundAnimation';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      title: 'Science',
      icon: '🔬',
      description: 'Explore the natural world through experiments and discovery',
      path: '/science',
      color: '#4CAF50',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop'
    },
    {
      title: 'Technology',
      icon: '💻',
      description: 'Discover digital innovations and computer science',
      path: '/technology',
      color: '#2196F3',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop'
    },
    {
      title: 'Engineering',
      icon: '⚙️',
      description: 'Design and build solutions to real-world problems',
      path: '/engineering',
      color: '#FF5722',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop'
    },
    {
      title: 'Mathematics',
      icon: '📐',
      description: 'Unlock the patterns and logic of numbers',
      path: '/mathematics',
      color: '#9C27B0',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop'
    }
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Interactive Learning',
      description: 'Engage with hands-on experiments and real-world applications'
    },
    {
      icon: '🤖',
      title: 'AI-Powered',
      description: 'Advanced AI assistance to help guide your learning journey'
    },
    {
      icon: '🌟',
      title: 'Project-Based',
      description: 'Learn by doing with practical projects and challenges'
    },
    {
      icon: '🌐',
      title: 'Global Community',
      description: 'Connect with learners and educators worldwide'
    }
  ];

  return (
    <div className="landing-page">
      <BackgroundAnimation />
      
      {/* Hero Section */}
      <section id="hero" className={`hero-section ${isVisible['hero'] ? 'visible' : ''}`}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="hero-content">
              <h1 className="hero-title">
                Discover the World of
                <span className="gradient-text"> STEM</span>
              </h1>
              <p className="hero-subtitle">
                Explore, Learn, and Innovate with our interactive STEM education platform
              </p>
              <button className="cta-button" onClick={() => navigate('/engineering')}>
                Start Learning
              </button>
            </Col>
            <Col md={6} className="hero-image">
              <img 
                src="https://img.freepik.com/free-vector/gradient-stem-education-concept_23-2149095789.jpg?w=1380&t=st=1709666391~exp=1709666991~hmac=8392540e5c876a91f8299558ed3c4ea4d44ae9f71947321a2c3ba5472845f8f8"
                alt="STEM Education"
                className="hero-image-element"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400?text=STEM+Education';
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section id="categories" className={`categories-section ${isVisible['categories'] ? 'visible' : ''}`}>
        <Container>
          <h2 className="section-title">Choose Your Path</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.title}
                className="category-card"
                style={{ 
                  '--hover-color': category.color,
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${category.image})`
                }}
                onClick={() => navigate(category.path)}
              >
                <div className="category-content">
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className={`features-section ${isVisible['features'] ? 'visible' : ''}`}>
        <Container>
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section id="stats" className={`stats-section ${isVisible['stats'] ? 'visible' : ''}`}>
        <Container>
          <Row>
            <Col md={3} sm={6}>
              <div className="stat-item">
                <h3>1000+</h3>
                <p>Projects</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-item">
                <h3>50K+</h3>
                <p>Students</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-item">
                <h3>100+</h3>
                <p>Experts</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-item">
                <h3>4.9/5</h3>
                <p>Rating</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className={`cta-section ${isVisible['cta'] ? 'visible' : ''}`}>
        <Container>
          <div className="cta-content">
            <h2>Ready to Start Your STEM Journey?</h2>
            <p>Join thousands of learners exploring the fascinating world of STEM</p>
            <button className="cta-button" onClick={() => navigate('/engineering')}>
              Get Started Now
            </button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;