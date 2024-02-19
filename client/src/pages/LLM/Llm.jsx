import React, { useState, useEffect } from 'react';
import useUserContext from '../../Hooks/useUserContext';
import './index.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [speakButtonDisabled, setSpeakButtonDisabled] = useState(true);
  const [stopButtonDisabled, setStopButtonDisabled] = useState(true);
  const { location, temperature, mlPrediction, user } = useUserContext();
  // console.log(user.name)
  const handleSendMessage = async () => {
    const Combined_Input =
      userInput +
      " " +
      ` Hello My name is Aryan Panja. And i live in Patiala in Punjab in India. And right now the temperature is 23 celcius and the soil is {punjab soil}. Also predicted price to sell my crop. Also if is not null then this is the predicted crop given by the ml predictor. And tell me the good ways to grow this crop so that i got good yield and there is no water wasteage and ground water remains intact. Also tell me the best fertilizers to use for this crop. And also tell me the best pesticides to use for this crop. And also tell me the best way to store this crop. And also tell me the best way to sell this crop. And also tell me the best way to transport this crop. If all of this above data helps. Then i will be very happy to use this service again.`;
    try {
      const response = await fetch('http://20.193.153.81/process_input', {
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
    <div className="App" style={{margin: '1rem'}}>
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

      <div
        style={{ margin: '1rem'}}
      >
        <p
          style={{ whiteSpace: 'pre-line', color: 'black' }}
          dangerouslySetInnerHTML={{ __html: response }}
        ></p>
      </div>
    </div>
  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import useUserContext from '../../Hooks/useUserContext';
// import './index.css';
// import { chatHistory } from './history';

// function App() {
//   const [userInput, setUserInput] = useState('');
//   const [response, setResponse] = useState('');
//   const [speakButtonDisabled, setSpeakButtonDisabled] = useState(true);
//   const [stopButtonDisabled, setStopButtonDisabled] = useState(true);
//   const { location, temperature, mlPrediction, user } = useUserContext();

//   const handleSendMessage = async () => {
//     try {
//       const genAI = new GoogleGenerativeAI("AIzaSyBFuup2R6zanwAWnrQ6nKTsvuiTUzTm_0o" );
//       const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//       const chat = model.startChat({
//         history: chatHistory,
//         generationConfig: {
//           maxOutputTokens: 100,
//         },
//       });

//       // const result = await chat.sendMessage(userInput + ` Hello My name is ${user.name}. And i live in ${location.city} in ${location.state} in ${location.country}. And right now the temperature is ${temperature} and the soil is {punjab soil}. Also predicted price to sell my crop. Also if ${mlPrediction} is not null then this is the predicted crop given by the ml predictor. And tell me the good ways to grow this crop so that i got good yield and there is no water wasteage and ground water remains intact. Also tell me the best fertilizers to use for this crop. And also tell me the best pesticides to use for this crop. And also tell me the best way to store this crop. And also tell me the best way to sell this crop. And also tell me the best way to transport this crop. If all of this above data helps. Then i will be very happy to use this service again.`);
//       const result = await chat.sendMessage(userInput);
//       console.log(result.response);
//       const responseText = await result.response.text();

//       // Update the state with the response
//       setResponse(responseText);
//       setSpeakButtonDisabled(false); // Enable the speak button
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   const speakResponse = () => {
//     const utterance = new SpeechSynthesisUtterance(response);
//     speechSynthesis.speak(utterance);
//     setStopButtonDisabled(false); // Enable the stop button
//   };

//   const stopSpeech = () => {
//     speechSynthesis.cancel();
//     setStopButtonDisabled(true); // Disable the stop button
//   };

//   useEffect(() => {
//     // Cleanup function
//     return () => {
//       speechSynthesis.cancel(); // Stop speech when component unmounts
//     };
//   }, []);

//   return (
//     <div className="App" style={{ margin: '1rem' }}>
//       <h1>किसान मित्र</h1>
//       <div>
//         <label htmlFor="userInput">Your message:</label>
//         <input
//           type="text"
//           id="userInput"
//           placeholder="Type your message..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//         />
//         <button onClick={handleSendMessage}>Submit</button>
//         <button onClick={speakResponse} disabled={speakButtonDisabled}>
//           Speak Response
//         </button>
//         <button onClick={stopSpeech} disabled={stopButtonDisabled}>
//           Stop Speech
//         </button>
//       </div>

//       <div style={{ margin: '1rem' }}>
//         <p
//           style={{ whiteSpace: 'pre-line', color: 'black' }}
//           dangerouslySetInnerHTML={{ __html: response }}
//         ></p>
//       </div>
//     </div>
//   );
// }

// export default App;

