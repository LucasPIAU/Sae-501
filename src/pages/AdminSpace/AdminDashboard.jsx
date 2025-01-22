import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormationList from "../../components/admin/FormationList";
import EtablissementList from "../../components/admin/EtablissementList";
import {
  selectEtablissements,
  selectFormations,
} from "../../store/formation/formationSelector";

import {selectIsConnected} from "../../store/connexion/connexionSelector.js";
import styles from './AdminDashboard.module.css';
import { useNavigate } from "react-router-dom/dist";

const AdminDashboard = () => {
  const [display, setDisplay] = useState("formation");

  const formations = useSelector(selectFormations);
  const etablissements = useSelector(selectEtablissements);
  const isConnected = useSelector(selectIsConnected);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!isConnected) {
      navigate('/connexion');
    }
  },[isConnected, navigate])

  return (
    <div className={styles.containerDashboard}>
      <h1 className={styles.titleDashboard}>Panel d'administration</h1>
      <nav className={styles.navDashboard}>
        <button onClick={() => setDisplay("formation")}>Formations</button>
        <button onClick={() => setDisplay("etablissement")}>Etablissements</button>
      </nav>
      {display === "formation" && (
        <section className={styles.sectionDashboard}>
          <h2 className={styles.h2Dashboard}>Formations</h2>
          <FormationList formations={formations} />
        </section>
      )}
      {display === "etablissement" && (
        <section className={styles.sectionDashboard}>
          <h2 className={styles.h2Dashboard}>Etablissements</h2>
          <EtablissementList etablissements={etablissements} />
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
