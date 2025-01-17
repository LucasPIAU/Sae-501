import React, { useState, useEffect } from 'react';
import style from "./pageCard.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentPage, selectFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function PageCard({filiere}) {
  const formations = useSelector(selectFormations);
  const navigate = useNavigate();

  const currentPage = useSelector(selectCurrentPage);
  // console.log(currentPage);
  const navigateTo = () => {
      navigate(-1);
  }

  return (
    <>
    <div className={style.containerPro}>
      <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft}/></button>
      <div className={style.containerMapFormation}>
        <ListCard items={formations} type={currentPage}/>
      </div>
    </div>
    </>
  );
}

export default PageCard;
