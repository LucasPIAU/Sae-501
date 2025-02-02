import React from 'react';
import Card from '../card/card';
import style from './listCard.module.css';

function ListCard({ items, isInSearch = false, onDomainSelect, onSpeSelect, onHover, mini = false}) {

  // console.log('Items:', items);
  // console.log('Filtered Items:', items);

  return (
    <div className={style.listCard}>
      <div className={style.cardContainer}>
        {items.map((item, index) => (
          <Card key={index} item={item} isInSearch={isInSearch} onDomainSelect={onDomainSelect} onSpeSelect={onSpeSelect} onHover={onHover} mini={mini}/>
        ))}
      </div>
    </div>
  );
}

export default ListCard;
