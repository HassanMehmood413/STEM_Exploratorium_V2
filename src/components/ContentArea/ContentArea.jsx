import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import ImageAnalysis from '../ImageAnalysis/ImageAnalysis';
import NASADisplay from '../NASADisplay/NASADisplay';
import '../ContentArea/ContentArea.css';

function ContentArea({ generatedContent, uploadedImage, nasaApiKey, loading }) {
  return (
    <div className="content-area">
      <Row>
        <Col md={6}>
          <div className="content-section">
            <h3 className="section-title">Generated Ideas/Content</h3>
            {loading ? (
              <div className="loading-container">
                <Spinner animation="border" variant="primary" />
                <p>Generating content...</p>
              </div>
            ) : (
              <div className="generated-content">
                {generatedContent || "Generate content by entering a topic and clicking 'Generate'"}
              </div>
            )}
          </div>
        </Col>
        <Col md={6}>
          <ImageAnalysis uploadedImage={uploadedImage} />
          {nasaApiKey && <NASADisplay apiKey={nasaApiKey} />}
        </Col>
      </Row>
    </div>
  );
}

export default ContentArea;