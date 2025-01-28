import React, { useState } from "react";
import styles from "./List.module.css";

const EtablissementList = ({ etablissements }) => {
  const [newEtablissement, setNewEtablissement] = useState("");
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);

  const handleAddEtablissement = () => {};

  const handleUpdateEtablissement = (id) => {};

  return (
    <div className={styles.containerList}>
      <ul className={styles.list}>
        {etablissements.map((etablissement) => (
          <li key={etablissement._id} className={styles.listItem}>
            {etablissement.name}
            <button
              className={styles.buttonList}
              onClick={() => handleUpdateEtablissement(etablissement._id)}
            >
              Modifier
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.addButtonList} onClick={handleAddEtablissement}>
        Ajouter
      </button>
    </div>
  );
};

export default EtablissementList;
