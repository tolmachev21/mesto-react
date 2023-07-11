import React, { useState } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';


function App() {

    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    };

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    };

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setImagePopupOpen(false);
    };

    return (
        <div className="page">
            <Header />
            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
            <Footer />
            <PopupWithForm title='Редактировать профиль' name='edit-profile' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <input className="popup__input popup__input_field_name" id="profile-name" type="text" name="user" defaultValue="" placeholder="Введите имя" required minLength="2" maxLength="40"></input>
                <span id="profile-name-error" className="popup__error"></span>
                <input className="popup__input popup__input_field_job" id="profile-job" type="text" name="job" defaultValue="" placeholder="Введите свою профессию" required minLength="2" maxLength="200"></input>
                <span id="profile-job-error" className="popup__error"></span>
            </PopupWithForm>
            <PopupWithForm title='Новое место' name='add-card' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <input className="popup__input popup__input_field_place" id="card-place" type="text" name="title" defaultValue="" placeholder="Название" required minLength="2" maxLength="30"></input>
                <span id="card-place-error" className="popup__error"></span>
                <input className="popup__input popup__input_field_link" id="card-link" type="url" name="link" defaultValue="" placeholder="Ссылка на картинку" required></input>
                <span id="card-link-error" className="popup__error"></span>
            </PopupWithForm>
            <PopupWithForm title='Обновить аватар' name='edit-avatar' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <input className="popup__input popup__input_field_link" id="avatar" type="url" name="avatar" defaultValue="" placeholder="Ссылка на картинку" required></input>
                <span id="avatar-error" className="popup__error"></span>
            </PopupWithForm>
            <PopupWithForm title='Вы уверены?' name='delete-card'>
                <button className="popup__submit-button popup__submit-button_state_valid" type="submit">Да</button>
            </PopupWithForm>
            <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        </div>

    )
};

export default App;