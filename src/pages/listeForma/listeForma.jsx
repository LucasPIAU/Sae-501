import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from "./listeForma.module.css";
import ListCard from '../../components/listCard/listCard';
import { selectFormations } from '../../store/formation/formationSelector.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import FilterForm from '../../components/FilterForm/FilterForm.jsx';

function ListeForma() {
  const formations = useSelector(selectFormations);
  const [filters, setFilters] = useState([]);
  const [type, setType] = useState('generale');

  const filtredFormation = useMemo(() => {
    if (!filters.length) return formations; // Si aucun filtre, retourner toutes les formations
    const combineFilters = filters => obj => filters.every((filter) => filter(obj));
    return formations.filter(combineFilters(filters));
  }, [formations, filters]);

  const sectionItem = [
    {
      name: "Formations Générales et Technologiques",
      link: "/listeGT",
      type: "generalTechnoOption"
    },
    {
      name: "Formations Professionnelles",
      link: "/pro",
      type: "pro"
    },
  ];

  return (
    <>
      <Link to={-1} className={style.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className={style.containerMapFormation}>
        <ListCard items={sectionItem} />
      </div>
    </>
  );
}

export default ListeForma;
