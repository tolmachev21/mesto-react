import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={props.onClose} type="button" aria-label={`Закрыть окно '${props.label}'`}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} noValidate>
          {props.children}
          <button className="popup__submit-button" type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;