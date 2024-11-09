import React, { useState } from 'react';
import { Form, Button, Accordion, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faImage, faSatellite } from '@fortawesome/free-solid-svg-icons';
import { generateAIResponse } from '../../services/aiServices';
import '../Sidebar/Sidebar.css';

function Sidebar({
  topic,
  setTopic,
  activityType,
  setActivityType,
  setGeneratedContent,
  setUploadedImage,
  nasaApiKey,
  setNasaApiKey
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectCount, setProjectCount] = useState(3);

  const handleGenerate = async () => {
    if (!topic) {
      setError('Please enter a topic');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let prompt = '';
      if (activityType === "DIY Project") {
        prompt = `Generate ${projectCount} DIY project ideas for the STEM topic: ${topic}. Format the response with numbered points and include materials needed and steps.`.trim();
      } else if (activityType === "Virtual Field Trip") {
        prompt = `Suggest virtual field trip ideas related to the STEM topic: ${topic}. Include websites, virtual tours, and interactive resources.`.trim();
      } else {
        prompt = `Create a detailed STEM challenge for the topic: ${topic}. Include objectives, materials needed, and step-by-step instructions.`.trim();
      }

      const response = await generateAIResponse(prompt);

      if (response.includes('Error:')) {
        setError(response);
      } else {
        setGeneratedContent(response);
      }
    } catch (error) {
      setError(error.message || 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size too large. Please upload an image under 5MB.');
        return;
      }
      setUploadedImage(file);
      setError(null);
    }
  };

  return (
    <div className="sidebar">
      <h4 className="sidebar-title">
        <FontAwesomeIcon icon={faRocket} className="sidebar-icon" />
        Explore STEM Topics
      </h4>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <Form className="sidebar-form">
        <Form.Group className="mb-3">
          <Form.Label>Activity Type</Form.Label>
          <Form.Select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            className="custom-select"
          >
            <option>DIY Project</option>
            <option>Virtual Field Trip</option>
            <option>Challenge</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Topic</Form.Label>
          <Form.Control
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a STEM topic"
            className="custom-input"
          />
        </Form.Group>

        {activityType === "DIY Project" && (
          <Form.Group className="mb-3">
            <Form.Label>Number of Projects</Form.Label>
            <Form.Control
              type="number"
              value={projectCount}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 3;
                setProjectCount(Math.min(Math.max(value, 1), 10));
              }}
              min="1"
              max="10"
              className="custom-input"
            />
          </Form.Group>
        )}

        <Accordion className="mb-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <FontAwesomeIcon icon={faSatellite} className="me-2" />
              NASA API Settings
            </Accordion.Header>
            <Accordion.Body>
              <Form.Group>
                <Form.Label>NASA API Key</Form.Label>
                <Form.Control
                  type="password"
                  value={nasaApiKey}
                  onChange={(e) => setNasaApiKey(e.target.value)}
                  placeholder="Enter NASA API Key"
                  className="custom-input"
                />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Form.Group className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faImage} className="me-2" />
            Upload Image
          </Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileUpload}
            accept="image/*"
            className="custom-file-input"
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleGenerate}
          className="generate-btn"
          disabled={isLoading || !topic}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </Button>
      </Form>
    </div>
  );
}

export default Sidebar;