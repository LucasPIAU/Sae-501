import React from 'react';
import Card from '../card/card';
import style from './listCard.module.css';

function ListCard({ items, type, onCategorySelect, selectedCategorie }) {
  const filteredItems = items.filter(
    item => item.type === type && (!selectedCategorie || item.categorie === selectedCategorie)
  );

  console.log('Items:', items);
  console.log('Selected Category:', selectedCategorie);
  console.log('Filtered Items:', filteredItems);

  return (
    <div className={style.listCard}>
      <div className={style.cardContainer}>
        {filteredItems.map((item, index) => (
          <Card
            key={index}
            item={item}
            onCategorySelect={onCategorySelect}
          />
        ))}
      </div>
    </div>
  );
}

export default ListCard;
