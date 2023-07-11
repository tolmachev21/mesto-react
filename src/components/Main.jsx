import React, { useState, useEffect } from 'react';
import api from './utils/Api.js';
import Card from './Card.jsx';

const Main = function (props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([dataUser, dataCards]) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        setCards(dataCards);
      });
  }, [])


  return (
    <main className="main">
      <section className="profile">
        <button className="profile__avatar-button" onClick={props.onEditAvatar} type="button">
          <img className="profile__avatar" src={userAvatar} alt="Автар профиля"></img>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль"></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} type="button" aria-label="Добавить картинку"></button>
      </section>

      <section className="places" aria-label="Сетка с картинками">
        {cards.map((data) => {
          return (
            <Card card={data} key={data._id} onCardClick={props.onCardClick} />
          )
        })}
      </section>
    </main>
  );
};

export default Main;