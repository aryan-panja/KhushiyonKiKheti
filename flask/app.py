# Import necessary libraries
from flask import Flask, request, jsonify
import json
import google.generativeai as genai
import os
import pickle
from dotenv import load_dotenv
from flask_cors import CORS
import numpy as np
from flask_cors import cross_origin

# Configure Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Set up the generative AI model
genai.configure(api_key="AIzaSyBFuup2R6zanwAWnrQ6nKTsvuiTUzTm_0o")
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
model = genai.GenerativeModel(
    model_name="gemini-pro", generation_config=generation_config, safety_settings=safety_settings
)

# Load conversation history
with open("history.json", "r") as f:
    history = json.load(f)

@app.route('/process_input', methods=['POST'])
# @cross_origin()
def process_user_input():
    convo = model.start_chat(history=history)
    data = request.json
    user_input = data.get('Combined_Input')
    response = convo.send_message(user_input)
    response_text = response.text
    
    response_data = {"response": response_text}

    # response_data = response_data.replace('\n', '<br>') 

    # Add CORS headers
    response = jsonify(response_data)
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    response.headers.add("Access-Control-Allow-Credentials", "true")

    return response

# Load your pre-trained ML model
with open('D:\ML DATASET\crop_suggestion\Model\crop_suggestion.pkl', 'rb') as model_file:
    ml_model = pickle.load(model_file)

# Route to handle ML model predictions
@app.route('/predict_ml', methods=['POST'])
def predict_ml():
    data = request.json
    form_data = data.get('formData')
    print('form data = ', form_data)
    print('type = ', type(form_data))
    print('length = ', len(form_data))

    # Convert the received JSON array to a NumPy array
    input_array = np.array(form_data).reshape(1, -1)
    # input_array = form_data

    # Use your pre-trained model for predictions
    print(input_array)
    print(form_data)
    ml_prediction = ml_model.predict(input_array)
    print(ml_prediction)
    ml_prediction = ml_prediction[0]
    print(ml_prediction)
    return jsonify({"mlPrediction": ml_prediction})

if __name__ == '__main__':
    app.run(debug=True, port=5001)