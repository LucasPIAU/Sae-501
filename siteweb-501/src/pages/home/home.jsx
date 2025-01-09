import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredEtablissements } from '../../store/formation/formationSelector.js';
import style from "./home.module.css";

function Home() {
  const etablissements = useSelector(selectFilteredEtablissements);
  console.log("Etablissements Home : ", etablissements.length);

  return (
    <>
      <div className={style.paragraphe}>
        <p>
        Bienvenue sur notre plateforme dédiée aux formations proposées par les lycées publics de la Mayenne ! Que vous soyez élève, parent ou simplement curieux, découvrez une présentation complète des parcours éducatifs, des options de seconde aux spécialités de première générale et technologique, jusqu’aux différents baccalauréats professionnels. Nous mettons à votre disposition toutes les informations nécessaires pour vous aider à faire les choix qui correspondent le mieux à vos aspirations et projets d’avenir. Explorez les nombreuses possibilités offertes dans notre département et trouvez la voie qui vous mènera vers la réussite !
        </p>
      </div>
      <hr className={style.hr} />
      <div className={style.container}>
        <h2>Retrouvez les {etablissements.length} lycées de la Mayenne et découvrez leurs formations</h2>
        <div className={style.logoGrid}>
          {etablissements.map((etablissement, index) => (
            <a href={etablissement.link} target='_blank'>
              <div key={index} className={style.logoItem}>
                <img src={etablissement.logo} alt={etablissement.nom} className={style.logoImage}/>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}


export default Home;
