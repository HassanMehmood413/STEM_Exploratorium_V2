import axios from 'axios';

const NASA_BASE_URL = 'https://api.nasa.gov';

export const fetchAPOD = async (apiKey) => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/planetary/apod?api_key=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching APOD:', error);
    return null;
  }
};

export const searchMarsPhotos = async (apiKey, rover = "curiosity", sol = 1000) => {
  try {
    const response = await axios.get(
      `${NASA_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${apiKey}`
    );
    return response.data.photos;
  } catch (error) {
    console.error('Error fetching Mars photos:', error);
    return null;
  }
};

export const fetchNearEarthObjects = async (apiKey) => {
  try {
    const response = await axios.get(
      `${NASA_BASE_URL}/neo/rest/v1/neo/browse?api_key=${apiKey}`
    );
    return response.data.near_earth_objects;
  } catch (error) {
    console.error('Error fetching NEOs:', error);
    return null;
  }
};

export const searchNASAImages = async (query) => {
  try {
    const response = await axios.get(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`
    );
    return response.data.collection.items;
  } catch (error) {
    console.error('Error searching NASA images:', error);
    return null;
  }
};