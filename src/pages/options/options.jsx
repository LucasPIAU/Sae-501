import React, { useState, useEffect } from 'react';
import style from "./options.module.css";
import ListCard from '../../components/listCard/listCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Options() {

  const formations = useSelector(selectFormations);

  const updatedFormations = formations.filter(formation => formation.type === "opt-seconde");

  return (
    <>
      <div className={style.containerOptions}>
        <Link to={-1} className={style.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className={style.containerMapFormation}>
          <ListCard items={updatedFormations}/>
        </div>
      </div>
    </>
  );
}

export default Options;
