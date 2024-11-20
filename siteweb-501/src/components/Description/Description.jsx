import React from 'react';
import style from './Description.module.css'; // Assurez-vous de créer un fichier CSS si nécessaire.

function Description({ description }) {
  return <div className={style.containerDescription}> <p className={style.description}>{description}</p> </div>;
}

export default Description;
