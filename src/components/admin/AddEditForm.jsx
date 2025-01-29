// src/components/PopupForm.js
import React, { useState } from "react";
import styles from "./AddEditForm.module.css";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
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

  const handleClose = () => {
    setIsPopupOpen(false);
    setFormData({
      name: "",
      type: "pro",
      description: "",
      etablissement: [],
      link: "",
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
