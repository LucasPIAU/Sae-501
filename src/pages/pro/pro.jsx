import React, { useState, useMemo, useEffect } from 'react';
import style from "./pro.module.css";
import ListCard from '../../components/listCard/listCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectFormations, selectFormationFilter } from '../../store/formation/formationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faQ } from '@fortawesome/free-solid-svg-icons';
import FilterForm from '../../components/FilterForm/FilterForm';
import { setFormationFilter } from '../../store/formation/formationSlice';

function Pro() {
  const formations = useSelector(selectFormations);
  const [filters, setFilters] = useState([]);
  const filterArray = useSelector(selectFormationFilter);
  const dispatch = useDispatch();

  console.log()
  const filtredFormation = useMemo(() => {
    if (!filters.length) return formations; // Si aucun filtre, retourner toutes les formations
    const combineFilters = (filters) => (obj) => {
      // console.log("Obj en cours de filtrage :", obj); // Log des objets à filtrer
      // console.log("Filtres appliqués :", filters);   // Log des filtres appliqués
      return filters.every((filter) => {
        switch (filter.type) {
          case 'motClef':
            return obj.name.toLowerCase().includes(filter.value);
          case 'generale':
            return filter.value.includes(obj.type);
          case 'pro':
            return obj.type === filter.value;
          case 'etablissement':
            return obj.type === filter.value;
          default:
            return true; // Aucun filtre correspondant
        }
      });
    };
    console.log("filters", filters);
    return formations.filter(combineFilters(filters));
  }, [formations, filters]);
  const [selectedDomain, setSelectedDomain] = useState(null);

  // console.log("filtredFormation : ", filtredFormation);

  // Liste des domaines (catégories)
  const domains = [
    ...new Set(
      formations
        .filter((formation) => formation.type === "pro")
        .map((formation) => formation.data.categorie)
    )
  ].map((category) => ({ name: category, type: "domain" })); // Transforme en objets avec une clé `name`

  // Filtrer les formations affichées en fonction du domaine sélectionné
  const filteredFormations = selectedDomain
    ? formations.filter(
      (formation) =>
        formation.type === "pro" &&
        formation.data.categorie === selectedDomain
    )
    : formations.filter((formation) => formation.type === "pro");

  console.log("domain : ", selectedDomain);
  console.log("filtredFormation : ", filtredFormation);

  const navigateTo = () => {
    if (selectedDomain) {
      setSelectedDomain(null);
    }
  };

  // Met à jour le domaine sélectionné
  const onDomainSelect = (domain) => {
    console.log(domain)
    setSelectedDomain(domain.name); // Met à jour l'état
  };

  const onFilter = (newFilters) => {
    console.log("newFilters : ", newFilters);
    const serializableFilters = newFilters.map((filter) => {
      if (filter.type === "motClef") {
        // Exemple : Conversion de la fonction en un objet de type 'nameContains'
        return filter
      }
      return filter;
    });
    console.log("serializableFilters : ", serializableFilters)
    setFilters(serializableFilters);
    dispatch(setFormationFilter(serializableFilters)); // Envoi des filtres sérialisables à Redux
  };

  useEffect(() => {
    console.log("filterArray", filterArray);
    if (filterArray) {
      // console.log("Filtres récupérés depuis Redux :", filterArray);
      setFilters(filterArray);
    }
  }, [filterArray]);
  console.log("selectedDomain : ", selectedDomain);

  return (
    <>
      <FilterForm onFilter={onFilter} type={"pro"} page={"formation"} />
      <div className={style.containerPro}>
        {!selectedDomain ? <Link to={-1} className={style.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link> : <div className={style.backButton} onClick={()=>{setSelectedDomain(null)}}>          <FontAwesomeIcon icon={faArrowLeft} />
        </div>}
        <div className={style.containerMapFormation}>
          {/* Liste des domaines et formations dans la même ListCard */}
          {!filters.length ? (
            <ListCard
              items={selectedDomain ? filteredFormations : domains} // Affiche soit les domaines, soit les formations filtrées
              onDomainSelect={onDomainSelect} // Permet de sélectionner un domaine
            />
          ) : (
            filtredFormation.length > 0 ? <ListCard items={filtredFormation} isInSearch={true} /> : <div className={style.noDataResult}> Pas de resultat </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Pro;
