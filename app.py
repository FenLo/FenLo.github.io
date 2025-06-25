from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
import os

app = Flask(__name__)
DATA_FILE = 'words.json'

def load_words():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_words(words):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(words, f, ensure_ascii=False, indent=2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/words', methods=['GET'])
def api_get_words():
    words = load_words()
    return jsonify(words)

@app.route('/api/words', methods=['POST'])
def api_add_word():
    data = request.get_json() or {}
    words = load_words()
    new_word = {
        'id': data.get('id'),
        'word': data.get('word'),
        'meaning': data.get('meaning'),
        'category': data.get('category', 'Genel'),
        'dateAdded': data.get('dateAdded')
    }
    words.append(new_word)
    save_words(words)
    return jsonify({'success': True})

@app.route('/api/words/<int:word_id>', methods=['PUT'])
def api_update_word(word_id):
    data = request.get_json() or {}
    words = load_words()
    for w in words:
        if w['id'] == word_id:
            w['word'] = data.get('word', w['word'])
            w['meaning'] = data.get('meaning', w['meaning'])
            w['category'] = data.get('category', w['category'])
            break
    save_words(words)
    return jsonify({'success': True})

@app.route('/api/words/<int:word_id>', methods=['DELETE'])
def api_delete_word(word_id):
    words = load_words()
    words = [w for w in words if w['id'] != word_id]
    save_words(words)
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True) 