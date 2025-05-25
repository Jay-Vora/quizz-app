from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
import json
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)  # This allows your React app to access this API

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

#defining the results model
class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/questions', methods=['GET'])
def get_questions():
    with open('questions.json', 'r') as f:
        questions = json.load(f)
    return jsonify(questions)

@app.route('/results', methods=['GET', 'POST'])
def handle_results():
    if request.method == 'POST':
        data = request.get_json()

        if not data or 'username' not in data or 'score' not in data:
            return jsonify({'error': 'Missing username or score'}), 400

        new_result = Result(
            username=data['username'],
            score=data['score'],
            timestamp=datetime.now()
        )

        db.session.add(new_result)
        db.session.commit()

        return jsonify(
            {
                'message': 'Result saved to db',
                'result': {
                    'username': new_result.username,
                    'score': new_result.score,
                    'timestamp':new_result.timestamp.isoformat()
                }
            }
        ), 201

    else:  # GET request
        username = request.args.get('username')

        if username:
            results = Result.query.filter_by(username=username).order_by(Result.timestamp.desc()).all()
        else:
            results = Result.query.order_by(Result.timestamp.desc()).all()

        data = [{
        'username': r.username,
        'score': r.score,
        'timestamp': r.timestamp.isoformat()
    } for r in results]
        

        return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)