import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/connexion/connexionSlice";
import { selectToken, selectError, selectLoading } from "../../store/connexion/connexionSelector";
import { login } from "../../store/connexion/connexionAsyncAction";
import styles from './Connexion.module.css';

function Connexion() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const token = useSelector(selectToken);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleReconnect = () => {
        console.log(token);
    }

    return (
        <div className={styles.container}>
            {token ? (
                <>
                    <h2 className={styles.heading}>Votre Navigateur a sauvegardé l'ancien Token de connexion, voulez-vous tenter de vous connecter à l'aide de celui-ci ?</h2>
                    <div className={styles.choicesContainer}>
                        <button
                            onClick={handleReconnect}
                            className={styles.reconnectButton}
                        >
                            Oui
                        </button>
                        <button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
                            Non
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2 className={styles.heading}>Connexion</h2>
                    {error && <div className={styles.error}>{error}</div>}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formControl}>
                            <label htmlFor="username" className={styles.formLabel}>Nom d'utilisateur :</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className={styles.formInput}
                            />
                        </div>
                        <div className={styles.formControl}>
                            <label htmlFor="password" className={styles.formLabel}>Mot de passe :</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={styles.formInput}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.submitButton}
                        >
                            {loading ? "Connexion en cours..." : "Se connecter"}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default Connexion;
