import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from "./listeG&T.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { setFormationFilter } from '../../store/formation/formationSlice';
import { selectFormationFilter, selectFormations } from '../../store/formation/formationSelector.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import FilterForm from '../../components/FilterForm/FilterForm.jsx';

function ListeGT() {
  const formations = useSelector(selectFormations);
  const filterArray = useSelector(selectFormationFilter)
  // console.log('formation : ', formations)
  const [filters, setFilters] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(-1);
  }

  useEffect(() => {
    console.log("filterArray", filterArray);
    if (filterArray) {
      // console.log("Filtres récupérés depuis Redux :", filterArray);
      setFilters(filterArray);
    }
  }, [filterArray]);
  

  const combineFilters = (filters) => (obj) => {
    // console.log("Obj en cours de filtrage :", obj); // Log des objets à filtrer
    // console.log("Filtres appliqués :", filters);   // Log des filtres appliqués
    return filters.every((filter) => {
      switch (filter.type) {
        case 'motClef':
          return obj.name.toLowerCase().includes(filter.value);
        case 'generale':
          return filter.value.includes(obj.filiere);
        case 'pro':
          return obj.filiere === filter.value;
        case 'etablissement':
          return obj.filiere === filter.value;
        default:
          return true; // Aucun filtre correspondant
      }
    });
  };
  

  const filtredFormation = useMemo(() => {
    if (!filters.length) return formations; // Si aucun filtre, retourner toutes les formations
    return formations.filter(combineFilters(filters));
  }, [formations, filters]);

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
  

  // const filtredFormation = useMemo(() => {
  //   if (!filters.length) return formations; // Si aucun filtre, retourner toutes les formations
  //   const combineFilters = filters => obj => filters.every((filter) => filter(obj));
  //   return formations.filter(combineFilters(filters));
  // }, [formations, filters]);

  // useEffect(()=>{
  //   if(filterArray){
  //     console.log("newFilter : ", filterArray)
  //     setFilters(filterArray);
  //   }
  // },[])

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


  // const onFilter = (newFilters) => {
  //   setFilters(newFilters);
  //   dispatch(setFormationFilter(newFilters));
  // }

  return (
    <>
      <div className={style.AppA}>
        <button className={style.backButton} onClick={navigateTo}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <FilterForm onFilter={onFilter} type={"generale"} page={"formation"}/>
        <div className={style.containerMapFormation}>
          {!filters.length ? (
            <ListCard items={sectionItem} />
          ) : (
            filtredFormation.length > 0 ? <ListCard items={filtredFormation} isInSearch={true} /> : <div className={style.noDataResult}> Pas de resultat </div>
          )}  
        </div>
      </div>
    </>
  );
}

export default ListeGT;