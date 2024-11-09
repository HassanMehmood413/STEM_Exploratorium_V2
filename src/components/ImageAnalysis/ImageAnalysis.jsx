import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../ImageAnalysis/ImageAnalysis.css';

function ImageAnalysis({ uploadedImage }) {
  const [analyzing, setAnalyzing] = React.useState(false);
  const [analysis, setAnalysis] = React.useState(null);

  React.useEffect(() => {
    if (uploadedImage) {
      analyzeImage();
    }
  }, [uploadedImage]);

  const analyzeImage = async () => {
    setAnalyzing(true);
    try {
      // Here you would typically call your AI service to analyze the image
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnalysis("This is a sample image analysis result. Integrate with your preferred AI service for actual image analysis.");
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysis("Failed to analyze image.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Card className="image-analysis-card">
      <Card.Header className="image-analysis-header">
        <FontAwesomeIcon icon={faImage} className="me-2" />
        Image Analysis
      </Card.Header>
      <Card.Body>
        {uploadedImage && (
          <div className="image-preview-container">
            <img 
              src={URL.createObjectURL(uploadedImage)} 
              alt="Uploaded preview" 
              className="image-preview"
            />
          </div>
        )}
        
        {analyzing ? (
          <div className="analyzing-container">
            <FontAwesomeIcon icon={faSpinner} spin />
            <p>Analyzing image...</p>
          </div>
        ) : analysis ? (
          <div className="analysis-result">
            <h5>Analysis Results:</h5>
            <p>{analysis}</p>
          </div>
        ) : (
          <div className="upload-prompt">
            <p>Upload an image to see the analysis</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ImageAnalysis;