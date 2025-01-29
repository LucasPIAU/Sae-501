import React, { useEffect, useState } from "react";
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
            etablissement,
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
          <FormationList
            formations={formations}
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
