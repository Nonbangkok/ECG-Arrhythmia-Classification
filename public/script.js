const samples = [
  { label: 'Class 0 - Sample 1', csv: '../data/csv/c0.csv', row: 1 },
  { label: 'Class 0 - Sample 2', csv: '../data/csv/c0.csv', row: 2 },
  { label: 'Class 0 - Sample 3', csv: '../data/csv/c0.csv', row: 3 },
  { label: 'Class 1 - Sample 1', csv: '../data/csv/c1.csv', row: 1 },
  { label: 'Class 1 - Sample 2', csv: '../data/csv/c1.csv', row: 2 },
  { label: 'Class 1 - Sample 3', csv: '../data/csv/c1.csv', row: 3 },
  { label: 'Class 2 - Sample 1', csv: '../data/csv/c2.csv', row: 1 },
  { label: 'Class 2 - Sample 2', csv: '../data/csv/c2.csv', row: 2 },
  { label: 'Class 2 - Sample 3', csv: '../data/csv/c2.csv', row: 3 },
  { label: 'Class 3 - Sample 1', csv: '../data/csv/c3.csv', row: 1 },
  { label: 'Class 3 - Sample 2', csv: '../data/csv/c3.csv', row: 2 },
  { label: 'Class 3 - Sample 3', csv: '../data/csv/c3.csv', row: 3 },
  { label: 'Mismatch - Class 0', csv: '../data/mismatch/c0.csv', row: 1 },
  { label: 'Mismatch - Class 1', csv: '../data/mismatch/c1.csv', row: 1 },
  { label: 'Mismatch - Class 2', csv: '../data/mismatch/c2.csv', row: 1 },
  { label: 'Mismatch - Class 3', csv: '../data/mismatch/c3.csv', row: 1 },
];

const sampleSelect = document.getElementById('sampleSelect');
const ecgPlotImg = document.getElementById('ecgPlotImg');
const predictBtn = document.getElementById('predictBtn');
const resultDiv = document.getElementById('result');
const csvInput = document.getElementById('csvInput');
const doctorClassification = document.getElementById('doctorClassification');
const confirmBtn = document.getElementById('confirmBtn');

samples.forEach((s, i) => {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = s.label;
  sampleSelect.appendChild(opt);
});

let selectedSample = null;
let inputData = null;
let predictionResult = null;
let selectedDoctorClass = null;

function showResult(html, isError = false) {
  resultDiv.innerHTML = html;
  resultDiv.style.display = 'block';
  resultDiv.style.color = isError ? '#c0392b' : '#27ae60';
  resultDiv.style.background = isError ? '#fdecea' : '#eafaf1';
}
function hideResult() {
  resultDiv.innerHTML = '';
  resultDiv.style.display = 'none';
}

function hideDoctorClassification() {
  doctorClassification.style.display = 'none';
  selectedDoctorClass = null;
  document.querySelectorAll('.class-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  confirmBtn.disabled = true;
}

sampleSelect.addEventListener('change', async (e) => {
  const idx = e.target.value;
  if (idx === "") {
    ecgPlotImg.style.display = 'none';
    predictBtn.disabled = true;
    hideResult();
    hideDoctorClassification();
    selectedSample = null;
    inputData = null;
    predictionResult = null;
    return;
  }
  selectedSample = samples[idx];
  predictBtn.disabled = false;
  hideResult();
  hideDoctorClassification();
  inputData = await loadSampleFromCSV(selectedSample.csv, selectedSample.row);

  if (inputData) {
    try {
      const res = await fetch('/plot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputData })
      });
      const data = await res.json();
      if (data.image) {
        ecgPlotImg.src = data.image;
        ecgPlotImg.style.display = 'block';
      } else {
        ecgPlotImg.style.display = 'none';
      }
    } catch (err) {
      ecgPlotImg.style.display = 'none';
    }
  } else {
    ecgPlotImg.style.display = 'none';
  }
});

csvInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async function(evt) {
    const text = evt.target.result;
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
      showResult('CSV file must have at least 2 rows.', true);
      ecgPlotImg.style.display = 'none';
      predictBtn.disabled = true;
      hideDoctorClassification();
      return;
    }

    const row = lines[1].split(',').map(Number);
    if (row.length !== 187 || row.some(isNaN)) {
      showResult('Second row must have 187 numeric values.', true);
      ecgPlotImg.style.display = 'none';
      predictBtn.disabled = true;
      hideDoctorClassification();
      return;
    }
    inputData = row;
    sampleSelect.value = "";
    predictBtn.disabled = false;
    hideDoctorClassification();

    try {
      const res = await fetch('/plot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputData })
      });
      const data = await res.json();
      if (data.image) {
        ecgPlotImg.src = data.image;
        ecgPlotImg.style.display = 'block';
      } else {
        ecgPlotImg.style.display = 'none';
      }
    } catch (err) {
      ecgPlotImg.style.display = 'none';
    }
    hideResult();
  };
  reader.readAsText(file);
});

predictBtn.addEventListener('click', async () => {
  if (!inputData) return;
  showResult('Predicting...');
  try {
    const res = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: inputData })
    });
    const data = await res.json();
    if (data.predicted && data.predicted.length > 0) {
      const pred = data.predicted[0];
      predictionResult = data;

      const maxIdx = pred.class_index;
      const percent = (pred.probabilities[maxIdx] * 100).toFixed(2) + '%';
      let html = `<b>Prediction:</b> ${pred.label}<br/><b>Probability:</b> <b>${percent}</b>`;
      showResult(html);
      
      // Show doctor classification section
      doctorClassification.style.display = 'block';
    } else {
      showResult('Error: ' + (data.error || 'Unknown error'), true);
    }
  } catch (err) {
    showResult('Error: ' + err.message, true);
  }
});

// Doctor classification button handlers
document.querySelectorAll('.class-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove selected class from all buttons
    document.querySelectorAll('.class-btn').forEach(b => b.classList.remove('selected'));
    // Add selected class to clicked button
    btn.classList.add('selected');
    selectedDoctorClass = parseInt(btn.getAttribute('data-class'));
    confirmBtn.disabled = false;
  });
});

// Confirm button handler
confirmBtn.addEventListener('click', async () => {
  if (!inputData || !predictionResult || selectedDoctorClass === null) {
    showResult('Please select a classification first.', true);
    return;
  }

  try {
    const saveData = {
      input_data: inputData,
      model_prediction: predictionResult,
      doctor_classification: selectedDoctorClass
    };

    const res = await fetch('/save_classification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saveData)
    });

    const data = await res.json();
    if (data.success) {
      showResult('Data saved successfully!', false);
      hideDoctorClassification();
    } else {
      showResult('Error saving data: ' + (data.error || 'Unknown error'), true);
    }
  } catch (err) {
    showResult('Error: ' + err.message, true);
  }
});

async function loadSampleFromCSV(csvPath, rowNum) {
  const res = await fetch(csvPath);
  const text = await res.text();
  const lines = text.trim().split('\n');
  if (rowNum >= lines.length) return null;
  const row = lines[rowNum].split(',').slice(1);
  return row.map(Number);
}

hideResult();
hideDoctorClassification();

