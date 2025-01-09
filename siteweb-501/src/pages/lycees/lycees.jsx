import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./lycees.module.css";
import ListCard from '../../components/listCard/listCard';
import Map from '../../components/map';
import { useNavigate } from 'react-router-dom';
import { selectFilteredEtablissements } from '../../store/formation/formationSelector.js';
import FilterCarte from '../../components/FilterCarte/FilterCarte';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
function Lycees() {
    const etablissements = useSelector(selectFilteredEtablissements);
    console.log("etablissement page lycée : ", etablissements)

    const navigate = useNavigate();

    const navigateTo = () => {
        navigate(-1);
    }

    return (
        <>
            <FilterCarte/>
            <div className={style.containerLycee}>
                <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft}/></button>
                <div className={style.containerMapFormation}>
                    <div className={style.containerMap}>
                    <Map />
                    </div>
                    <div className={style.containerListCard}>
                    <ListCard items={etablissements}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Lycees;