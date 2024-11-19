import React, { useState, useEffect } from 'react';
import style from "./options.module.css";
import Map from '../../components/map';
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';

function Options() {
  const [formations, setFormations] = useState([]);

  // Récupération des données depuis data.json
  useEffect(() => {
    fetch('/assets/json/data.json')
      .then(response => response.json())
      .then(data => {setFormations(data);console.log(data)}); // Sauvegarde les données récupérées
  }, []);

  const navigate = useNavigate();

  const navigateTo = () => {
      navigate(-1);
  }

  console.log(formations)

  return (
    <div className={style.AppA}>
      <button className={style.backButton} onClick={navigateTo}>Back</button>
      <div className={style.containerMapFormation}>
        {/* <div className={style.containerMap}>
        <Map />
        </div> */}
        <ListCard items={formations} type="options"/>
      </div>
    </div>
  );
}

export default Options;
