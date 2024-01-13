// ChatComponent.jsx
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './index.css';  // Import the ChatbotComponent.css
import { initialChatHistory } from './history';
import {api} from './api_key';

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    const API_KEY = api; // Replace with your actual API key

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: initialChatHistory,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(userInput + " and i also live in jalandhar ");
    const responseText = await result.response.text();
    console.log(responseText)
    setResponse(responseText);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <label htmlFor="userInput">Your message:</label>
        <input
          type="text"
          id="userInput"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Submit</button>
      </div>

      <div>
        <p>
          <strong>Response:</strong>
        </p>
        <p className='model'>{response}</p>
      </div>
    </div>
  );
};

export default ChatComponent;
