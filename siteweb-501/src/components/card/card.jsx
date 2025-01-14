import React, { useState } from 'react';
import style from './card.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFormationToFilter } from '../../store/formation/formationSlice';
import { setCurrentPage } from '../../store/formation/formationSlice';

function Card({ item, isInSearch = false, onDomainSelect }) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(item.isChecked || false);
  const dispatch = useDispatch();

  const navigateTo = () => {
    console.log('ICIICICCI');
    console.log(item.link);
    if (item.link) {
      navigate(item.link);
    } else {
      navigate('/detail', { state: { itemId: item._id } });
      setCurrentPage('detail');
    }
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    console.log(item);
    dispatch(addFormationToFilter(item)); // Cela ajoutera ou retirera la formation selon l'état du checkbox
  };

  const handleClick = () => {
    if (onDomainSelect && item.name && !item.link) {
      // Appeler onDomainSelect si l'élément est un domaine
      onDomainSelect(item);
    }
  };

  console.log("item dans card : ", item)

  return (
    <div
      className={`${style.card} ${isChecked ? style.greenBg : style.pinkBg}`}
      onClick={handleClick} // Détecte le clic global
    >
      <div className={style.containerTitleMotClef}>
        <h3>{item.name}</h3>
        {item.data &&
          item.data.attributs &&
          Array.isArray(item.data.attributs) &&
          item.data.attributs.length > 0 && (
            <p className={style.keyWord}>
              {item.data.attributs.map((attribut, index) =>
                attribut.trim() !== '' ? (
                  <span key={index}>
                    {attribut}
                    {index < item.data.attributs.length - 1 && ', '}
                  </span>
                ) : null
              )}
            </p>
          )}
      </div>
      <div className={style.containerButtonCard}>
        {item.type === 'etablissement' ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            Voir plus
          </a>
        ) : !item.link && item.filiere != "Professionel" ? (
          // Si c'est un domaine (pas de lien), aucune action ici
          <button className={style.domainInfo}>
            voir les formations
          </button>
        ) : (
          <button onClick={navigateTo}>Voir plus</button>
        )}
      </div>
      {item.type === 'generale' && !isInSearch && (
        <label className={style.checkboxContainer}>
          <input
            type="checkbox"
            className={style.checkbox}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className={style.checkmark}></span>
        </label>
      )}
    </div>
  );
}

export default Card;
