import React, { useState, useEffect } from 'react';
import style from "./home.module.css";
import Map from '../../components/map';
import ListCard from '../../components/listCard/listCard';
import FiltrageFilieres from '../../components/FilterFilieres/FilterFilieres';

function Home() {
  const [formations, setFormations] = useState([]);

  // Récupération des données depuis data.json
  useEffect(() => {
    fetch('/assets/json/data.json')
      .then(response => response.json())
      .then(data => {setFormations(data);console.log(data)}); // Sauvegarde les données récupérées
  }, []);

  console.log(formations)

  const sectionItem = [
    {
      nom: "seconde générale et technologique",
      link: "optionGenerale"
    },
    {
      nom:"Première générale",
      link: "spePremiere"
    },
    {
      nom: "Première technologique",
      link: "filiereTechno"
    }
  ]

  return (
    <>
      <FiltrageFilieres/>
      <div className={style.AppA}>
        <div className={style.containerMapFormation}>
          {/* <Map /> */}
          {/* <ListCard items={formations} type="formation" /> */}
          <ListCard items={sectionItem} />
        </div>
      </div>
    </>
    
  );
}

export default Home;
