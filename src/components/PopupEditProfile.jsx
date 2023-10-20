import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function PopupEditProfile({name, title, buttonText, isOpen, isClose, onUpdateUser, closeTouchOverlay}) {
  const currentUserContext = React.useContext(CurrentUserContext);
  const [userName, setUserName] = React.useState(currentUserContext.name);
  const [userDescription, setUserDescription] = React.useState(currentUserContext.about);
  
  const [nameDirty, setNameDirty] = React.useState(false);
  const [aboutDirty, setAboutDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [aboutError, setAboutError] = React.useState('');
  const [formValid, setFormValid] = React.useState(false);

  React.useEffect(() => {
    setUserName(currentUserContext.name);
    setUserDescription(currentUserContext.about);
    setNameDirty(false)
    setAboutDirty(false)
    setNameError('')
    setAboutError('')
    setFormValid(false)
  }, [isOpen])

  React.useEffect(() => {
    if(nameError || aboutError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [userName, userDescription])

  React.useEffect(() => {
    setUserName(currentUserContext.name);
    setUserDescription(currentUserContext.about);
  }, [currentUserContext]); 

  function handleSubmit(e) {
  e.preventDefault();

  onUpdateUser({
    name: userName,
    about: userDescription,
  });
} 

  function handleChangeUserName(e) {
    setUserName(e.target.value);

    if(e.target.value.length > 0 && e.target.value.length < 3) {
      setNameError('Короткое имя. Нужно не меньше 3 символов');
      setNameDirty(true);
    } else if ( e.target.value.length == 0) {
      setNameError('Вы пропустили поле')
    } else {
      setNameError('');
    }
  }

  function handleChangeUserDescription(e) {
    setUserDescription(e.target.value);

    if(e.target.value.length > 0 && e.target.value.length < 3) {
      setAboutError('Слишком короткое описание. Нужно не меньше 3 символов');
      setAboutDirty(true);
    } else if ( e.target.value.length == 0) {
      setAboutError('Вы пропустили поле')
    } else {
      setAboutError('');
    }
  }
  
  return (
    <PopupWithForm closeTouchOverlay={closeTouchOverlay} name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose} onSubmit={handleSubmit} buttonStatus={formValid}>
      <input
          className={`popup__input popup__input_place_title`}
          name="user"
          value={userName}
          onChange={handleChangeUserName}
          type="text"
          placeholder="Введите ваше имя"
          autoComplete="off"
          minLength="2"
          maxLength="20"
          required
        />
        <span className={`popup__error ${(nameError && nameDirty) && 'popup__error_visible'}`} id="user-error">
          {nameError}
        </span>
        <input
          className="popup__input popup__input_place_subtitle"
          name="about"
          value={userDescription}
          onChange={handleChangeUserDescription}
          type="text"
          placeholder="Напишите о себе"
          autoComplete="off"
          minLength="2"
          maxLength="200"
          required
        />
        <span className={`popup__error ${(aboutError && aboutDirty) && 'popup__error_visible'}`} id="about-error">
          {aboutError}
        </span>
    </PopupWithForm>
  )
}