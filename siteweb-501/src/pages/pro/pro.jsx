import React, { useState, useEffect } from 'react';
import style from "./pro.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFilteredFormations } from '../../store/formation/formationSelector';

function Pro() {
  const formations = useSelector(selectFilteredFormations);
  console.log("formations page pro : ", formations);

  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(-1);
  }

  return (
    <div className={style.AppA}>
      <button className={style.backButton} onClick={navigateTo}></button>
      <div className={style.containerMapFormation}>
        {/* Conditionally render the ListCard with only techno-type formations */}
        <ListCard items={formations} type="pro"/>
      </div>
    </div>
  );
}

export default Pro;
