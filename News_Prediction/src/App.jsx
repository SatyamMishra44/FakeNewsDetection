import React, { useState } from 'react';
import './App.css';

function App() {
  const [newsText, setNewsText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!newsText.trim()) {
      alert('Please enter some news text');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ news: newsText }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error checking news');
    }
  };

  return (
    <div className="App">
      <h1>📰 Fake News Detector</h1>

      <textarea
        placeholder="Paste the news content here..."
        value={newsText}
        onChange={(e) => setNewsText(e.target.value)}
      />

      <button onClick={handleSubmit}>Check News</button>

      {result && (
        <div className={`result ${result.toLowerCase()}`}>
          Prediction: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
