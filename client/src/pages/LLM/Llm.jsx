// App.js
import React, { useState, useEffect } from 'react';
import useUserContext from '../../Hooks/useUserContext';


function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [speakButtonDisabled, setSpeakButtonDisabled] = useState(true);
  const [stopButtonDisabled, setStopButtonDisabled] = useState(true);
  const { location, temperature } = useUserContext();

  const handleSendMessage = async () => {
    const Combined_Input =
      userInput +
      " " +
      `And i live in ${location.city} in ${location.state} in ${location.country}. And right now the temperature is ${temperature} and the soil is {punjab soil}. Also predicted price to sell my crop. An tell me the good ways to grow this crop so that i got good yield and there is no water wasteage and ground water remains intact. Also tell me the best fertilizers to use for this crop. And also tell me the best pesticides to use for this crop. And also tell me the best way to store this crop. And also tell me the best way to sell this crop. And also tell me the best way to transport this crop. If all of this above data helps. Then i will be very happy to use this service again.`;
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
    
      // Remove '**', '*', and spaces from the response and set it
      const cleanedResponse = responseData.response
        .replace(/\n/g, '<br/>')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/\s+/g, ' ');
      setResponse(cleanedResponse);
      setSpeakButtonDisabled(false); // Enable the speak button
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const speakResponse = () => {
    const utterance = new SpeechSynthesisUtterance(response);
    speechSynthesis.speak(utterance);
    setStopButtonDisabled(false); // Enable the stop button
  };

  const stopSpeech = () => {
    speechSynthesis.cancel();
    setStopButtonDisabled(true); // Disable the stop button
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      speechSynthesis.cancel(); // Stop speech when component unmounts
    };
  }, []);

  return (
    <div className="App">
      <h1>किसान मित्र</h1>
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
        <button onClick={speakResponse} disabled={speakButtonDisabled}>
          Speak Response
        </button>
        <button onClick={stopSpeech} disabled={stopButtonDisabled}>
          Stop Speech
        </button>
      </div>

      <div>
        <p
          style={{ whiteSpace: 'pre-line' }}
          dangerouslySetInnerHTML={{ __html: response }}
        ></p>
      </div>
    </div>
  );
}

export default App;
