# app.py
from flask import Flask, request, jsonify
import json
import google.generativeai as genai
import os
from dotenv import load_dotenv

app = Flask(__name__)
from flask_cors import CORS

CORS(app)

# Set up the model and load conversation history
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

# Load the environment variables from the .env file
# load_dotenv()

# Configure the API key (replace with your actual API key)
API_KEY = ""

# Set up the generative AI model
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel(
    model_name="gemini-pro", generation_config=generation_config, safety_settings=safety_settings
)
# Load conversation history
with open("history.json", "r") as f:
    history = json.load(f)

def process_user_input(user_input):
    # Start a chat with the existing history
    convo = model.start_chat(history=history)

    # Send the user input to the model
    response = convo.send_message(user_input)
    response_text = response.text

    # # Save the conversation to history
    # history.extend(result.history)
    # with open("history.json", "w") as f:
    #     json.dump(history, f)

    return response_text

@app.route('/process_input', methods=['POST'])
def process_input():
    data = request.json
    user_input = data.get('userInput')

    # Call the processing logic
    response_text = process_user_input(user_input)
    print(response_text)
    return jsonify({"response": response_text})

if __name__ == '__main__':
    app.run(debug=True, port=5001)

