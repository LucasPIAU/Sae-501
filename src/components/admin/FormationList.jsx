import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './List.module.css';

const FormationList = ({ formations }) => {
  const navigate = useNavigate();

  const handleAddFormation = () => {
  };

  const handleUpdateFormation = (id) => {
    navigate('/adminspace', { state: { itemId: id } })
  };

  return (
    <div className={styles.containerList}>
      <ul className={styles.list}>
        {formations.map((formation) => (
          <li key={formation._id} className={styles.listItem}>
            {formation.name}
            <button
              className={styles.buttonList}
              onClick={() => handleUpdateFormation(formation._id)}
            >
              Modifier
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.addButtonList} onClick={handleAddFormation}>
        Ajouter
      </button>
    </div>
  );
};

export default FormationList;
