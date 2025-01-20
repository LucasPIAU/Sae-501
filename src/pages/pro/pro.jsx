import React, { useState, useMemo } from 'react';
import style from "./pro.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFormations } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import FilterForm from '../../components/FilterForm/FilterForm';

function Pro() {
  const formations = useSelector(selectFormations);
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const filtredFormation = useMemo(() => {
      if (!filters.length) return formations; // Si aucun filtre, retourner toutes les formations
      const combineFilters = filters => obj => filters.every((filter) => filter(obj));
      return formations.filter(combineFilters(filters));
    }, [formations, filters]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  console.log("formation : ", formations);

  // Liste des domaines (catégories)
  const domains = [
    ...new Set(
      formations
        .filter((formation) => formation.filiere === "Professionel")
        .map((formation) => formation.categorie)
    )
  ].map((category) => ({ name: category })); // Transforme en objets avec une clé `name`

  // Filtrer les formations affichées en fonction du domaine sélectionné
  const filteredFormations = selectedDomain
    ? formations.filter(
        (formation) =>
          formation.filiere === "Professionel" &&
          formation.categorie === selectedDomain
      )
    : formations.filter((formation) => formation.filiere === "Professionel");

  const navigateTo = () => {
    if(selectedDomain){
      setSelectedDomain(null);
    } else {
      navigate(-1);
    }
  };

  // Met à jour le domaine sélectionné
  const onDomainSelect = (domain) => {
    setSelectedDomain(domain.name); // Met à jour l'état
  };

  const onFilter = (newFilters) => {
    setFilters(newFilters);
  }

  return (
    <>
      <FilterForm onFilter={onFilter} type={"pro"} page={"formation"}/>
      <div className={style.containerPro}>
        <button className={style.backButton} onClick={navigateTo}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={style.containerMapFormation}>
          {/* Liste des domaines et formations dans la même ListCard */}
        {!filters.length ? (
            <ListCard
            items={selectedDomain ? filteredFormations : domains} // Affiche soit les domaines, soit les formations filtrées
            onDomainSelect={onDomainSelect} // Permet de sélectionner un domaine
          />
          ) : (
            <ListCard items={filtredFormation} isInSearch={true} />
          )}
        </div>
      </div>
    </>
  );
}

export default Pro;
