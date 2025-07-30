const axios = require('axios');

async function testCSVParsing() {
  try {
    console.log('🧪 Testing CSV Parsing...');
    
    const response = await axios.get('http://localhost:5000/data/csv/c0.csv');
    const text = response.data;
    const lines = text.trim().split('\n');
    
    console.log(`📊 Total lines: ${lines.length}`);
    console.log(`📊 First line values: ${lines[0].split(',').length}`);
    console.log(`📊 Second line values: ${lines[1].split(',').length}`);
    
    // Parse second line (data)
    const dataRow = lines[1];
    const values = dataRow.split(',').map(val => parseFloat(val.trim()));
    const validValues = values.filter(val => !isNaN(val));
    
    console.log(`📊 Total values: ${values.length}`);
    console.log(`📊 Valid values: ${validValues.length}`);
    console.log(`📊 NaN values: ${values.length - validValues.length}`);
    
    if (validValues.length === 187) {
      console.log('✅ CSV parsing successful!');
    } else {
      console.log(`❌ Expected 187, got ${validValues.length}`);
    }
    
    // Show first and last few values
    console.log(`📊 First 5 values: ${validValues.slice(0, 5)}`);
    console.log(`📊 Last 5 values: ${validValues.slice(-5)}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testCSVParsing(); 