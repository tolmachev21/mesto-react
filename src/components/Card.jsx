import React from 'react';
import select from '../images/Vector-love.svg';

function Card({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card);
  };

  return (
    <article className="place">
      <img className="place__image" src={card.link} alt={`Картинка ${card.name}`} onClick={handleClick}></img>
      <button className="place__trash" type="button" aria-label="Удалить"></button>
      <div className="place__caption">
        <h3 className="place__title">{card.name}</h3>
        <div className="place__like-container">
          <img className="place__select" src={select} alt="Положить в избранное"></img>
          <p className="place__counter"></p>
        </div>
      </div>
    </article>
  );
};

export default Card;