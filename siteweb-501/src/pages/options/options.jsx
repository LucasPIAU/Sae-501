import React, { useState } from 'react';
import style from "./options.module.css";
import ListCard from '../../components/listCard/listCard';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFormations, selectEtablissements } from '../../store/formation/formationSelector';
import { addFormation } from '../../store/formation/formationAsyncAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Options() {
  const formations = useSelector(selectFormations);
  const etablissementsDisponibles = useSelector(selectEtablissements); // Liste des établissements
  const dispatch = useDispatch();
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    filiere: '',
    categorie: '',
    attributs: '',
    poursuiteEtudes: '',
    lieuxExercice: '',
    etablissement: [], // Contient les IDs des établissements sélectionnés
  });

  const navigate = useNavigate();

  const navigateTo = () => navigate(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEtablissementChange = (e) => {
    // Récupère les IDs sélectionnés
    const selectedIds = Array.from(e.target.selectedOptions).map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      etablissement: selectedIds,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(addFormation(formData)); // Dispatch avec les données
      console.log('Formation ajoutée avec succès :', result);
      setPopUpIsOpen(false);
      setFormData({
        name: '',
        filiere: '',
        categorie: '',
        attributs: '',
        poursuiteEtudes: '',
        lieuxExercice: '',
        etablissement: [],
      });
    } catch (error) {
      console.error('Erreur lors de l’ajout de la formation :', error);
    }
  };

  return (
    <div className={style.containerOptions}>
      <button className={style.backButton} onClick={navigateTo}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button className={style.backButton} onClick={() => setPopUpIsOpen(true)}>
        Ajouter une formation
      </button>
      <div className={style.containerMapFormation}>
        <ListCard items={formations} type="option" />
        {popUpIsOpen && (
          <>
            {/* Overlay sombre */}
            <div className={style.modalOverlay} onClick={() => setPopUpIsOpen(false)}></div>
            <div className={style.editModal}>
              <h3>Ajouter un Élement</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Nom de la formation :
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Filière :
                  <select
                    name="filiere"
                    value={formData.filiere}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Sélectionnez une filière</option>
                    <option value="Professionel">Professionel</option>
                    <option value="technologique">Technologique</option>
                    <option value="generale">Générale</option>
                    <option value="option">Option</option>
                  </select>
                </label>
                <label>
                  Catégorie :
                  <input
                    type="text"
                    name="categorie"
                    value={formData.categorie}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Attributs :
                  <input
                    type="text"
                    name="attributs"
                    value={formData.attributs}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Poursuite des études :
                  <input
                    type="text"
                    name="poursuiteEtudes"
                    value={formData.poursuiteEtudes}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Lieux d'exercice :
                  <input
                    type="text"
                    name="lieuxExercice"
                    value={formData.lieuxExercice}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Établissements :
                  <select
                    name="etablissement"
                    multiple
                    value={formData.etablissement}
                    onChange={handleEtablissementChange}
                    required
                  >
                    {etablissementsDisponibles.map((etablissement) => (
                      <option key={etablissement._id} value={etablissement._id}>
                        {etablissement.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div>
                  <button type="submit">Ajouter</button>
                  <button type="button" onClick={() => setPopUpIsOpen(false)}>
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Options;
