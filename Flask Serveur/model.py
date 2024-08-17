# model.py

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Charger et prétraiter les données
data = pd.read_csv("training_data.csv")

# Suppression de la colonne Unnamed: 133
if "Unnamed: 133" in data.columns:
    data.drop("Unnamed: 133", axis=1, inplace=True)


# Charger les données de test
data_test = pd.read_csv("Testing.csv")

# Encodage de la variable cible
label_encoder = LabelEncoder()
full_data = pd.concat([data, data_test], ignore_index=True)
label_encoder.fit(full_data['prognosis'])

X_train = data.drop("prognosis", axis=1)
y_train = data["prognosis"]
X_test = data_test.drop("prognosis", axis=1)
y_test = data_test["prognosis"]

y_train = label_encoder.transform(y_train)
y_test = label_encoder.transform(y_test)

# Entraînement du modèle
model = RandomForestClassifier(n_estimators=200, criterion='entropy', random_state=42)
model.fit(X_train, y_train)

# Fonction de prédiction à partir de nouveaux symptômes
def predict_disease(symptoms):
    all_columns = X_train.columns
    # Ensure we have the correct number of columns
    if len(symptoms) != len(all_columns):
        raise ValueError("Symptoms vector length does not match the number of features.")

    new_data_dict = {col: 0 for col in all_columns}

    # Assuming symptoms is a list of values corresponding to each column
    for i, value in enumerate(symptoms):
        if i < len(new_data_dict):
            symptom_name = all_columns[i]
            new_data_dict[symptom_name] = value

    new_data = pd.DataFrame([new_data_dict])
    prediction = model.predict(new_data)
    prediction_decoded = label_encoder.inverse_transform(prediction)

    return prediction_decoded[0]

