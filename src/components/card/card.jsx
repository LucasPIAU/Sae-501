import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './card.module.css';
import { useDispatch } from 'react-redux';
import { addFormationToFilter } from '../../store/formation/formationSlice';
import { setCurrentPage } from '../../store/formation/formationSlice';
      
function Card({ item, isInSearch = false, onDomainSelect, onSpeSelect, onHover = ()=> {}}) {
  const [isChecked, setIsChecked] = useState(item.isChecked || false);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    onSpeSelect(item);
  };

  const handleClick = () => {
    if (onDomainSelect && item.name && !item.link && item.type === "domain") {
      onDomainSelect(item);
    }
  };

  const filiere = item.filiere;

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
      onClick={handleClick}
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
          <button className={style.domainInfo}>
            Voir plus
          </button>
        ) : (
          <Link to={item.link || "/detail"} state={item.link ? {} : { itemId: item._id }} className={style.button}>
            Voir plus
          </Link>
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