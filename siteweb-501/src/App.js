import React from 'react';
import './App.css';
import Home from './pages/home/home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SpePremiere from "./pages/spePremiere/spePremiere"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spePremiere" element={<SpePremiere />} />
      </Routes>
    </Router>
  );
}

export default App;
