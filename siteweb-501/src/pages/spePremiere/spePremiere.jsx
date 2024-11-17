import React, { useState, useEffect } from 'react';
import style from "./spePremiere.module.css";
import Map from '../../components/map';
import ListCard from '../../components/listCard/listCard';

function SpePremiere() {
  const [formations, setFormations] = useState([]);

  // Récupération des données depuis data.json
  useEffect(() => {
    fetch('/assets/json/data.json')
      .then(response => response.json())
      .then(data => {setFormations(data);console.log(data)}); // Sauvegarde les données récupérées
  }, []);

  console.log(formations)

  return (
    <div className={style.AppA}>
      <div className={style.containerMapFormation}>
        <div className={style.containerMap}>
        <Map />
        </div>
        <ListCard items={formations} type="formation"/>
      </div>
    </div>
  );
}

export default SpePremiere;
