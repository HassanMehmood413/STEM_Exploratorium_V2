import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './TechnologyPage.css';

const techCategories = [
  {
    id: 'space',
    title: 'Space Exploration',
    icon: '🚀',
    description: 'Explore the cosmos in interactive 3D',
    path: '/technology/space',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
    color: '#1a237e'
  },
  {
    id: 'robotics',
    title: 'Robotics',
    icon: '🤖',
    description: 'Learn about robotics and automation',
    path: '/technology/robotics',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
    color: '#004d40'
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    icon: '🧠',
    description: 'Discover the world of AI and machine learning',
    path: '/technology/ai',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
    color: '#311b92'
  },
  {
    id: 'vr',
    title: 'Virtual Reality',
    icon: '🥽',
    description: 'Experience immersive virtual worlds',
    path: '/technology/vr',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=1200',
    color: '#bf360c'
  }
];

const TechnologyPage = () => {
  return (
    <div className="technology-page">
      <div className="tech-hero">
        <div className="tech-hero-overlay"></div>
        <Container>
          <h1 className="tech-title">Technology Explorer</h1>
          <p className="tech-subtitle">
            Discover the future of technology through interactive experiences
          </p>
        </Container>
      </div>

      <Container className="tech-categories">
        <Row>
          {techCategories.map((category) => (
            <Col md={6} lg={3} key={category.id} className="mb-4">
              <Link to={category.path} className="tech-card">
                <div 
                  className="tech-card-image" 
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div 
                    className="tech-card-overlay"
                    style={{ backgroundColor: `${category.color}dd` }}
                  >
                    <span className="tech-card-icon">{category.icon}</span>
                  </div>
                </div>
                <div className="tech-card-content">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="tech-features">
        <Container>
          <h2>Featured Technologies</h2>
          <Row className="mt-4">
            <Col md={4}>
              <div className="tech-feature-item">
                <div className="tech-feature-icon">🔬</div>
                <h3>Research Labs</h3>
                <p>Access cutting-edge research and experiments</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="tech-feature-item">
                <div className="tech-feature-icon">👥</div>
                <h3>Community</h3>
                <p>Connect with tech enthusiasts worldwide</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="tech-feature-item">
                <div className="tech-feature-icon">📱</div>
                <h3>Latest Trends</h3>
                <p>Stay updated with emerging technologies</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TechnologyPage;