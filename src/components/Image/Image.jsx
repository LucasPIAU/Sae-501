import React from 'react';
import style from './Image.module.css'; // Assurez-vous de créer un fichier CSS si nécessaire.

function ImageComponent({ src, alt }) {
  return <div className={style.contaimerImage}>
        <img className={style.image} src={src} alt={alt} /> 
    </div>;
}

export default ImageComponent;
