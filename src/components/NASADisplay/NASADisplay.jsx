import React, { useCallback } from 'react';
import { Card, Tabs, Tab, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSatellite, faRocket, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { fetchAPOD, searchMarsPhotos, fetchNearEarthObjects } from '../../services/nasaAPI';
import './NASADisplay.css';

function NASADisplay({ apiKey }) {
  const [activeTab, setActiveTab] = React.useState('apod');
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    apod: null,
    mars: null,
    neo: null
  });

  const fetchData = useCallback(async (tab) => {
    setLoading(true);
    try {
      switch (tab) {
        case 'apod':
          const apodData = await fetchAPOD(apiKey);
          setData(prev => ({ ...prev, apod: apodData }));
          break;
        case 'mars':
          const marsData = await searchMarsPhotos(apiKey);
          setData(prev => ({ ...prev, mars: marsData }));
          break;
        case 'neo':
          const neoData = await fetchNearEarthObjects(apiKey);
          setData(prev => ({ ...prev, neo: neoData }));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching NASA data:', error);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  React.useEffect(() => {
    if (apiKey) {
      fetchData(activeTab);
    }
  }, [apiKey, activeTab, fetchData]);

  const LoadingSpinner = () => (
    <div className="loading-container">
      <Spinner animation="border" variant="primary" />
      <p>Loading NASA data...</p>
    </div>
  );

  const NoDataMessage = () => (
    <div className="no-data-message">
      <p>No data available. Please check your API key and try again.</p>
    </div>
  );

  const APODContent = ({ data }) => (
    <div className="apod-content">
      <h4>{data.title}</h4>
      <img src={data.url} alt={data.title} className="apod-image" />
      <p className="apod-explanation">{data.explanation}</p>
      <p className="apod-date">Date: {data.date}</p>
    </div>
  );

  const MarsContent = ({ photos }) => (
    <div className="mars-content">
      <div className="mars-photos-grid">
        {photos.slice(0, 4).map((photo, index) => (
          <div key={photo.id} className="mars-photo-item">
            <img src={photo.img_src} alt={`Mars ${index + 1}`} />
            <p>Date: {photo.earth_date}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="nasa-display-card">
      <Card.Header className="nasa-display-header">
        <FontAwesomeIcon icon={faSatellite} className="me-2" />
        NASA Data Explorer
      </Card.Header>
      <Card.Body>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="nasa-tabs"
        >
          <Tab 
            eventKey="apod" 
            title={
              <span>
                <FontAwesomeIcon icon={faRocket} className="me-2" />
                APOD
              </span>
            }
          >
            {loading ? (
              <LoadingSpinner />
            ) : data.apod ? (
              <APODContent data={data.apod} />
            ) : (
              <NoDataMessage />
            )}
          </Tab>
          
          <Tab 
            eventKey="mars" 
            title={
              <span>
                <FontAwesomeIcon icon={faGlobe} className="me-2" />
                Mars
              </span>
            }
          >
            {loading ? (
              <LoadingSpinner />
            ) : data.mars ? (
              <MarsContent photos={data.mars} />
            ) : (
              <NoDataMessage />
            )}
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}

export default NASADisplay;