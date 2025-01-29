// src/components/PopupForm.js
import React, { useState } from "react";
import styles from "./AddEditForm.module.css";
import { useSelector } from "react-redux";
import { selectedCategoriesPro } from "../../store/formation/formationSelector";

const AddEditForm = ({
  display,
  formData,
  setFormData,
  etablissements,
  handleFormSubmit,
  setIsPopupOpen,
  popupMode,
}) => {
  const [formValues, setFormValues] = useState(formData);
  const categoriesPro = useSelector(selectedCategoriesPro);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputNumberChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      setFormValues((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    } 
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormValues((prev) => {
      const updatedEtablissements = checked
        ? [...prev.etablissement, value]
        : prev.etablissement.filter((etabId) => etabId !== value);
      return { ...prev, etablissement: updatedEtablissements };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(formValues);
    setIsPopupOpen(false);
  };

  const handleCategChange = (e) => {
    const { value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        categorie: value,
      },
    }));
  };

  const handleClose = () => {
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
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h3>
          Ajouter{" "}
          {display === "formation" ? "une Formation" : "un Établissement"}
        </h3>
        <form onSubmit={handleSubmit}>
          {display === "formation" && (
            <>
              <label>
                Nom :
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Type :
                <select
                  name="type"
                  value={formValues.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="pro">Professionnel</option>
                  <option value="techno">Technologique</option>
                  <option value="generale">Option Générale</option>
                  <option value="opt-seconde">Option de seconde</option>
                </select>
              </label>
              {formValues.type === "generale" ? (
                <label>
                  Lien :
                  <input
                    type="text"
                    name="link"
                    value={formValues.link}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              ) : (
                <label>
                  Description :
                  <textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              )}
              <label>Établissements :</label>
              <div className={styles.checkboxGroup}>
                {etablissements.map((etab) => (
                  <div key={etab._id} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      name="etablissement"
                      value={etab._id}
                      id={etab._id}
                      checked={formValues.etablissement.includes(etab._id)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={etab._id}>{etab.name}</label>
                  </div>
                ))}
              </div>
              {formValues.type === "pro" && (
                <label>
                  Categorie :
                  <select
                    name="categorie"
                    value={formValues.data.categorie}
                    onChange={handleCategChange}
                  >
                    {categoriesPro.map((categ, index) => (
                      <option key={index} value={categ}>
                        {categ}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </>
          )}
          {display === "etablissement" && (
            <>
              <label>
                Nom :
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Adresse :
                <input
                  type="text"
                  name="adresse"
                  value={formValues.adresse}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Latitude :
                <input
                  type="number"
                  name="Latitude"
                  value={formValues.Latitude}
                  onChange={handleInputNumberChange}
                  required
                />
              </label>
              <label>
                Longitude :
                <input
                  type="number"
                  name="Longitude"
                  value={formValues.Longitude}
                  onChange={handleInputNumberChange}
                  required
                />
              </label>
              <label>
                Téléphone :
                <input
                  type="tel"
                  name="tel"
                  pattern="(\+33|0)[1-9](\d{2}){4}"
                  value={formValues.tel}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Site Web :
                <input
                  type="text"
                  name="website"
                  value={formValues.website}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </>
          )}
          <div className={styles.popupActions}>
            <button type="submit">
              {popupMode === "add" ? "Ajouter" : "Sauvegarder"}
            </button>
            <button type="button" onClick={handleClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditForm;
