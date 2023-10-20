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
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function App() {
  /* Стейт разных переменных */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopup, setIsConfirmPopup] = React.useState(false);
  const [isImagePopup, setIsImagePopup] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

   /* Стейт информации о пользователе */
   const [currentUser, setCurrentUser ] = React.useState({
    about: '',
    name: '',
    id: '',
    avatar: '',
   });
 

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
  function handleConfirmPopup(card) {
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

  // Функция закрытия на оверлей 
  function handleClosePopupTouchOverlay(evt) {
    if(evt.target === evt.currentTarget) {
      handleCloseAllPopup();
    }
  }

  /* Функция при клике на карточку */
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(!isImagePopup);
  }

  // API лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser.id);

    api.changeLikeCardStatus(card._id, isLiked).then(newCard => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c));
    }).catch(err => console.log(`Ошибка лайка: ${err}`))
  }

  // API удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(_ => {
      setCards(state => state.filter(c => c._id !== card._id))
    })
  }

  // API добавления карточки
  function handleAddPlaceSubmit({link, name}) {
    api.addNewCard(link, name).then(newCard => {
      setCards([newCard, ...cards]);
      handleCloseAllPopup();
    })
  }

  // API обновление юзера
  function handleUpdateUser({name, about}) {
    api.setNewUserInfo(name, about).then(dataUser => {
      setCurrentUser({
        ...currentUser,
        about: dataUser.about,
        name: dataUser.name,
      })
      handleCloseAllPopup();
    }).catch(err => console.log(`Oops: не удалось обновить данные пользователя ${err}`));
  }

  // API обновления аватара
  function handleUpdateAvatar({avatar}) {
    api.setNewAvatar(avatar).then(userAvatar => {
      setCurrentUser({
        ...currentUser,
        avatar: userAvatar.avatar,
      })
      handleCloseAllPopup();
    }).catch(err => console.log(`Oops: не удалось добавить карточку, ошибка ${err}`));
  }


  /* Срабатывание эффектов при загрузке страницы */
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
    .then(([dataUser, dataCards]) => {
      setCurrentUser({
        about: dataUser.about,
        name: dataUser.name,
        id: dataUser._id,
        avatar: dataUser.avatar, 
      });

      setCards(dataCards)
    }).catch(err => console.log(`Oops: Не удалось получить данные, ошибка: ${err}`))
  }, []);

  // Закрытие при ESC 
  React.useEffect(() => {
    if(isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopup) {
      function handleCloseAllPopupTouchESC(evt) {
        if(evt.key === 'Escape'){
          handleCloseAllPopup();
        }
      }
      document.addEventListener('keydown', handleCloseAllPopupTouchESC);


      return () => {
        document.removeEventListener('keydown', handleCloseAllPopupTouchESC);
      }
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopup])



  return (
    <>
      {/* <!-- HEADER --> */}

      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Header />

          {/* <!-- MAIN --> */}
          <Main onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          />

          {/*  FOOTER */}
          <Footer />

          {/* Попап редактирования профиля */}
          <PopupEditProfile closeTouchOverlay={handleClosePopupTouchOverlay} onUpdateUser={handleUpdateUser} name="type_edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} isClose={handleCloseAllPopup} />

          {/* Попап добавления карточек */}
          <PopupAddNewCard closeTouchOverlay={handleClosePopupTouchOverlay} onAddPlace={handleAddPlaceSubmit} name="type_add" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} isClose={handleCloseAllPopup}/>

          {/* Попап удаления */}
          <PopupWithConfirm closeTouchOverlay={handleClosePopupTouchOverlay} name="type_delete" title="Вы уверены?" buttonText='Да' isOpen={isConfirmPopup} isClose={handleCloseAllPopup}/>

          {/* Попап аватара */}
          <PopupEditAvatar closeTouchOverlay={handleClosePopupTouchOverlay} onUpdateAvatar={handleUpdateAvatar} name="tupe_avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} isClose={handleCloseAllPopup} />

          {/* Попап с картинкой */}
          <ImagePopup closeTouchOverlay={handleClosePopupTouchOverlay} card={selectedCard} isOpen={isImagePopup} isClose={handleCloseAllPopup} />
        </CardsContext.Provider> 
      </CurrentUserContext.Provider>
      
    </>
  );
}

export default App;

