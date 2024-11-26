import React, { useState, useEffect } from 'react';
import style from "./lycees.module.css";
import ListCard from '../../components/listCard/listCard';
import Map from '../../components/map';
import { useNavigate } from 'react-router-dom';
import FilterCarte from '../../components/FilterCarte/FilterCarte';

function Lycees() {
    const [lycees, setLycees] = useState([]);

    useEffect(() => {
        fetch('/assets/json/data.json')
          .then(response => response.json())
          .then(data => {setLycees(data);console.log(data)});
    }, []);

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
                    <ListCard items={lycees} type="etablissement"/>
                </div>
            </div>
        </>
    );
}

export default Lycees;