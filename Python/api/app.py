import sys
import os

# Add model folder to import path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "model")))

from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import predict_disease

app = Flask(__name__)
CORS(app)  # Enable CORS so React frontend can talk to this API

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        symptoms = data.get("symptoms", [])

        if not isinstance(symptoms, list) or len(symptoms) != 132:
            return jsonify({"error": "Expected a list of 132 symptom values."}), 400

        prediction = predict_disease(symptoms)
        return jsonify({"prediction": prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Run the Flask app on port 5001 to avoid conflict with Node backend
    app.run(debug=True, port=5001)
