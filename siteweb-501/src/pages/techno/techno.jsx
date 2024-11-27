import React, { useState, useEffect } from 'react';
import style from "./techno.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Techno() {
  const formations = useSelector(selectFormations);

  const navigate = useNavigate();

  const navigateTo = () => {
      navigate(-1);
  }


  return (
    <>
      <div className={style.AppA}>
      <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft}/></button>
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
