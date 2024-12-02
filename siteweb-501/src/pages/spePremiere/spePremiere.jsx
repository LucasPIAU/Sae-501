import React, { useState, useEffect } from 'react';
import style from "./spePremiere.module.css";
import Map from '../../components/map';
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectEtablissements, selectFormations, selectFilteredEtablissements } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { setFilteredEtablissements, } from '../../store/formation/formationSlice';

function SpePremiere() {
  const formations = useSelector(selectFormations);
  const etablissement = useSelector(selectEtablissements);
  const storeEtablissement = useSelector(selectFilteredEtablissements);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(etablissement);
    dispatch(setFilteredEtablissements(etablissement));
    console.log(storeEtablissement);
  }, [])

  const navigateTo = () => {
    navigate(-1);
  }

  return (
    <>
      <div className={style.containerSpe}>
        <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <div className={style.containerMapFormation}>
          <div className={style.containerMap}>
            <Map />
          </div>
          <div className={style.containerListCard}>
            <ListCard items={formations} type="generale" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SpePremiere;
