import OpenAI from 'openai';

// Initialize AIML client
const aiml = new OpenAI({
  apiKey: process.env.REACT_APP_AIML_API_KEY,
  baseURL: process.env.REACT_APP_AIML_BASE_URL,
  dangerouslyAllowBrowser: true
});

// Helper function to parse HTML and format text
const formatResponse = (text) => {
  // Remove HTML tags
  const stripHtml = text.replace(/<[^>]*>/g, '');
  
  // Format line breaks
  const formatLineBreaks = stripHtml
    .replace(/\n{3,}/g, '\n\n') // Replace multiple line breaks with double line break
    .split('\n')
    .filter(line => line.trim() !== '') // Remove empty lines
    .join('\n\n');
  
  // Format lists
  const formatLists = formatLineBreaks
    .replace(/•/g, '\n• ') // Add line break before bullet points
    .replace(/(\d+\.) /g, '\n$1 '); // Add line break before numbered lists
  
  // Format headings and sections
  const formatHeadings = formatLists
    .replace(/([A-Z][A-Za-z\s]+:)/g, '\n\n$1') // Add line breaks before section headings
    .trim();
  
  return formatHeadings;
};

export const generateAIResponse = async (prompt) => {
  try {
    const response = await aiml.chat.completions.create({
      model: "o1-mini",
      messages: [{ 
        role: "user", 
        content: `${prompt}\n\nPlease format the response with clear sections and bullet points where appropriate. Avoid using HTML tags.`
      }],
      max_tokens: 512,
    });

    if (response.choices && response.choices[0]?.message?.content) {
      // Format the response
      const formattedResponse = formatResponse(response.choices[0].message.content);
      
      // Split into paragraphs and format
      const paragraphs = formattedResponse
        .split('\n\n')
        .filter(p => p.trim() !== '')
        .map(p => p.trim());
      
      // Join paragraphs with proper spacing
      return paragraphs.join('\n\n');
    } else {
      throw new Error('No response generated');
    }
  } catch (error) {
    console.error('AIML Error:', error);
    return `Error: Failed to generate response. ${error.message}`;
  }
};

// Optional: Add a function to check if the service is available
export const checkAIMLService = async () => {
  try {
    const response = await aiml.chat.completions.create({
      model: "o1-mini",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 10,
    });
    return response.choices && response.choices.length > 0;
  } catch (error) {
    console.error('AIML Service Check Failed:', error);
    return false;
  }
};

// Helper function to format planet information specifically
export const formatPlanetInfo = (text) => {
  const sections = {
    overview: '',
    physicalCharacteristics: '',
    atmosphere: '',
    notableFeatures: '',
    interestingFacts: ''
  };

  // Split the text into sections if they exist
  const lines = text.split('\n');
  let currentSection = 'overview';

  lines.forEach(line => {
    if (line.includes('Physical Characteristics:')) {
      currentSection = 'physicalCharacteristics';
    } else if (line.includes('Atmosphere:')) {
      currentSection = 'atmosphere';
    } else if (line.includes('Notable Features:')) {
      currentSection = 'notableFeatures';
    } else if (line.includes('Interesting Facts:')) {
      currentSection = 'interestingFacts';
    } else if (line.trim()) {
      sections[currentSection] += line + '\n';
    }
  });

  // Format each section
  Object.keys(sections).forEach(key => {
    sections[key] = sections[key].trim();
  });

  // Combine sections with proper formatting
  return Object.entries(sections)
    .filter(([_, content]) => content)
    .map(([key, content]) => {
      const title = key.replace(/([A-Z])/g, ' $1').trim();
      return `${title.charAt(0).toUpperCase() + title.slice(1)}:\n${content}`;
    })
    .join('\n\n');
};