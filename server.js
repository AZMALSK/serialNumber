const express = require('express');
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Function to get BIOS serial number
function getBiosSerialNumber() {
  try {
    const response = execSync('wmic bios get serialnumber', { encoding: 'utf-8' });
    const lines = response.trim().split('\n');

    if (lines.length > 1 && lines[1].trim()) {
      return lines[1].trim();
    } else {
      return 'Serial number not found';
    }
  } catch (err) {
    console.error('Error retrieving BIOS serial number:', err.message);
    return 'Error retrieving BIOS serial number';
  }
}

// Endpoint to retrieve BIOS serial number
app.get('/serial-number', (req, res) => {
  const serialNumber = getBiosSerialNumber();
  res.send({ serialNumber });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
