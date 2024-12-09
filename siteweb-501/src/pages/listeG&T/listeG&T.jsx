import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "./listeG&T.module.css";
import Map from '../../components/map';
import FiltrageFilieres from '../../components/FilterFilieres/FilterFilieres.jsx';
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { initializeData } from '../../store/formation/formationSlice';
import { selectFormations } from '../../store/formation/formationSelector.js';
import { selectFilteredFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function ListeGT() {
  const formations = useSelector(selectFilteredFormations);
  console.log('oscour', formations)

  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(-1);
  }

  var recherche = false;

  if (formations.length === 14) {
    recherche = true;
  }

  const sectionItem = [
    {
      nom: "seconde générale et technologique",
      link: "/optionGenerale"
    },
    {
      nom:"Première générale",
      link: "/spePremiere"
    },
    {
      nom: "Première technologique",
      link: "/filiereTechno"
    }
  ]

    return (
        <>
            <FiltrageFilieres />
            <div className={style.AppA}>
                <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft}/></button>  
                <div className={style.containerMapFormation}>
                {/* <ListCard items={formations} type="formation" /> */}
                {recherche ? (
                    <ListCard items={sectionItem} />
                ) : (
                    <>
                        <ListCard items={formations} type="techno" />
                        <ListCard items={formations} type="options" />
                        <ListCard items={formations} type="generale" />
                    </>
                )}
                {/* <ListCard items={sectionItem} /> */}
                </div>
            </div>
        </>
    );
}

export default ListeGT;