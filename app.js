// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [symbol, setSymbol] = useState('');
  const [stockPrice, setStockPrice] = useState(null);

  const fetchStockPrice = async () => {
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cn7flcpr01qgjtj4j6j0cn7flcpr01qgjtj4j6jg`);
      setStockPrice(response.data.c); // Assuming 'c' is the key for the current stock price in the API response
    } catch (error) {
      console.error('Error fetching stock price:', error);
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchStockPrice();
    }
  }, [symbol]);

  return (
    <div>
      <h1>Stock Price Viewer</h1>
      <label>
        Enter Ticker Symbol:
        <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      </label>
      <button onClick={fetchStockPrice}>Get Stock Price</button>
      {stockPrice !== null && (
        <div>
          <h2>Current Stock Price:</h2>
          <p>{stockPrice}</p>
        </div>
      )}
    </div>
  );
};

export default App;
