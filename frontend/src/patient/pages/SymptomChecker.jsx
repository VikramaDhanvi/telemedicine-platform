import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import doctorMap from "./doctorMap"; // doctor type mapping

const symptomsList = [
  "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering",
  "chills", "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue",
  "vomiting", "burning_micturition", "spotting_urination", "fatigue", "weight_gain",
  "anxiety", "cold_hands_and_feets", "mood_swings", "weight_loss", "restlessness",
  "lethargy", "patches_in_throat", "irregular_sugar_level", "cough", "high_fever",
  "sunken_eyes", "breathlessness", "sweating", "dehydration", "indigestion",
  "headache", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite",
  "pain_behind_the_eyes", "back_pain", "constipation", "abdominal_pain", "diarrhoea",
  "mild_fever", "yellow_urine", "yellowing_of_eyes", "acute_liver_failure",
  "fluid_overload", "swelling_of_stomach", "swelled_lymph_nodes", "malaise",
  "blurred_and_distorted_vision", "phlegm", "throat_irritation", "redness_of_eyes",
  "sinus_pressure", "runny_nose", "congestion", "chest_pain", "weakness_in_limbs",
  "fast_heart_rate", "pain_during_bowel_movements", "pain_in_anal_region",
  "bloody_stool", "irritation_in_anus", "neck_pain", "dizziness",
  "cramps", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels",
  "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties",
  "excessive_hunger", "extra_marital_contacts", "drying_and_tingling_lips",
  "slurred_speech", "knee_pain", "hip_joint_pain", "muscle_weakness",
  "stiff_neck", "swelling_joints", "movement_stiffness", "spinning_movements",
  "loss_of_balance", "unsteadiness", "weakness_of_one_body_side",
  "loss_of_smell", "bladder_discomfort", "foul_smell_of urine", "continuous_feel_of_urine",
  "passage_of_gases", "internal_itching", "toxic_look_(typhos)", "depression",
  "irritability", "muscle_pain", "altered_sensorium", "red_spots_over_body",
  "belly_pain", "abnormal_menstruation", "dischromic _patches", "watering_from_eyes",
  "increased_appetite", "polyuria", "family_history", "mucoid_sputum",
  "rusty_sputum", "lack_of_concentration", "visual_disturbances", "receiving_blood_transfusion",
  "receiving_unsterile_injections", "coma", "stomach_bleeding", "distention_of_abdomen",
  "history_of_alcohol_consumption", "fluid_overload.1", "blood_in_sputum",
  "prominent_veins_on_calf", "palpitations", "painful_walking", "pus_filled_pimples",
  "blackheads", "scurring", "skin_peeling", "silver_like_dusting",
  "small_dents_in_nails", "inflammatory_nails", "blister", "red_sore_around_nose",
  "yellow_crust_ooze"
];

const SymptomChecker = () => {
  const [symptomVector, setSymptomVector] = useState(new Array(132).fill(0));
  const [searchTerm, setSearchTerm] = useState("");
  const [prediction, setPrediction] = useState("");
  const [doctorType, setDoctorType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleSymptom = (index) => {
    setSymptomVector((prev) => {
      const updated = [...prev];
      updated[index] = updated[index] === 1 ? 0 : 1;
      return updated;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setPrediction("");
    setDoctorType("");
    setError("");

    try {
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: symptomVector }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.prediction) {
        setPrediction(data.prediction);
        setDoctorType(doctorMap[data.prediction] || "General Physician");
      } else if (data.error) {
        setError(`Server error: ${data.error}`);
      } else {
        setError("Unexpected server response.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the prediction server.");
    }

    setLoading(false);
  };

  const filteredSymptoms = symptomsList.filter((symptom) =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">AI Symptom Checker</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search symptoms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        className="border rounded p-3 mb-4"
        style={{ maxHeight: "300px", overflowY: "scroll", backgroundColor: "#f9f9f9" }}
      >
        {filteredSymptoms.length > 0 ? (
          filteredSymptoms.map((symptom, index) => {
            const originalIndex = symptomsList.indexOf(symptom);
            return (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`symptom-${index}`}
                  onChange={() => toggleSymptom(originalIndex)}
                  checked={symptomVector[originalIndex] === 1}
                />
                <label className="form-check-label" htmlFor={`symptom-${index}`}>
                  {symptom}
                </label>
              </div>
            );
          })
        ) : (
          <p className="text-muted">No matching symptoms found.</p>
        )}
      </div>

      <button className="btn btn-success" onClick={handleSubmit} disabled={loading}>
        {loading ? "Predicting..." : "Predict Disease"}
      </button>

      {prediction && (
        <div className="alert alert-success mt-4">
          <strong>Predicted Disease:</strong> {prediction}
        </div>
      )}

      {doctorType && (
        <div className="alert alert-info">
          <strong>Recommended Doctor:</strong> {doctorType}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
