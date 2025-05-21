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

@app.route('/results', methods=['POST'])
def get_results():
    data = request.get_json()

    if not data or 'score' not in data:
        return jsonify({'error':'invalid data'}), 400
    
    new_result = {
        "score": data['score'],
        "timestamp": datetime.utcnow().isoformat()
    }

     # Load existing results
    try:
        with open('results.json', 'r') as f:
            results = json.load(f)
    except FileNotFoundError:
        results = []

    results.append(new_result)

    # Save back to file
    with open('results.json', 'w') as f:
        json.dump(results, f, indent=2)

    return jsonify({"message": "Result saved", "result": new_result}), 201


if __name__ == '__main__':
    app.run(debug=True, port=5000)