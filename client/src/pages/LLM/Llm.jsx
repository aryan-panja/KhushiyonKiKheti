import React, { useState, useEffect } from "react";
import useUserContext from "../../Hooks/useUserContext";
import "./index.css";
import Loader from "../../components/Loader";

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [speakButtonDisabled, setSpeakButtonDisabled] = useState(true);
  const [stopButtonDisabled, setStopButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { location, temperature, mlPrediction, user } = useUserContext();
  // console.log(user.name)
  console.log(location);
  console.log(temperature);
  const handleSendMessage = async () => {
    setLoading(true);
    const Combined_Input = userInput;
      // " " +
      // ` Hello My name is Aryan Panja. And i live in ${location.city} in ${location.state} in ${location.country}. And right now the temperature is ${temperature} degree celcius and the soil is ${location.state} soil. Also predicted price to sell my crop. Also if ${mlPrediction} is not undefined then this is the predicted crop given by the ml predictor. Also tell me some more crops that i can grow instead of this crop. And tell me the good ways to grow this crop so that i got good yield and there is no water wasteage and ground water remains intact. Also tell me the best fertilizers to use for this crop. And also tell me the best pesticides to use for this crop. And also tell me the best way to store this crop. And also tell me the best way to sell this crop. And also tell me the best way to transport this crop. If all of this above data helps. Then i will be very happy to use this service again.`;
    try {
      const response = await fetch(
        "http://127.0.0.1:5002/process_input",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Access-Control-Allow-Origin': '*',  // Use the actual domain in production
          },
          body: JSON.stringify({ Combined_Input }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const responseData = await response.json();

      // Remove '**', '*', and spaces from the response and set it
      const cleanedResponse = responseData.response
        .replace(/\n/g, "<br/>")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/\s+/g, " ");
      setResponse(cleanedResponse);
      setSpeakButtonDisabled(false); // Enable the speak button
    } catch (error) {
      console.error("Error:", error.message);
    }
    setLoading(false);
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
    <div style={{ margin: "1rem" }}>
      <h1 className="LLM-h">Book Assistant</h1>
      <div className="LLM-form">
        <input
          className="LLM-input"
          type="text"
          id="userInput"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="BTNS">
          <button className="LLM-submit" onClick={handleSendMessage}>
            Submit
          </button>
          <button
            className="LLM-speak"
            onClick={speakResponse}
            disabled={speakButtonDisabled}
          >
            Speak Response
          </button>
          <button
            className="LLM-stop"
            onClick={stopSpeech}
            disabled={stopButtonDisabled}
          >
            Stop Speech
          </button>
        </div>
      </div>

      <div style={{ margin: "1rem" }}>
        {loading ? (
          <p className="loader">
            <Loader />
          </p>
        ) : (
          <p
            style={{
              whiteSpace: "pre-line",
              color: "black",
              marginBottom: "0",
              paddingBottom: "70px",
            }}
            dangerouslySetInnerHTML={{ __html: response }}
          ></p>
        )}
      </div>
    </div>
  );
}

export default App;
