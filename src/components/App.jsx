import React, { useEffect, useState } from 'react';
import api from '../utils/Api.js';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';


function App() {

    // Стейты контекста
    const [currentUser, setCurrentUser] = useState({});

    // Стейт карточек
    const [cards, setCards] = useState([]);
    const [deleteCardId, setDeleteCardId] = useState('');


    // Стейты попапов
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
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

    function handleDeleteCardClick(cardId) {
        setDeleteCardId(cardId);
        setDeletePopupOpen(true);
    };

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    };


    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeletePopupOpen(false);
        setImagePopupOpen(false);
    };

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([dataUser, dataCards]) => {
                setCurrentUser(dataUser)
                setCards(dataCards);
            })
            .catch(error => `Ошибка при отрисовке карточек ${error}`)
    }, []);

    function handleUpdateAvatar(dataAvatar) {
        api.editUserAvatar(dataAvatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => `Ошибка при редактировании аватара ${err}`)
    };

    function handleUpdateUser(dataUserInfo) {
        api.editUserInfo(dataUserInfo)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => `Ошибка при редактировании профиля ${err}`)
    };

    function handleAddPlace(dataCard) {
        api.addNewCard(dataCard)
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch((err) => `Ошибка при добавлении карточки ${err}`)
    }


    function handleDeleteSubmit(event) {
        event.preventDefault();
        api.deleteCard(deleteCardId)
            .then(() => {
                setCards(cards.filter(item => {
                    return item._id !== deleteCardId
                }))
                closeAllPopups();
            })
            .catch((err) => `Ошибка при удалении карточки ${err}`)
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onDeleteClick={handleDeleteCardClick}
                    cards={cards} />

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                />

                <PopupWithForm
                    title='Вы уверены?'
                    name='delete-card'
                    isOpen={isDeletePopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleDeleteSubmit}
                    buttonText='Да'>
                </PopupWithForm>
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    )
};

export default App;