import React from 'react';
import style from './card.module.css'
function Card({ item }) {
  return (
    <div className={style.card}>
      <div className={style.containerTitleMotClef}>
      <h3>{item.nom}</h3>
      <p>Mot clef : {item.motClef}</p>
      </div>
      <div className={style.containerButtonCard}>
        <button>Voir plus</button>
      </div>
      {/* <p>Établissements associés:</p>
      <ul>
        {item.etablissements.map((etablissement, index) => (
          <li key={index}>{etablissement}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Card;
