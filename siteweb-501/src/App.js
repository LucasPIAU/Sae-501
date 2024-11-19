import logo from './logo.svg';
import Header from './components/MainHeader.jsx';
import Filtrage from './components/FilterFilieres.jsx';
import React from 'react';

import './App.css';
import Home from './pages/home/home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SpePremiere from "./pages/spePremiere/spePremiere"
import Options from './pages/options/options';
import Techno from "./pages/techno/techno"

function App() {
  return (
     <Router>
      <Routes>
        <Header/>
        <Filtrage/>
        <Route path="/" element={<Home />} />
        <Route path="/spePremiere" element={<SpePremiere />} />
        <Route path="/optionGenerale" element={<Options/>} />
        <Route path="/filiereTechno" element={<Techno/>} />
      </Routes>
    </Router>
  );
}

export default App;
