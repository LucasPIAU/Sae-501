import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "./listeG&T.module.css";
import Map from '../../components/map';
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { initializeData } from '../../store/formation/formationSlice';
import { selectFormations } from '../../store/formation/formationSelector.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import FilterForm from '../../components/FilterForm/FilterForm.jsx';

function ListeGT() {
  const formations = useSelector(selectFormations);
  // console.log('formation : ', formations)
  const [filters, setFilters] = useState([]);
  const [type, setType] = useState('generale');
  const filtredFormation = useMemo(() => {
    if (!filters.length) return formations; // Si aucun filtre, retourner toutes les formations
    const combineFilters = filters => obj => filters.every((filter) => filter(obj));
    return formations.filter(combineFilters(filters));
  }, [formations, filters]);

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(-1);
  }

  const sectionItem = [
    {
      name: "Options de seconde générale et technologique",
      link: "/optionGenerale",
      filiere: "option"
    },
    {
      name: "Première générale",
      link: "/spePremiere",
      filiere: "general"
    },
    {
      name: "Première technologique",
      link: "/filiereTechno",
      filiere: "techno"
    }
  ]


  const onFilter = (newFilters) => {
    setFilters(newFilters);
  }

  const onSetType = (newType) => {
    setType(newType);
  }

  return (
    <>
      <FilterForm onFilter={onFilter} type={"generale"} page={"formation"}/>
      <div className={style.AppA}>
        <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <div className={style.containerMapFormation}>
          {!filters.length && type === "generale" ? (
            <ListCard items={sectionItem} />
          ) : (
            <ListCard items={filtredFormation} isInSearch={true} />
          )}
        </div>
      </div>
    </>
  );
}

export default ListeGT;