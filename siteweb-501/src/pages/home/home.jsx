import React from 'react';
import { useSelector } from 'react-redux';
import { selectEtablissements } from '../../store/formation/formationSelector.js';
import style from './home.module.css';

const Home = () => {
  const etablissements = useSelector(selectEtablissements);

  return (
    <div>
      <h2 className={style.title}>
        Retrouvez nos {etablissements.length} établissements
      </h2>
      <div className={style.logoContainer}>
        {etablissements.map((etablissement, index) => (
          <a target="_blank" href={etablissement.link}>
            <div key={index} className={style.logoCard}>
              <img src={etablissement.logo} alt={`Logo de ${etablissement.nom}`} className={style.logoImage} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;
