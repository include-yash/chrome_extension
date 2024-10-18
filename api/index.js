import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY; // Ensure you add this to your .env file
const endpoint = 'https://api.openai.com/v1/chat/completions';

// Function to handle API calls
export const getHints = async (problemNumber) => {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `Generate 3 hints for LeetCode problem number ${problemNumber}.` }],
            max_tokens: 100
        })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.choices.map(choice => choice.message.content);
};

// Additional code to handle incoming messages from the extension can be added here
