from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_disease
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import logging
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

template = """
Answer the question below.
Here is the conversation history: {context}
Question: {question}
Answer:
"""
model = OllamaLLM(model="llama3")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms')
        logging.debug(f"Received symptoms: {symptoms}")  # Debug print statement

        if not symptoms or not isinstance(symptoms, list):
            raise ValueError("Invalid input. Please provide a list of symptoms.")

        prediction = predict_disease(symptoms)
        return jsonify({'prediction': prediction})

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logging.error(f"Unexpected error: {e}")  # Print any unexpected errors
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    context = request.json.get("context", "")

    if not user_message:
        logging.error("No message provided.")
        return jsonify({"error": "No message provided."}), 400

    for attempt in range(5):
        try:
            logging.debug(f"Attempt {attempt + 1}: Sending request to LangChain API")

            result = chain.invoke({"context": context, "question": user_message})
            reply = result.strip()
            logging.debug(f"Response received: {reply}")
            return jsonify({"reply": reply})

        except Exception as e:
            logging.error(f"Unexpected error: {str(e)}")
            return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
