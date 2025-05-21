import os
import joblib
import numpy as np

# Get the absolute path to this file's directory (model/)
MODEL_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model and label encoder using absolute paths
model = joblib.load(os.path.join(MODEL_DIR, "disease_model.pkl"))
encoder = joblib.load(os.path.join(MODEL_DIR, "label_encoder.pkl"))

def predict_disease(symptoms):
    input_data = np.array([symptoms])
    prediction = model.predict(input_data)[0]
    return encoder.inverse_transform([prediction])[0]
