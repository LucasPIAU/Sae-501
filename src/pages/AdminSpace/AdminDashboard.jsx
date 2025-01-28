import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormationList from "../../components/admin/FormationList";
import EtablissementList from "../../components/admin/EtablissementList";
import {
  selectEtablissements,
  selectFormations,
} from "../../store/formation/formationSelector";

import { selectIsConnected } from "../../store/connexion/connexionSelector.js";
import styles from './AdminDashboard.module.css';
import { useNavigate } from "react-router-dom/dist";
import { addFormation } from "../../store/formation/formationAsyncAction.js";

const AdminDashboard = () => {
  const [display, setDisplay] = useState("formation");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "pro",
    description: "",
    etablissements: [],
  });

  const formations = useSelector(selectFormations);
  const etablissements = useSelector(selectEtablissements);
  const isConnected = useSelector(selectIsConnected);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected) {
      navigate('/connexion');
    }
  }, [isConnected, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e) => {
    const options = Array.from(e.target.options).filter((opt) => opt.selected);
    setFormData((prev) => ({
      ...prev,
      etablissements: options.map((opt) => opt.value),
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (display === "formation") {
      dispatch(addFormation(formData));
    } else if (display === "etablissement") {
      dispatch({ type: 'etablissement/addEtablissement', payload: { name: formData.name } });
    }
    setIsPopupOpen(false); // Fermer la popup après l'ajout
    setFormData({ name: "", type: "pro", description: "", etablissement: [] });
  };

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

      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h3>
              Ajouter {display === "formation" ? "une Formation" : "un Établissement"}
            </h3>
            <form onSubmit={handleFormSubmit}>
              {display === "formation" && (
                <>
                  <label>
                    Nom :
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Type :
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="pro">Professionnel</option>
                      <option value="techno">Technologique</option>
                    </select>
                  </label>
                  <label>
                    Description :
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Établissements :
                    <select
                      multiple
                      name="etablissement"
                      value={formData.etablissement}
                      onChange={handleMultiSelectChange}
                    >
                      {etablissements.map((etab) => (
                        <option key={etab.id} value={etab.id}>
                          {etab.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}
              {display === "etablissement" && (
                <>
                  <label>
                    Nom :
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </>
              )}
              <div className={styles.popupActions}>
                <button type="submit">Ajouter</button>
                <button type="button" onClick={() => setIsPopupOpen(false)}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button className={styles.popupButton} onClick={() => setIsPopupOpen(true)}>Ajouter</button>
    </div>
  );
};

export default AdminDashboard;
