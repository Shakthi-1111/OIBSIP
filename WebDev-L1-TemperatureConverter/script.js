document.getElementById('convertBtn').addEventListener('click', function() {
    const tempInput = document.getElementById('tempInput').value;
    const unitSelect = document.getElementById('unitSelect').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // UI elements for results
    const resCelsius = document.getElementById('resCelsius');
    const resFahrenheit = document.getElementById('resFahrenheit');
    const resKelvin = document.getElementById('resKelvin');

    // Reset error message
    errorMessage.textContent = '';

    // Input Validation: Check if empty
    if (tempInput === '') {
        errorMessage.textContent = 'Please enter a numeric temperature value.';
        resetDisplays();
        return;
    }

    let temp = parseFloat(tempInput);

    // Input Validation: Check if not a number
    if (isNaN(temp)) {
        errorMessage.textContent = 'Invalid input. Please enter numbers only.';
        resetDisplays();
        return;
    }

    // Edge Case Handling: Absolute Zero Violations
    if (unitSelect === 'C' && temp < -273.15) {
        errorMessage.textContent = 'Error: Temperature cannot fall below Absolute Zero (-273.15 °C).';
        resetDisplays();
        return;
    }
    if (unitSelect === 'F' && temp < -459.67) {
        errorMessage.textContent = 'Error: Temperature cannot fall below Absolute Zero (-459.67 °F).';
        resetDisplays();
        return;
    }
    if (unitSelect === 'K' && temp < 0) {
        errorMessage.textContent = 'Error: Temperature cannot fall below Absolute Zero (0 K).';
        resetDisplays();
        return;
    }

    let celsius, fahrenheit, kelvin;

    // Perform conversions based on the selected input unit
    if (unitSelect === 'C') {
        celsius = temp;
        fahrenheit = (temp * 9/5) + 32;
        kelvin = temp + 273.15;
    } else if (unitSelect === 'F') {
        celsius = (temp - 32) * 5/9;
        fahrenheit = temp;
        kelvin = celsius + 273.15;
    } else if (unitSelect === 'K') {
        celsius = temp - 273.15;
        fahrenheit = (celsius * 9/5) + 32;
        kelvin = temp;
    }

    // Display formatted results showing all units simultaneously
    resCelsius.textContent = celsius.toFixed(2) + ' °C';
    resFahrenheit.textContent = fahrenheit.toFixed(2) + ' °F';
    resKelvin.textContent = kelvin.toFixed(2) + ' K';
});

// Helper function to reset display text when an error occurs
function resetDisplays() {
    document.getElementById('resCelsius').textContent = '-- °C';
    document.getElementById('resFahrenheit').textContent = '-- °F';
    document.getElementById('resKelvin').textContent = '-- K';
}
