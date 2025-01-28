import React, { useState, useEffect } from 'react';
import style from "./options.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Options() {

  const formations = useSelector(selectFormations);

  const updatedFormations = formations.filter(formation => formation.filiere === "option");

  const navigate = useNavigate();

  const navigateTo = () => {
      navigate(-1);
  }

  return (
    <>
      <div className={style.containerOptions}>
        <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft}/></button>
        <div className={style.containerMapFormation}>
          <ListCard items={updatedFormations}/>
        </div>
      </div>
    </>
  );
}

export default Options;
