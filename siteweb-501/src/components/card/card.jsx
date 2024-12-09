import React, { useState } from 'react';
import style from './card.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFormationToFilter } from '../../store/formation/formationSlice';
import { setCurrentPage } from '../../store/formation/formationSlice';

function Card({ item, onCategorySelect }) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(item.isChecked || false); 
  const dispatch = useDispatch();

  const navigateTo = () => {
    if (item.link) {
      navigate(item.link);
      setCurrentPage(item.link);
    } if (item.categorie) { 
      onCategorySelect(item.categorie);
      navigate('/pro'); 
    } else {
      navigate('/detail', { state: { itemId: item.id } });
      setCurrentPage("detail");
    }
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    console.log(item);  
    // Mettre à jour le state des établissements filtrés en fonction de la sélection/désélection de la formation
    dispatch(addFormationToFilter(item)); // Cela ajoutera ou retirera la formation selon l'état du checkbox
  };

  return (
    <div
      className={`${style.card} ${isChecked ? style.greenBg : style.pinkBg}`}
    >
      <div className={style.containerTitleMotClef}>
        <h3>{item.nom}</h3>
        {item.motClef && <p>Mot clef : {item.motClef}</p>}
      </div>
      <div className={style.containerButtonCard}>
        {item.type === 'etablissement' ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            Voir plus
          </a>
        ) : (
          <button onClick={navigateTo}>Voir plus</button>
        )}
      </div>
      {item.type === 'generale' && (
        <label className={style.checkboxContainer}>
          <input
            type="checkbox"
            className={style.checkbox}
            checked={isChecked} // Lier l'état du checkbox à isChecked
            onChange={handleCheckboxChange} // Gérer le changement de l'état
          />
          <span className={style.checkmark}></span>
        </label>
      )}
    </div>
  );
}

export default Card;
