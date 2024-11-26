import { useLocation } from 'react-router-dom';
import logo from './logo.svg';
import Header from './components/MainHeader/MainHeader.jsx';
import FiltrageFilieres from './components/FilterFilieres/FilterFilieres.jsx';
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
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadInfos } from './store/formation/formationAsyncAction.js';

function App({ item }) {
  return (
    <Router>
      <Header />
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInfos());
  }, [dispatch]);

  return (
    <>
      {location.pathname.includes('/lycees') ? null : <FiltrageFilieres />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spePremiere" element={<SpePremiere />} />
        <Route path="/optionGenerale" element={<Options />} />
        <Route path="/filiereTechno" element={<Techno />} />
        <Route path="/lycees" element={<Lycees />} />
        <Route path="/pro" element={<Pro />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/adminspace" element={<AdminSpace />} />
      </Routes>
    </>
  );
}


export default App;