import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupEditAvatar({name, title, buttonText, isOpen, isClose, onUpdateAvatar, closeTouchOverlay}) {
  const [userAvatar, setUserAvatar] = React.useState('');

  const [linkDirty, setLinkDirty] = React.useState(false);
  const [linkError, setLinkError] = React.useState('Вставьте ссылку на аватар');
  const [formValid, setFormValid] = React.useState(false);

  /*
  Хук сбрасывания формы до дефолта, когда открывается попап.
  Чтобы сбросить текст, ошибку, и заблочить кнопку
  */
  useEffect(() => {
    setUserAvatar('')
    setLinkDirty(false)
    setLinkError('Вставьте ссылку на аватар')
    setFormValid(false)
  }, [isOpen])

  /*
  Хук для определения валидности формы, когда пользователь ввёл/вводит данные.
  Если инпут ссылки содержит текст (Тоесть true), то форма невалидна, кнопка заблокируется.
  */
  useEffect(() => {
    if(linkError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [linkError])

  /*
  Определяет, ушел ли пользователь с инпута.
  Если инпут не заполнен, и пользователь ушел с него, то всплывет ошибка.
  */ 
  function blurInput() {
    setLinkDirty(true);
  }

  /*Управления инпута ссылки*/
  function onChangeUserAvatar(evt) {
    setUserAvatar(evt.target.value);
    /*
    re - переменная регулярного выражения
    Если в инпуте не будет символов из re, или она не прошла по длине строки
    то инпут невалиден 
    */
    const re = /(https?:\/\/.*\.(?:png|jpg))/i;
    if(!re.test(String(evt.target.value)) && evt.target.value.length >= 1) {
      setLinkError('Некорректная ссылка аватара');
      setLinkDirty(true)
    } else if (evt.target.value.length < 1) {
      setLinkError('Вставьте ссылку на аватар')
    } else {
      setLinkError('')
    }
  }

 
  /*Отправка формы*/ 
  function handleSubmit(evt) {
    evt.preventDefault();
    /*
    Передаём через деструктуризацию линк, 
    которым функция пользуется для отправки fetch запроса
      link: стейт переменная ссылки аватара
    */
    onUpdateAvatar({
      avatar: userAvatar,
    })
    setUserAvatar('');
  }

  return (
    <PopupWithForm closeTouchOverlay={closeTouchOverlay} name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose} onSubmit={handleSubmit} buttonStatus={formValid}>
      <input
          onBlur={blurInput}
          className={`popup__input popup__input_${name}`}
          name="avatar"
          value={userAvatar}
          onChange={onChangeUserAvatar}
          type="url"
          placeholder="URL"
          autoComplete="off"
          required
        />
        <span className={`popup__error ${(linkError && linkDirty) && 'popup__error_visible'}`} id="avatar-error">{linkError}</span>
    </PopupWithForm>
  )
}