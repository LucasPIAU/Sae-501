import logo from './logo.svg';
import Header from './components/MainHeader/MainHeader.jsx';
import Filtrage from './components/FilterFilieres/FilterFilieres.jsx';
import React from 'react';
import './App.css';
import Home from './pages/home/home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SpePremiere from "./pages/spePremiere/spePremiere"
import Options from './pages/options/options';
import Techno from "./pages/techno/techno";
import Lycees from "./pages/lycees/lycees";

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Filtrage/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spePremiere" element={<SpePremiere />} />
          <Route path="/optionGenerale" element={<Options/>} />
          <Route path="/filiereTechno" element={<Techno/>} />
          <Route path="/lycees" element={<Lycees />} />
        </Routes>
      </Router>
    </>
        
  );
}

export default App;
