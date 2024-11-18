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
import Pro from "./pages/pro/pro.jsx"

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
        <Route path="/pro" element={<Pro/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
