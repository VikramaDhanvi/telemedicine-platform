import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load data
df = pd.read_csv("Training.csv").drop(columns=["Unnamed: 133"])
X = df.drop(columns=["prognosis"])
y = df["prognosis"]

# Encode labels
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Train model
clf = DecisionTreeClassifier()
clf.fit(X, y_encoded)

# Save model and label encoder
joblib.dump(clf, "disease_model.pkl")
joblib.dump(le, "label_encoder.pkl")
