
import React, { useState } from 'react';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preaventDefault();

    try {
      const response = await fetch('http://localhost:3000/operations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operation, numbers: numbers.split(',').map(num => parseInt(num.trim())) })
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Math Operations Microservice</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Numbers (comma-separated):
          <input
            type="text"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Operation:
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            required
          >
            <option value="">Select Operation</option>
            <option value="average">Average</option>
            <option value="prime">Prime</option>
            <option value="fibonacci">Fibonacci</option>
            <option value="even">Even</option>
          </select>
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
