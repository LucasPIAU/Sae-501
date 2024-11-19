import React from 'react';
import style from './card.module.css'
import { useNavigate } from 'react-router-dom';

function Card({ item }) {

  const navigate = useNavigate();

  const navigateTo = () => {
    if(item.link){
      navigate(item.link);
    }
  }

  return (
    <div className={style.card}>
      <div className={style.containerTitleMotClef}>
      <h3>{item.nom}</h3>
      {item.motClef && <p>Mot clef : {item.motClef}</p>}
      </div>
      <div className={style.containerButtonCard}>
        { item.type === 'etablissement'?<a href={item.link} target="_blank" rel="noopener noreferrer">Voir plus</a> : <button onClick={navigateTo}>Voir plus</button>}
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
