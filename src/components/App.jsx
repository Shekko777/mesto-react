import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import PopupEditProfile from './PopupEditProfile';
import PopupAddNewCard from "./PopupAddNewCard";
import PopupWithConfirm from './PopupWithConfirm';
import PopupEditAvatar from './PopupEditAvatar';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import tooltipResolveImg from '../images/tooltip/resolve.png';
import tooltipRejectImg from '../images/tooltip/reject.png';

function App() {
  const navigate = useNavigate();

  /* Стейт разных переменных */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); // Попап редактирования профиля
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); // Попап добавления места
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); // Попап аватара 
  const [isConfirmPopup, setIsConfirmPopup] = React.useState(false); // Попап подтверждения 
  const [isImagePopup, setIsImagePopup] = React.useState(false); // Попап картинки
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false); // Состояние открытия и закрытия тултипа
  const [tooltipInfo, setTooltipInfo] = React.useState({
    img: null,
    text: '',
  }) // Информация в тултипе
  const [cards, setCards] = React.useState([]); // Массив карточек для отображения
  const [selectedCard, setSelectedCard] = React.useState(null); // Карточка для открытия попапа/удаления
  const [loggedIn, setLoggedIn] = React.useState(false) // Проверка залогиненности пользователя
  const [email, setEmail] = React.useState(''); // Почта юзера для отображения в хедере


  // Функция авторизации
  const handleSubmitLogin = ({email, password}) => {
    auth.signIn(email, password).then(res => {
      if(res.token) {
        localStorage.setItem('token', res.token);
        setEmail(email);
        getContent();
      }
    }).catch(err => {
      console.log(`Ошибка при авторизации: ${err}`)
      setTooltipInfo({
        img: tooltipRejectImg,
        text: 'Неверный Email или пароль! Повторите попытку.',
      })
      setIsTooltipPopupOpen(true);
    })
  }

  // Функция регистрации
  const handleSubmitRegister = ({email, password}) => {
    auth.signUp(email, password).then(res => {
      if(res.statusCode !== 400) {
        setTooltipInfo({
          img: tooltipResolveImg,
          text: 'Вы успешно зарегистрировались!',
        })
        setIsTooltipPopupOpen(true);
        navigate('/sign-in', {replace: true});
      }
    }).catch(err => {
      console.log(`Ошибка при регистрации: ${err}`)
      setTooltipInfo({
        img: tooltipRejectImg,
        text: 'Что-то пошло не так! Попробуйте ещё раз.',
      })
      setIsTooltipPopupOpen(true);
    })
  }

  // Функция выхода из профиля 
  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  // Функция получения карточек и перехода на главную страницу
  const getContent = () => {
    const token = localStorage.getItem('token')
    auth.getContent(token).then(res => {
      console.log(res.data._id)
      navigate('/', {replace: true});
      setLoggedIn(true);
      setEmail(res.data.email);
    }).catch(err => console.log(`Вы не зарегистрированны: ${err}`))
  }

   /*
    Стейт информации о пользователе.
    Делаю свои кастомные ключи на основе полученных.
   */
   const [currentUser, setCurrentUser ] = React.useState({
    about: '',
    name: '',
    id: '',
    avatar: '',
   });
 

   /* -------- ФУНКЦИИ -------- */
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

  /* 
  Функция открытия попапа подтверждения действий.
  Получает: 
    1) Сам попап действий
    2) Стейт, который нужно обновить
  */
  function handleConfirmPopup(card) {
    setIsConfirmPopup(true);
    setSelectedCard(card);
    
  }
  /*
  Отправка попапа подтверждения. 
  Получает 3 функции:
    1) Сбрасывает дефолт
    2) Функция обработчик
    3) После срабатывания закрывает попапы 
  */
  function handleSubmitConfirm(evt) {
    evt.preventDefault();
    handleCardDelete(selectedCard);
    handleCloseAllPopup();
  }

  /* Функция закрытия попапов и сброса стейтов */
  function handleCloseAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
    setIsConfirmPopup(false);
    setIsTooltipPopupOpen(false)
    setSelectedCard(null);
  }

  /* Функция закрытия на оверлей */  
  function handleClosePopupTouchOverlay(evt) {
    if(evt.target === evt.currentTarget) {
      handleCloseAllPopup();
    }
  }
  
  /* Функция открытия картинки в попапе */
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
    }).catch(err => console.log(`Oops: не удалось удалить, ошибка ${err}`))
  }

  // API добавления карточки
  function handleAddPlaceSubmit({link, name}) {
    api.addNewCard(link, name).then(newCard => {
      setCards([newCard, ...cards]);
      handleCloseAllPopup();
    }).catch(err => console.log(`Oops: не удалось добавить карточку, ошибка ${err}`))
  }

  // API обновление информации о пользователе
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

  /* -------- МОНИТРОВАНИЕ ЕФФЕКТОВ -------- */
  /* 
  Срабатывание эффектов при загрузке страницы
    1) Загружается информацию о пользователе в стейт
    2) Загружается массив карточек в стейт для их начального рендера 
  */
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
    }).catch(err => console.log(`Oops: Не удалось получить данные, ошибка: ${err}`));
    getContent();
  }, []);

  /*
  Монтирование еффекта
  Если изменяется 1 из 5 попапов (открываются)
  то функция создаст функцию закрытия по ESC, и навесит на body
  после отрабатывания с body удалиться событие
  */
  React.useEffect(() => {
    if(isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopup || isConfirmPopup || isTooltipPopupOpen) {
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
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopup, isConfirmPopup, isTooltipPopupOpen])

  return (
    <>
      {/* <!-- HEADER --> */}

      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>

          <Routes>

            <Route path="/" element={<ProtectedRoute component={Main} loggedIn={loggedIn} onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onConfirmDelete={handleConfirmPopup}
              email={email}
              onSignOut={handleSignOut} />} />

            <Route path="/sign-up" element={
              <Register labelText="Регистрация" 
              buttonText="Зарегистрироваться" 
              handleRegister={handleSubmitRegister}
              />
            } />

            <Route path="/sign-in" element={
              <Login labelText="Вход"
              buttonText="Войти"
              onLogin={handleSubmitLogin}
              />
            } />


            <Route path="*" element={<Navigate to='/' replace />} />
          </Routes>

          {/* Попап редактирования профиля */}
          <PopupEditProfile closeTouchOverlay={handleClosePopupTouchOverlay} onUpdateUser={handleUpdateUser} name="type_edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} isClose={handleCloseAllPopup} />

          {/* Попап добавления карточек */}
          <PopupAddNewCard closeTouchOverlay={handleClosePopupTouchOverlay} onAddPlace={handleAddPlaceSubmit} name="type_add" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} isClose={handleCloseAllPopup}/>

          {/* Попап подтверждения */}
          <PopupWithConfirm onSubmit={handleSubmitConfirm} closeTouchOverlay={handleClosePopupTouchOverlay} name="type_delete" title="Вы уверены?" buttonText='Да' isOpen={isConfirmPopup} isClose={handleCloseAllPopup}/>

          {/* Попап аватара */}
          <PopupEditAvatar closeTouchOverlay={handleClosePopupTouchOverlay} onUpdateAvatar={handleUpdateAvatar} name="tupe_avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} isClose={handleCloseAllPopup} />

          {/* Попап с картинкой */}
          <ImagePopup closeTouchOverlay={handleClosePopupTouchOverlay} card={selectedCard} isOpen={isImagePopup} isClose={handleCloseAllPopup} />

          {/* InfoTooltip */}
          <InfoTooltip closeTouchOverlay={handleClosePopupTouchOverlay} img={tooltipInfo.img} text={tooltipInfo.text} isOpen={isTooltipPopupOpen} isClose={handleCloseAllPopup} />

        </CardsContext.Provider> 
      </CurrentUserContext.Provider>
      
    </>
  );
}

export default App;

