import React from 'react';
import style from './Title.module.css'; // Assurez-vous de créer un fichier CSS si vous avez besoin de styles.

function Title({ title }) {
  return <div className={style.containerTitle}><h2 className={style.title}>{title}</h2></div>;
}

export default Title;
