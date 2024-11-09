import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ContentArea from './components/ContentArea/ContentArea';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import TechnologyPage from './components/TechnologyPage/TechnologyPage';
import SpaceVisualization from './components/SpaceVisualization/SpaceVisualization';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Engineering App Component
const EngineeringApp = () => {
  const [topic, setTopic] = useState('');
  const [activityType, setActivityType] = useState('DIY Project');
  const [generatedContent, setGeneratedContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [nasaApiKey, setNasaApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="engineering-app page-content">
      <BackgroundAnimation />
      <Header />
      <Container fluid className="main-container">
        <Row>
          <Col md={3}>
            <Sidebar 
              topic={topic}
              setTopic={setTopic}
              activityType={activityType}
              setActivityType={setActivityType}
              setGeneratedContent={setGeneratedContent}
              setUploadedImage={setUploadedImage}
              nasaApiKey={nasaApiKey}
              setNasaApiKey={setNasaApiKey}
              setLoading={setLoading}
            />
          </Col>
          <Col md={9}>
            <ContentArea 
              generatedContent={generatedContent}
              uploadedImage={uploadedImage}
              nasaApiKey={nasaApiKey}
              loading={loading}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Placeholder Components with consistent styling
const SciencePage = () => (
  <div className="science-page page-content">
    <BackgroundAnimation />
    <Container className="text-center py-5">
      <h1 className="display-4 mb-4 text-gradient">Engineering Exploreration</h1>
      <p className="lead">Discover the wonders of Engineering exploration...</p>
      <div className="coming-soon-badge">
        <span>Coming Soon</span>
      </div>
    </Container>
  </div>
);

// Placeholder components for other technology sections
const RoboticsPage = () => (
  <div className="robotics-page page-content">
    <BackgroundAnimation />
    <Container className="text-center py-5">
      <h1 className="display-4 mb-4 text-gradient">Robotics Lab</h1>
      <p className="lead">Explore the world of robotics and automation...</p>
      <div className="coming-soon-badge">
        <span>Coming Soon</span>
      </div>
    </Container>
  </div>
);

const AIPage = () => (
  <div className="ai-page page-content">
    <BackgroundAnimation />
    <Container className="text-center py-5">
      <h1 className="display-4 mb-4 text-gradient">AI Explorer</h1>
      <p className="lead">Discover artificial intelligence and machine learning...</p>
      <div className="coming-soon-badge">
        <span>Coming Soon</span>
      </div>
    </Container>
  </div>
);

const VRPage = () => (
  <div className="vr-page page-content">
    <BackgroundAnimation />
    <Container className="text-center py-5">
      <h1 className="display-4 mb-4 text-gradient">Virtual Reality Lab</h1>
      <p className="lead">Experience immersive virtual worlds...</p>
      <div className="coming-soon-badge">
        <span>Coming Soon</span>
      </div>
    </Container>
  </div>
);

const MathematicsPage = () => (
  <div className="mathematics-page page-content">
    <BackgroundAnimation />
    <Container className="text-center py-5">
      <h1 className="display-4 mb-4 text-gradient">Mathematics Lab</h1>
      <p className="lead">Unlock the beauty of mathematical patterns...</p>
      <div className="coming-soon-badge">
        <span>Coming Soon</span>
      </div>
    </Container>
  </div>
);

// Main App Component
function App() {
  useEffect(() => {
    console.log('Environment Variables Status:', {
      openai: process.env.REACT_APP_OPENAI_API_KEY ? 'Present' : 'Missing',
      anthropic: process.env.REACT_APP_ANTHROPIC_API_KEY ? 'Present' : 'Missing',
      nasa: process.env.REACT_APP_NASA_API_KEY ? 'Present' : 'Missing'
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/engineering" element={<SciencePage />} />
            <Route path="/science" element={<EngineeringApp />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/technology/space" element={<SpaceVisualization />} />
            <Route path="/technology/robotics" element={<RoboticsPage />} />
            <Route path="/technology/ai" element={<AIPage />} />
            <Route path="/technology/vr" element={<AIPage />} />
            <Route path="/mathematics" element={<MathematicsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;