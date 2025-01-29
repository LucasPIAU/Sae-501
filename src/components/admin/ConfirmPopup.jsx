import React from 'react';
import styles from './ConfirmPopup.module.css';

const ConfirmPopup = ({ onCancel, onConfirm, message }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.header}>Attention !</h3>
        <p>{message}</p>
        <div className={styles.confirmButtons}>
          <button className={styles.confirmButton} onClick={onCancel}>
            Annuler
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
