import React, { useState, createContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Header from './components/MainHeader/MainHeader.jsx';
import BreadCrumb from "./components/breadCrumb/breadCrumb.jsx";
import './App.css';
import Home from './pages/home/home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListeForma from "./pages/listeForma/listeForma.jsx";
import ListeGT from './pages/listeG&T/listeG&T.jsx';
import SpePremiere from "./pages/spePremiere/spePremiere"
import Options from './pages/options/options';
import Techno from "./pages/techno/techno"
import Pro from "./pages/pro/pro.jsx";
import Detail from "./pages/detail/detail.jsx"
import AdminSpace from './pages/AdminSpace/AdminSpace.jsx';
import Lycees from "./pages/lycees/lycees";
import { useDispatch } from 'react-redux';
import { loadEtablissement, loadFormation} from './store/formation/formationAsyncAction.js';
import Connexion from "./pages/AdminSpace/Connexion.jsx";
import AdminDashboard from "./pages/AdminSpace/AdminDashboard.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

export const BreadcrumbContext = createContext();

function App({ item }) {
  const [breadcrumbs, setBreadcrumbs] = useState([{ path: "/", label: "Accueil" }]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      <Router>
        <ConditionalHeader />
        {/* <ConditionalNavbar /> */}
        <ConditionalBreadCrumb />
        <MainContent />
      </Router>
    </BreadcrumbContext.Provider>
  );
}

function ConditionalBreadCrumb() {
  const location = useLocation();
  const routes = ['/connexion', '/adminDashboard']; 
  const isInRoutes = routes.includes(location.pathname);

  return isInRoutes ? null : <BreadCrumb />;
}

function ConditionalHeader() {
  const location = useLocation();
  const routes = ['/connexion', '/adminDashboard']; 
  const isInRoutes = routes.includes(location.pathname);

  return isInRoutes ? null : <Header />;
}

function ConditionalNavbar() {
  const location = useLocation();
  return location.pathname === "/" ? <Header/> : <Navbar />;
}

function MainContent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { setBreadcrumbs } = React.useContext(BreadcrumbContext);

  useEffect(()=>{
    dispatch(loadEtablissement())
    dispatch(loadFormation())
  },[dispatch]);


  useEffect(() => {
    const labelMap = {
      "/": "Accueil",
      "/listeForma": "Liste des formations",
      "/listeGT": "Liste Générale et Technologique",
      "/spePremiere": "Spécialités Première",
      "/optionGenerale": "Options Générales",
      "/filiereTechno": "Filières Technologiques",
      "/lycees": "Lycées",
      "/pro": "Filières Professionnelles",
      "/detail": "Détail",
      "/pageCard": "Page Card",
      "/adminspace": "Espace Administrateur",
      "/connexion" : "Connexion Administrateur",
      "/adminDashboard" : "Panel Administrateur",
    };

    setBreadcrumbs((prev) => {
      // Vérifier si la page actuelle existe déjà dans le fil d'Ariane
      const existingPageIndex = prev.findIndex((crumb) => crumb.path === location.pathname);

      if (existingPageIndex >= 0) {
        // Si elle existe, garder les étapes jusqu'à cette page et supprimer celles après
        return prev.slice(0, existingPageIndex + 1);
      }

      // Sinon, ajouter la nouvelle page à la fin
      const newBreadcrumb = {
        path: location.pathname,
        label: labelMap[location.pathname] || "Page",
      };

      return [...prev, newBreadcrumb];
    });
  }, [location, setBreadcrumbs]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listeForma" element={<ListeForma />} />
        <Route path="/listeGT" element={<ListeGT />} />
        <Route path="/spePremiere" element={<SpePremiere />} />
        <Route path="/optionGenerale" element={<Options />} />
        <Route path="/filiereTechno" element={<Techno />} />
        <Route path="/lycees" element={<Lycees />} />
        <Route path="/pro" element={<Pro />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/adminspace" element={<AdminSpace />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}


export default App;