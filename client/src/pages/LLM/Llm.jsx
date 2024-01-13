// App.js
import React, { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    const Combined_Input = (userInput + " " + `And i live in {jalandhar} in {punjab} in {india} if that helps. And right now the climate is {cold} and the soil is {soil}. From predicted crop i have been suggested to sow {wheat} also from predicted price to sell i have been suggested to sell at {price}. An tell me the good ways to grow this crop so that i got good yield and there is no water wasteage and ground water remains intact. Also tell me the best fertilizers to use for this crop. And also tell me the best pesticides to use for this crop. And also tell me the best way to store this crop. And also tell me the best way to sell this crop. And also tell me the best way to transport this crop.`)
    try {
      const response = await fetch('http://localhost:5001/process_input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',  // Use the actual domain in production
        },
        body: JSON.stringify({ Combined_Input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }

      const responseData = await response.json();
      setResponse(responseData.response);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Generative AI Chat</h1>
      <div>
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
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
