import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './card.module.css';
import { useDispatch } from 'react-redux';

function Card({ item, isInSearch = false, onDomainSelect, onSpeSelect, onHover = () => { }, mini=false }) {
  const [isChecked, setIsChecked] = useState(item.isChecked || false);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    onSpeSelect(item);
  };

  const handleClick = () => {
    // console.log()
    if (onDomainSelect && item.type === "domain") {
      onDomainSelect(item);
    }
  };


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

  console.log(item);

  return (
    <div
      className={`${style.card} ${isChecked ? style.greenBg : getBackgroundType(item.type)} ${mini && style.miniCard}`}
      onClick={handleClick}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={style.containerTitleMotClef}>
        {item.type === "generale" ? (
          <Link to={item.link} className={style.linkToSpe}>{item.name}</Link>
        ) : (
          <h3>{item.name}</h3>
        )}
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
        {item.type === "generale" ? null : (
          <div className={style.containerButtonCard}>
            {item.adresse ? (
              <a href={item.website} target="_blank" rel="noopener noreferrer">
                Site web
              </a>
            ) : !item.link && item.type !== "pro" && item.type !== "techno" && item.type !== "opt-seconde" ? (
              <button className={style.domainInfo}>
                Voir plus
              </button>
            ) : (
              <Link to={item.link || "/detail"} state={item.link ? {} : { itemId: item._id }} className={style.button}>
                Voir plus
              </Link>
            )}
          </div>
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