import React from 'react';
import { useSelector } from 'react-redux';
import { selectEtablissements } from '../../store/formation/formationSelector.js';
import style from "./home.module.css";

function Home() {
  const etablissements = useSelector(selectEtablissements);
  // console.log("Etablissements Home : ", etablissements.length);

  return (
    <>
      <p className={style.paragraphe}>
        Découvrez les formations des lycées publics de la Mayenne, des options de seconde aux spécialités et baccalauréats, pour vous guider dans vos choix et projets d’avenir.
      </p>
      <div className={style.container}>
        <h2>Retrouvez les {etablissements.length} lycées de la Mayenne et découvrez leurs formations</h2>
        <div className={style.logoGrid}>
          {etablissements.map((etablissement, index) => (
            <a key={index} href={etablissement.website} target='_blank'>
              <img src={etablissement.logo} alt={etablissement.nom} className={style.logoImage}/>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}


export default Home;
