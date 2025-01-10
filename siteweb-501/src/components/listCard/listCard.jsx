import React from 'react';
import Card from '../card/card';
import style from './listCard.module.css';

function ListCard({ items, isInSearch = false }) {

  console.log('Items:', items);
  console.log('Filtered Items:', items);

  return (
    <div className={style.listCard}>
      <div className={style.cardContainer}>
        {/* Parcours les items filtrés et affiche chaque Card */}
        {items.map((item, index) => (
          <Card key={index} item={item} isInSearch={isInSearch}/>
        ))}
      </div>
    </div>
  );
}

export default ListCard;
