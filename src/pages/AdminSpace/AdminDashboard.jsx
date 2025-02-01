import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormationList from "../../components/admin/FormationList";
import EtablissementList from "../../components/admin/EtablissementList";
import {
  selectEtablissements,
  selectFormations,
} from "../../store/formation/formationSelector";

import { selectIsConnected } from "../../store/connexion/connexionSelector.js";
import styles from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom/dist";
import {
  addEtablissement,
  addFormation,
  editEtablissement,
  editFormation,
} from "../../store/formation/formationAsyncAction.js";
import AddEditForm from "../../components/admin/AddEditForm.jsx";
import FilterForm from "../../components/FilterForm/FilterForm.jsx";
import { selectFormationFilter } from "../../store/formation/formationSelector";
import { setFormationFilter } from "../../store/formation/formationSlice.js";

const AdminDashboard = () => {
  const [display, setDisplay] = useState("formation");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("add");
  const [formData, setFormData] = useState({
    name: "",
    type: "pro",
    description: "",
    etablissement: [],
    link: "",
    adresse: "",
    Latitude: 0,
    Longitude: 0,
    tel: "",
    website: "",
    data: { categorie: "" },
  });

  const formations = useSelector(selectFormations);
  const etablissements = useSelector(selectEtablissements);
  const isConnected = useSelector(selectIsConnected);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const filterArray = useSelector(selectFormationFilter)
    // console.log('formation : ', formations)
    const [filters, setFilters] = useState([]);  
    useEffect(() => {
      console.log("filterArray", filterArray);
      if (filterArray) {
        // console.log("Filtres récupérés depuis Redux :", filterArray);
        setFilters(filterArray);
      }
    }, [filterArray]);

  useEffect(() => {
    if (!isConnected) {
      navigate("/connexion");
    }
  }, [isConnected, navigate]);

  const handleFormSubmit = (formValues) => {
    if (display === "formation") {
      if (popupMode === "add") {
        if (formValues.type === "generale") {
          const {
            description,
            adresse,
            Latitude,
            Longitude,
            tel,
            website,
            etablissement,
            ...filteredValues
          } = formValues;
          dispatch(addFormation(filteredValues));
        } else if (
          formValues.type === "techno" ||
          formValues.type === "opt-seconde"
        ) {
          const {
            link,
            adresse,
            Latitude,
            Longitude,
            tel,
            website,
            data,
            ...filteredValues
          } = formValues;
          dispatch(addFormation(filteredValues));
        } else if (formValues.type === "pro") {
          const {
            link,
            adresse,
            Latitude,
            Longitude,
            tel,
            website,
            ...filteredValues
          } = formValues;
          dispatch(addFormation(filteredValues));
        }
      } else if (popupMode === "edit") {
        if (formValues.type === "generale") {
          const {
            description,
            adresse,
            Latitude,
            Longitude,
            tel,
            website,
            ...filteredValues
          } = formValues;
          dispatch(editFormation(filteredValues));
        } else if (
          formValues.type === "techno" ||
          formValues.type === "opt-seconde"
        ) {
          const {
            link,
            adresse,
            Latitude,
            Longitude,
            tel,
            website,
            data,
            ...filteredValues
          } = formValues;
          dispatch(editFormation(filteredValues));
        } else if (formValues.type === "pro") {
          const {
            link,
            adresse,
            Latitude,
            Longitude,
            tel,
            website,
            ...filteredValues
          } = formValues;
          dispatch(editFormation(filteredValues));
        }
      }
    } else if (display === "etablissement") {
      if (popupMode === "add") {
        const {
          link,
          type,
          description,
          etablissement,
          data,
          ...filteredValues
        } = formValues;
        dispatch(addEtablissement(filteredValues));
      } else if (popupMode === "edit") {
        const {
          link,
          type,
          description,
          etablissement,
          data,
          ...filteredValues
        } = formValues;
        dispatch(editEtablissement(filteredValues));
      }
    }
    setIsPopupOpen(false);
    setFormData({
      name: "",
      type: "pro",
      description: "",
      etablissement: [],
      link: "",
      adresse: "",
      Latitude: 0,
      Longitude: 0,
      tel: "",
      website: "",
      data: { categorie: "" },
    });
  };

    const combineFilters = (filters) => (obj) => {
      // console.log("Obj en cours de filtrage :", obj); // Log des objets à filtrer
      // console.log("Filtres appliqués :", filters);   // Log des filtres appliqués
      return filters.every((filter) => {
        console.log(filter)
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
  
    const filtredFormation = useMemo(() => {
      if (!filters.length) return formations; // Si aucun filtre, retourner toutes les formations
      console.log('formation : ', formations)
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

  return (
    <div className={styles.containerDashboard}>
      <h1 className={styles.titleDashboard}>Panel d'administration</h1>
      <nav className={styles.navDashboard}>
        <button onClick={() => setDisplay("formation")}>Formations</button>
        <button onClick={() => setDisplay("etablissement")}>
          Etablissements
        </button>
      </nav>

      {display === "formation" && (
        <section className={styles.sectionDashboard}>
          <h2 className={styles.h2Dashboard}>Formations</h2>
          <FilterForm onFilter={onFilter} type={"all"} page={"formation"}/>
          <FormationList
            formations={filtredFormation}
            setPopupOpen={setIsPopupOpen}
            setPopupMode={setPopupMode}
            setFormData={setFormData}
          />
        </section>
      )}
      {display === "etablissement" && (
        <section className={styles.sectionDashboard}>
          <h2 className={styles.h2Dashboard}>Etablissements</h2>
          <EtablissementList
            etablissements={etablissements}
            setPopupOpen={setIsPopupOpen}
            setPopupMode={setPopupMode}
            setFormData={setFormData}
          />
        </section>
      )}

      {isPopupOpen && (
        <AddEditForm
          display={display}
          formData={formData}
          etablissements={etablissements}
          handleFormSubmit={handleFormSubmit}
          setIsPopupOpen={setIsPopupOpen}
          popupMode={popupMode}
          setFormData={setFormData}
        />
      )}
      <button
        className={styles.openButton}
        onClick={() => {
          setIsPopupOpen(true);
          setPopupMode("add");
        }}
      >
        Ajouter
      </button>
    </div>
  );
};

export default AdminDashboard;
