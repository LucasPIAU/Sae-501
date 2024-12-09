import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredEtablissements } from '../../store/formation/formationSelector.js';
import style from "./home.module.css";

function Home() {
  const etablissements = useSelector(selectFilteredEtablissements);
  console.log("Etablissements Home : ", etablissements);

  return (
    <div className={style.container}>
      <h2>Retrouvez les 29 lycées de la Mayenne et découvrez leurs formations</h2>
      <div className={style.logoGrid}>
        {etablissements.map((etablissement, index) => (
          <a href={etablissement.link} target='_blank'>
            <div key={index} className={style.logoItem}>
              <img src={etablissement.logo} alt={etablissement.nom} className={style.logoImage}/>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Home;
