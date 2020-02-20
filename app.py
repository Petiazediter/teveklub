from flask import Flask,render_template,request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/game', methods=['POST'])
def game():
    classes = request.form.get('subbutton')
    return render_template('game.html', colors = classes);

if __name__ == '__main__':
    app.run()
