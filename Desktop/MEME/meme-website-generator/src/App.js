import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Generator from './Generator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Meme Coin Website Generator
              </h1>
              <p className="text-gray-600 mb-6">
                Create a custom meme website for your Solana project in just a few clicks. Perfect for meme coins, NFTs, and more!
              </p>
              <a
                href="/generator"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Build a Website
              </a>
            </div>
          </div>
        } />
        <Route path="/generator" element={<Generator />} />
      </Routes>
    </Router>
  );
}

export default App;