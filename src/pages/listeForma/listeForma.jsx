import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "./listeForma.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { initializeData } from '../../store/formation/formationSlice';
import { selectFormations } from '../../store/formation/formationSelector.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import FilterForm from '../../components/FilterForm/FilterForm.jsx';

function ListeForma() {
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
      name: "Formations Générales et Technologiques",
      link: "/listeGT",
      filiere: "generalTechnoOption"
    },
    {
      name: "Formations Professionnelles",
      link: "/pro",
      filiere: "Professionel"
    },
  ]

  // console.log('newType : ' + type);
  // console.log("filters : " + filters)

  return (
    <>
      {/* <FilterForm onFilter={onFilter} onSetType={onSetType} page={"formation"}/> */}
      <div className={style.AppA}>
        <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <div className={style.containerMapFormation}>
          <ListCard items={sectionItem} />
        </div>
      </div>
    </>
  );
}

export default ListeForma;