import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupEditProfile from './PopupEditProfile';
import PopupAddNewCard from "./PopupAddNewCard";
import PopupWithConfirm from './PopupWithConfirm';
import PopupEditAvatar from './PopupEditAvatar';
import api from '../utils/api';

function App() {
  /* Стейт разных переменных */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopup, setIsConfirmPopup] = React.useState(false);
  const [isImagePopup, setIsImagePopup] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

   /* Стейт переменных информации о пользователе */
   const [userName, setUserName] = React.useState('');
   const [userDescription, setUserDescription] = React.useState('');
   const [userAvatar, setUserAvatar] = React.useState('');
 

  /* Функция открытия попапа аватара */
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  /*Функиця открытия попапа профиля*/
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  /*Функция открытия попапа добавления карточки*/
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  /* Функция открытия попапа подтверждения действий*/
  function handleConfirmPopup() {
    setIsConfirmPopup(true);
  }

  /* Функция закрытия попапов и сброса стейтов */
  function handleCloseAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
    setIsConfirmPopup(false);
    setSelectedCard(null);
  }

  /* Функция при клике на карточку */
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(!isImagePopup);
  }

  /* Срабатывание эффектов при загрузке страницы */
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
    .then(([dataUser, dataCards]) => {
      setUserName(dataUser.name);
      setUserDescription(dataUser.about);
      setUserAvatar(dataUser.avatar);

      setCards(dataCards)
    }).catch(err => console.log(`Oops: Не удалось получить данные, ошибка: ${err}`))
  }, []);

  return (
    <>
      {/* <!-- HEADER --> */}
      <Header />

      {/* <!-- MAIN --> */}
      <Main onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} 
      onEditAvatar={handleEditAvatarClick} 
      userName={userName} 
      userDescription={userDescription} 
      userAvatar={userAvatar} 
      cards={cards}
      onCardClick={handleCardClick}
      />

      {/*  FOOTER */}
      <Footer />

      {/* Попап редактирования профиля */}
      <PopupEditProfile name="type_edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} isClose={handleCloseAllPopup} />

      {/* Попап добавления карточек */}
      <PopupAddNewCard name="type_add" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} isClose={handleCloseAllPopup}/>
    
      {/* Попап картинок */}
      <ImagePopup />

      {/* Попап удаления */}
      <PopupWithConfirm name="type_delete" title="Вы уверены?" buttonText='Да' isOpen={isConfirmPopup} isClose={handleCloseAllPopup}/>

      {/* Попап аватара */}
      <PopupEditAvatar name="tupe_avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} isClose={handleCloseAllPopup} />

      {/* Попап с картинкой */}
      <ImagePopup card={selectedCard} isOpen={isImagePopup} isClose={handleCloseAllPopup} />
    </>
  );
}

export default App;

