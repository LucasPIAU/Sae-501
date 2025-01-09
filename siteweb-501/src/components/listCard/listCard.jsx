import React from 'react';
import Card from '../card/card';
import style from './listCard.module.css';

function ListCard({ items, type }) {
  // Filtrer les items en fonction du type
  console.log(type);
  console.log(items);
  const filteredItems = items.filter(item => item.filiere === type);

  return (
    <div className={style.listCard}>
      <div className={style.cardContainer}>
        {/* Parcours les items filtrés et affiche chaque Card */}
        {filteredItems.map((item, index) => (
          <Card key={index} item={item} onCategorySelect={onCategorySelect} />
        ))}
      </div>
    </div>
  );
}

export default ListCard;
