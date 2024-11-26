import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./lycees.module.css";
import ListCard from '../../components/listCard/listCard';
import Map from '../../components/map';
import { useNavigate } from 'react-router-dom';
import { selectEtablissements } from '../../store/formation/formationSelector.js';
import FilterCarte from '../../components/FilterCarte/FilterCarte';
import { selectEtablissement } from '../../store/formation/formationSelector';
import { useSelector } from 'react-redux';

function Lycees() {
    const etablissements = useSelector(selectEtablissements);
    console.log("Cela fonctionne-t-il ?", etablissements)

    const navigate = useNavigate();

    const navigateTo = () => {
        navigate(-1);
    }

    return (
        <>
            <FilterCarte/>
            <div className={style.AppA}>
                <button className={style.backButton} onClick={navigateTo}>Back</button>
                <div className={style.containerMapFormation}>
                    <div className={style.containerMap}>
                    <Map />
                    </div>
                    <ListCard items={etablissements} type="etablissement"/>
                </div>
            </div>
        </>
    );
}

export default Lycees;