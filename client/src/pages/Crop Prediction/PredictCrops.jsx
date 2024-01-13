import React, { useState } from 'react';

const PredictCrops = () => {
    const [formData, setFormData] = useState({
        N: '90',
        P: '42',
        K: '43',
        temp: '',
        pH: '6.5',
        humidity: '82',
        rainfall: '203',
    });

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
            body: JSON.stringify(formData),
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
                            <label htmlFor="temp">Temperature:</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                id="temp"
                                name="temp"
                                value={formData.temp}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        temp: e.target.value,
                                    });
                                }}
                            />
                        </td>
                    </tr>
                    {/* Add more rows for other form fields */}
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
