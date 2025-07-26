from flask import Flask, request, jsonify, send_from_directory
import numpy as np
# import keras
import os
import matplotlib
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)

matplotlib.use('Agg')

# MODEL_PATH = os.path.join(os.path.dirname(__file__), '../model/model.h5')
# model = keras.models.load_model(MODEL_PATH)
model = None

@app.route('/')
def index():
    return send_from_directory('../public', 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('../public', path)

@app.route('/data/<path:path>')
def data_proxy(path):
    return send_from_directory('../data', path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if data is None:
        return jsonify({'error': 'No input provided'}), 400
    input_data = data.get('input')
    if input_data is None:
        return jsonify({'error': 'No input provided'}), 400

    input_array = np.array(input_data)
    if len(input_array.shape) == 1:
        input_array = input_array.reshape(1, -1, 1)

    # prediction = model.predict(input_array)
    # print("value", prediction)
    # result = prediction.tolist()
    
    result = None
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 400
        
    class_labels = [
        'Class 0 : Normal',
        'Class 1 : Supraventricular Premature Beat',
        'Class 2 : Premature Ventricular Contraction',
        'Class 3 : Unclassifiable Beat'
    ]
    predicted_classes = []
    for pred in result:
        max_idx = int(np.argmax(pred))
        predicted_classes.append({
            'class_index': max_idx,
            'label': class_labels[max_idx],
            'probabilities': pred
        })

    return jsonify({'result': result, 'predicted': predicted_classes})

@app.route('/plot', methods=['POST'])
def plot_ecg():
    data = request.json
    if data is None or 'input' not in data:
        return jsonify({'error': 'No input provided'}), 400
    input_data = data['input']
    arr = np.array(input_data)
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.plot(arr, color='blue')
    ax.set_title('ECG Signal')
    ax.set_xlabel('Time')
    ax.set_ylabel('Amplitude')
    ax.grid(True)
    plt.tight_layout()
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close(fig)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    img_uri = f'data:image/png;base64,{img_base64}'
    return jsonify({'image': img_uri})

if __name__ == '__main__':
    app.run(debug=True)