import React, { useState, useEffect } from 'react';
import style from "./pro.module.css"; // Assumes you have styles specific to this component
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFormations } from '../../store/formation/formationSelector';

function Techno() {
  const formations = useSelector(selectFormations);

  return (
    <div className={style.AppA}>
      <button className={style.backButton} onClick={handleBackClick}>Back</button>
      <div className={style.containerMapFormation}>
        {/* Conditionally render the ListCard with only techno-type formations */}
        <ListCard items={formations} type="pro"/>
      </div>
    </div>
  );
}

export default Techno;
