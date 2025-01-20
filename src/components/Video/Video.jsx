import React from 'react';
import style from './Video.module.css'; // Assurez-vous de créer un fichier CSS si nécessaire.

function Video({ src }) {
  return (
    <div className={style.containerVideo}>
    <video className={style.video} controls>
      <source src={src} type="video/mp4" />
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
    </div>
  );
}

export default Video;
