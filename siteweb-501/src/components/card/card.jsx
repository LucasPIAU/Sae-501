import React, { useState } from 'react';
import style from './card.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFormationToFilter, setCurrentEtablissement, setCurrentPage } from '../../store/formation/formationSlice';

function Card({ item }) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(item.isChecked || false); 
  const dispatch = useDispatch();

  const navigateTo = () => {
    if (item.link) {
      navigate(item.link);
      setCurrentPage(item.link);
    } else {
      navigate('/detail', { state: { itemId: item.id } });
      dispatch(setCurrentPage("detail"))
    }
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    console.log(item);  
    dispatch(addFormationToFilter(item));
  };

  const handleMouseEnter = () => {
    if (item.adresse) {
        console.log('mouseEnter : ', item.name);
        dispatch(setCurrentEtablissement(item.name))
    }
  };

  const handleMouseLeave = () => {
    if (item.adresse) { 
      dispatch(setCurrentEtablissement(null))
    }
  };

  return (
    <div
      className={`${style.card} ${isChecked ? style.greenBg : style.pinkBg}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={style.containerTitleMotClef}>
        <h3>{item.name}</h3>
        {item?.data?.attributs && <p className={style.motClef}>Mot clef : {item.data.attributs}</p>}
      </div>
      <div className={style.containerButtonCard}>
        {item.adresse ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            Voir plus
          </a>
        ) : (
          <button onClick={navigateTo}>Voir plus</button>
        )}
      </div>
      {item.filiere === 'generale' && (
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
