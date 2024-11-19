import React, { useState, useEffect } from 'react';
import style from "./fiches.module.css";
import { useNavigate } from 'react-router-dom';

function Fiches() {
  const [formations, setFormations] = useState([]);

  // Récupération des données depuis data.json
  useEffect(() => {
  fetch('/assets/json/data.json')
    .then(response => response.json())
    .then(data => {setFormations(data);console.log(data)});
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
        <div className={style.containerMap}>
        </div>
        <div items={formations} type="generale"/>
      </div>
    </div>
  );
}

export default Fiches;