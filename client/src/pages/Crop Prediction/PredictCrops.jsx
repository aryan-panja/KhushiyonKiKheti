import React, { useState } from 'react';
import './index.css'; // Import your CSS file

const PredictCrops = () => {
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        pH: '',
        rainfall: '',
    });

    const convertFormDataToArray = () => {
        return [
            parseFloat(formData.N),
            parseFloat(formData.P),
            parseFloat(formData.K),
            parseFloat(formData.temperature),
            parseFloat(formData.humidity),
            parseFloat(formData.pH),
            parseFloat(formData.rainfall),
        ];
    };

    const [mlPrediction, setMLPrediction] = useState('');

    const handlePredict = async () => {
        // Replace with your Flask server URL
        const serverUrl = 'http://localhost:5001';

        // Get ML prediction
        const mlPredictionResult = await fetch(`${serverUrl}/predict_ml`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData: convertFormDataToArray() }),
        });

        const mlPredictionJson = await mlPredictionResult.json();
        const mlPredictionText = mlPredictionJson.mlPrediction;
        setMLPrediction(mlPredictionText);
    };

    return (
        <div className="ml-predictor-form-container">
            <h2>ML Predictor Form</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="temperature">Temperature:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                id="temperature"
                                name="temperature"
                                value={formData.temperature}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        temperature: e.target.value,
                                    });
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="humidity">Humidity:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                id="humidity"
                                name="humidity"
                                value={formData.humidity}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        humidity: e.target.value,
                                    });
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="rainfall">Rainfall:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                id="rainfall"
                                name="rainfall"
                                value={formData.rainfall}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        rainfall: e.target.value,
                                    });
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="N">N:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                id="N"
                                name="N"
                                value={formData.N}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        N: e.target.value,
                                    });
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="P">P:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                id="P"
                                name="P"
                                value={formData.P}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        P: e.target.value,
                                    });
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="K">K:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                id="K"
                                name="K"
                                value={formData.K}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        K: e.target.value,
                                    });
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="pH">pH:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                id="pH"
                                name="pH"
                                value={formData.pH}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        pH: e.target.value,
                                    });
                                }}
                            />
                        </td>
                    </tr>
                    {/* Add more rows for other features */}
                </tbody>
            </table>

            <button type="button" onClick={handlePredict}>
                Predict
            </button>

            <div className="ml-prediction-result">
                <p>
                    <strong>ML Prediction:</strong>
                </p>
                <p>{mlPrediction}</p>
            </div>
        </div>
    );
};

export default PredictCrops;
