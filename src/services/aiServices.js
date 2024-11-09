// import OpenAI from 'openai';
// import Anthropic from '@anthropic-ai/sdk';

// // Initialize AIML client
// const createAIMLClient = () => {
//   const apiKey = process.env.REACT_APP_AIML_API_KEY;
//   if (!apiKey) {
//     console.warn('AIML API key is missing');
//     return null;
//   }
//   return new OpenAI({
//     apiKey,
//     baseURL: "https://api.aimlapi.com",
//     dangerouslyAllowBrowser: true
//   });
// };

// // Initialize Anthropic client as fallback
// const createAnthropicClient = () => {
//   const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
//   if (!apiKey) {
//     console.warn('Anthropic API key is missing');
//     return null;
//   }
//   return new Anthropic({
//     apiKey,
//     dangerouslyAllowBrowser: true
//   });
// };

// const aiml = createAIMLClient();
// const anthropic = createAnthropicClient();

// export const generateAIResponse = async (prompt) => {
//   try {
//     // Try AIML first
//     if (aiml) {
//       try {
//         const response = await aiml.chat.completions.create({
//           model: "o1-mini",  // AIML model
//           messages: [{ role: "user", content: prompt }],
//           max_tokens: 512,
//         });
//         return response.choices[0]?.message?.content;
//       } catch (error) {
//         console.error('AIML Error:', error);
//         // Continue to Anthropic fallback
//       }
//     }

//     // Fallback to Anthropic
//     if (anthropic) {
//       try {
//         const response = await anthropic.messages.create({
//           model: "claude-3-sonnet-20240229",
//           max_tokens: 512,
//           messages: [{ role: "user", content: prompt }]
//         });
//         return response.content[0].text;
//       } catch (error) {
//         console.error('Anthropic Error:', error);
//         throw new Error('Both AI services failed');
//       }
//     }

//     throw new Error('No AI service available');
//   } catch (error) {
//     console.error('AI Service Error:', error);
//     return `Error: ${error.message}. Please check your API keys.`;
//   }
// };


import OpenAI from 'openai';

// Initialize AIML client
const aiml = new OpenAI({
  apiKey: process.env.REACT_APP_AIML_API_KEY,
  baseURL: process.env.REACT_APP_AIML_BASE_URL,
  dangerouslyAllowBrowser: true
});

export const generateAIResponse = async (prompt) => {
  try {
    const response = await aiml.chat.completions.create({
      model: "o1-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
    });

    if (response.choices && response.choices[0]?.message?.content) {
      return response.choices[0].message.content;
    } else {
      throw new Error('No response generated');
    }
  } catch (error) {
    console.error('AIML Error:', error);
    return `Error: Failed to generate response. ${error.message}`;
  }
};

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