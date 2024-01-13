// App.js
import React, { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://localhost:5001/process_input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
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
