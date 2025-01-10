import React, { useState, useEffect } from 'react';
import style from "./pro.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Pro() {
  const formations = useSelector(selectFormations);
  console.log("formations page pro : ", formations);

  const navigate = useNavigate();

  const navigateTo = () => {
      navigate(-1);
  }

  return (
    <>
    <div className={style.containerPro}>
      <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft}/></button>
      <div className={style.containerMapFormation}>
        {/* Conditionally render the ListCard with only techno-type formations */}
        <ListCard items={formations} type="pro"/>
      </div>
    </div>
    </>
  );
}

export default Pro;
