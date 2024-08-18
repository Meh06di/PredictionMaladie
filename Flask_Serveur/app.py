from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_disease

app = Flask(__name__)
CORS(app)  # Pour gérer les requêtes cross-origin


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms')
        print("Received symptoms:", symptoms)  # Debug print statement

        if not symptoms or not isinstance(symptoms, list):
            raise ValueError("Invalid input. Please provide a list of symptoms.")

        prediction = predict_disease(symptoms)
        return jsonify({'prediction': prediction})

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f"Unexpected error: {e}")  # Print any unexpected errors
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
