from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import numpy as np
import keras
import os
import matplotlib
import matplotlib.pyplot as plt
import io
import base64
import csv
from datetime import datetime
# pip install flask flask-cors numpy keras matplotlib pandas tensorflow-macos

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

matplotlib.use('Agg')

MODEL_PATH = os.path.join(os.path.dirname(__file__), '../model/model.h5')
model = keras.models.load_model(MODEL_PATH)

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

    prediction = model.predict(input_array)
    result = prediction.tolist()
        
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

@app.route('/save_classification', methods=['POST'])
def save_classification():
    try:
        data = request.json
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        
        input_data = data.get('input_data')
        model_prediction = data.get('model_prediction')
        doctor_classification = data.get('doctor_classification')
        
        if not all([input_data, model_prediction, doctor_classification is not None]):
            return jsonify({'success': False, 'error': 'Missing required data'}), 400
        
        # Create database directory if it doesn't exist
        database_dir = os.path.join(os.path.dirname(__file__), '../database')
        os.makedirs(database_dir, exist_ok=True)
        
        # Prepare data for CSV
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # Get model prediction details
        model_pred = model_prediction.get('predicted', [{}])[0]
        model_class = model_pred.get('class_index', -1)
        model_label = model_pred.get('label', 'Unknown')
        model_probabilities = model_pred.get('probabilities', [])
        
        # Class labels for doctor classification
        class_labels = [
            'Class 0 : Normal',
            'Class 1 : Supraventricular Premature Beat',
            'Class 2 : Premature Ventricular Contraction',
            'Class 3 : Unclassifiable Beat'
        ]
        doctor_label = class_labels[doctor_classification] if 0 <= doctor_classification < 4 else 'Unknown'
        
        # CSV file path
        csv_file = os.path.join(database_dir, 'classifications.csv')
        
        # Check if file exists to write header
        file_exists = os.path.exists(csv_file)
        
        with open(csv_file, 'a', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            
            # Write header if file is new
            if not file_exists:
                header = ['Timestamp', 'Input_Data', 'Model_Prediction_Class', 'Model_Prediction_Label', 
                         'Model_Probabilities', 'Doctor_Classification_Class', 'Doctor_Classification_Label']
                writer.writerow(header)
            
            # Write data row
            row = [
                timestamp,
                ','.join(map(str, input_data)),
                model_class,
                model_label,
                ','.join(map(str, model_probabilities)),
                doctor_classification,
                doctor_label
            ]
            writer.writerow(row)
        
        return jsonify({'success': True, 'message': 'Classification saved successfully'})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/dashboard_data')
def dashboard_data():
    database_dir = os.path.join(os.path.dirname(__file__), '../database')
    csv_file = os.path.join(database_dir, 'classifications.csv')
    data = []
    if os.path.exists(csv_file):
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                try:
                    input_data = [float(x) for x in row['Input_Data'].split(',')]
                    data.append({
                        'timestamp': row['Timestamp'],
                        'model_class': int(row['Model_Prediction_Class']),
                        'doctor_class': int(row['Doctor_Classification_Class']),
                        'input_data': input_data
                    })
                except Exception:
                    continue
    return jsonify(data)

@app.route('/dashboard_update_row', methods=['POST'])
def dashboard_update_row():
    data = request.json
    timestamp = data.get('timestamp')
    input_data = data.get('input_data')
    new_model_class = data.get('model_class')
    new_doctor_class = data.get('doctor_class')
    database_dir = os.path.join(os.path.dirname(__file__), '../database')
    csv_file = os.path.join(database_dir, 'classifications.csv')
    updated = False
    rows = []
    if os.path.exists(csv_file):
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Match by timestamp+input_data
                if (row['Timestamp'] == timestamp and row['Input_Data'] == ','.join(map(str, input_data))):
                    row['Model_Prediction_Class'] = str(new_model_class)
                    row['Model_Prediction_Label'] = [
                        'Class 0 : Normal',
                        'Class 1 : Supraventricular Premature Beat',
                        'Class 2 : Premature Ventricular Contraction',
                        'Class 3 : Unclassifiable Beat'
                    ][int(new_model_class)]
                    row['Doctor_Classification_Class'] = str(new_doctor_class)
                    row['Doctor_Classification_Label'] = [
                        'Class 0 : Normal',
                        'Class 1 : Supraventricular Premature Beat',
                        'Class 2 : Premature Ventricular Contraction',
                        'Class 3 : Unclassifiable Beat'
                    ][int(new_doctor_class)]
                    updated = True
                rows.append(row)
        # Write back
        if updated:
            with open(csv_file, 'w', encoding='utf-8', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=rows[0].keys())
                writer.writeheader()
                writer.writerows(rows)
    return jsonify({'success': updated})

@app.route('/dashboard_delete_row', methods=['POST'])
def dashboard_delete_row():
    data = request.json
    timestamp = data.get('timestamp')
    input_data = data.get('input_data')
    database_dir = os.path.join(os.path.dirname(__file__), '../database')
    csv_file = os.path.join(database_dir, 'classifications.csv')
    deleted = False
    rows = []
    if os.path.exists(csv_file):
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Match by timestamp+input_data
                if (row['Timestamp'] == timestamp and row['Input_Data'] == ','.join(map(str, input_data))):
                    deleted = True
                    continue
                rows.append(row)
        # Write back
        if deleted:
            with open(csv_file, 'w', encoding='utf-8', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=rows[0].keys())
                writer.writeheader()
                writer.writerows(rows)
    return jsonify({'success': deleted})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)