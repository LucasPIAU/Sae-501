import React from 'react';
import Card from '../card/card';
import style from './listCard.module.css'

function ListCard({ items, type }) {
  // Filtrer les items en fonction du type
  const filteredItems = items.filter(item => item.type === type);

  return (
    <div className={style.listCard}>
      <h2>Liste des {type}s</h2>
      <div className={style.cardContainer}>
        {/* Parcours les items filtrés et affiche chaque Card */}
        {filteredItems.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ListCard;
