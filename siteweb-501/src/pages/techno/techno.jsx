import React, { useState, useEffect } from 'react';
import style from "./techno.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectError } from '../../store/formation/formationSelector';

function Techno() {
  const formations = useSelector(selectError);

  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(-1);
  }

  return (
    <>
      <div className={style.AppA}>
        <button className={style.backButton} onClick={navigateTo}>Back</button>
        <div className={style.containerMapFormation}>
          {/* <div className={style.containerMap}>
          <Map />
          </div> */}
          <ListCard items={formations} type="techno"/>
        </div>
      </div>
    </>
    
  );
}

export default Techno;
