from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # This allows your React app to access this API

@app.route('/questions', methods=['GET'])
def get_questions():
    with open('questions.json', 'r') as f:
        questions = json.load(f)
    return jsonify(questions)

@app.route('/results', methods=['GET', 'POST'])
def handle_results():
    if request.method == 'POST':
        data = request.get_json()

        if not data or 'score' not in data:
            return jsonify({'error': 'Invalid data'}), 400

        new_result = {
            "score": data['score'],
            "timestamp": datetime.utcnow().isoformat()
        }

        try:
            with open('results.json', 'r') as f:
                results = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            results = []

        results.append(new_result)

        with open('results.json', 'w') as f:
            json.dump(results, f, indent=2)

        print(f"✅ Received score: {data['score']} at {datetime.utcnow()}")

        return jsonify({"message": "Result saved", "result": new_result}), 201

    else:  # GET request
        try:
            with open('results.json', 'r') as f:
                results = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            results = []

        return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)