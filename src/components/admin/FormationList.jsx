import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./List.module.css";
import { useDispatch } from "react-redux";
import { deleteFormation } from "../../store/formation/formationAsyncAction";
import ConfirmPopup from "./ConfirmPopup";

const FormationList = ({ formations, setPopupOpen, setPopupMode, setFormData }) => {
  const dispatch = useDispatch();
  const [toDeleteId, setToDeleteId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteFormation(id));
    setToDeleteId("");
    setShowConfirm(false);
  };

  const handleOpenPopup = (formation) => {
    setPopupOpen(true);
    setPopupMode("edit");
    setFormData(formation);
  };

  const handleConfirmationOpen = (id) => {
    setToDeleteId(id);
    setShowConfirm(true);
  };

  return (
    <div className={styles.containerList}>
      <ul className={styles.list}>
        {formations.map((formation) => (
          <li key={formation._id} className={styles.listItem}>
            <h3 className={styles.titleItemList}>{formation.name}</h3>
            <div>
              {formation.type !== "generale" && (
                <Link
                  to="/adminspace"
                  state={{ itemId: formation._id }}
                  className={styles.buttonList}
                >
                  Modifier la page
                </Link>
              )}
              <button
                className={styles.buttonList}
                onClick={() => {
                  handleOpenPopup(formation);
                }}
              >
                Modifier
              </button>
              <button
                className={styles.buttonListDelete}
                onClick={() => handleConfirmationOpen(formation._id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showConfirm && (
        <ConfirmPopup
          onCancel={() => {
            setShowConfirm(false);
          }}
          onConfirm={() => {
            handleDelete(toDeleteId);
          }}
          message={`Voulez-vous vraiment supprimer l'élément ?`}
        />
      )}
    </div>
  );
};

export default FormationList;
