import logo from './logo.svg';
import Header from './components/MainHeader/MainHeader.jsx';
import FiltrageFilieres from './components/FilterFilieres/FilterFilieres.jsx';
import FiltrageCarte from './components/FilterCarte/FilterCarte.jsx';
import React from 'react';
import './App.css';
import Home from './pages/home/home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpePremiere from "./pages/spePremiere/spePremiere"
import Options from './pages/options/options';
import Techno from "./pages/techno/techno"
import Pro from "./pages/pro/pro.jsx";
import Detail from "./pages/detail/detail.jsx"
import AdminSpace from './pages/AdminSpace/AdminSpace.jsx';
import Lycees from "./pages/lycees/lycees";

  return (
     <Router>
      <Routes>
        <Header/>
        <Filtrage/>
        <Route path="/" element={<Home />} />
        <Route path="/spePremiere" element={<SpePremiere />} />
        <Route path="/optionGenerale" element={<Options/>} />
        <Route path="/filiereTechno" element={<Techno/>} />
        <Route path="/lycees" element={<Lycees />} />
        <Route path="/pro" element={<Pro/>} />
        <Route path="/detail" element={<Detail/>} />
        <Route path="/adminspace" element={<AdminSpace/>} />
      </Routes>
    </Router>
  );


export default App;
