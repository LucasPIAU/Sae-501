import React, { useState } from 'react';
import style from './card.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFormationToFilter } from '../../store/formation/formationSlice';
import { setCurrentPage } from '../../store/formation/formationSlice';
      
function Card({ item, isInSearch = false, onDomainSelect, onSpeSelect, onHover = ()=> {}}) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(item.isChecked || false);
  const dispatch = useDispatch();

  const navigateTo = () => {
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
    onSpeSelect(item);
    // console.log(item);
    // dispatch(addFormationToFilter(item));  // Cela ajoutera ou retirera la formation selon l'état du checkbox
  };

  const handleClick = () => {
    if (onDomainSelect && item.name && !item.link && item.type === "domain") {
      // Appeler onDomainSelect si l'élément est un domaine
      onDomainSelect(item);
    }
  };

  // console.log("item dans card : ", item)
  const filiere = item.filiere;
  // console.log("filiere : ", filiere)

  const getBackgroundType = (filiere) => {
    console.log("le type : ", filiere)
    switch (filiere) {
      case "pro":
        return style.proBg;
      case "domain":
        return style.proBg;
      case "techno":
        return style.technoBg;
      case "general":
        return style.generalBg;
      case "generale":
        return style.generalBg;
      case "opt-seconde":
        return style.optionBg;
      case "generalTechnoOption":
        return style.all3Bg;
      default:
        return style.pinkBg;
    }
  }

  return (
    <div
      className={`${style.card} ${isChecked ? style.greenBg : getBackgroundType(item.type)}`}
      onClick={handleClick} // Détecte le clic global
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
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
        {item.adresse ? (
          <a href={item.website} target="_blank" rel="noopener noreferrer">
            Site web
          </a>
        ) : !item.link && item.type != "pro" && item.type != "techno" && item.type != "generale" && item.type != "opt-seconde" ? (
          // Si c'est un domaine (pas de lien), aucune action ici
          <button className={style.domainInfo}>
            Voir plus
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
