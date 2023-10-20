import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";  

function PopupAddNewCard({name, title, buttonText, isOpen, isClose, onAddPlace, closeTouchOverlay}) {
  const [cardLink, setCardLink] = React.useState('');
  const [cardName, setCardName] = React.useState('');

  const [nameDirty, setNameDirty] = React.useState(false);
  const [linkDirty, setLinkDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState('Введите название картинки');
  const [linkError, setLinkError] = React.useState('Вставьте URL картинки');
  const [formValid, setFormValid] = React.useState(false);

  /*
  Хук сбрасывания формы до дефолта, когда открывается попап.
  Чтобы сбросить текста, ошибки, и заблочить кнопку
  */
  useEffect(() => {
    setCardName('')
    setCardLink('')
    setNameDirty(false)
    setLinkDirty(false)
    setNameError('Введите название картинки')
    setLinkError('Вставьте URL картинки')
    setFormValid(false)
  }, [isOpen])

  /*
  Хук для определения валидности формы, когда пользователь ввёл/вводит данные.
  Если 1 из 2 ошибок содержит текст (Тоесть true), то форма невалидна, кнопка заблокируется.
  */
  useEffect(() => {
    if(linkError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [linkError, nameError])

  /*
  Определяет, ушел ли пользователь с инпута.
  Если инпут не заполнен, и пользователь ушел с него, то всплывет ошибка.
  */ 
  function blurInput(evt) {
    switch(evt.target.name) {
      case 'name':
        setNameDirty(true)
        break;
      case 'link':
        setLinkDirty(true)
        break
    }
  }

  /*Управления инпута ссылки*/
  function handleChangeValueLink(evt) {
    setCardLink(evt.target.value);
    /*
    re - переменная регулярного выражения
    Если в инпуте не будет символов из re, или она не прошла по длине строки
    то инпут невалиден 
    */
    const re = /(https?:\/\/.*\.(?:png|jpg))/i;
    if(!re.test(String(evt.target.value).toLowerCase()) && evt.target.value.length >= 1) {
      setLinkError('Некорректная ссылка')
      setLinkDirty(true)
    } else if (evt.target.value.length == 0) {
      setLinkError('Вставьте URL картинки')
    } else {
      setLinkError('');
    }
  }

  /*Управления инпута названия*/
  function handleChangeValueName(evt) {
    setCardName(evt.target.value);
    /*
    Если инпут меньше положенного
    то он невалиден 
    */
    if(evt.target.value.length > 0 && evt.target.value.length < 3) {
      setNameError('Слишком короткое название')
      setNameDirty(true)
    } else if (evt.target.value.length == 0) {
      setNameError('Введите название картинки')
    } else {
      setNameError('')
    }
  }

  /*Отправка формы*/ 
  function handleSubmit(evt) {
    evt.preventDefault();

    /*
    Передаём через деструктуризацию линк и нейм, 
    которыми функция пользуется для отправки fetch запроса
      name: стейт переменная имени
      link: стейт переменная ссылки
    */
    onAddPlace({
      link: cardLink,
      name: cardName,
    })
  }

  return (
  <PopupWithForm closeTouchOverlay={closeTouchOverlay} name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose} onSubmit={handleSubmit} buttonStatus={formValid}>
    <input
      onBlur={evt => blurInput(evt)}
      className="popup__input popup__input_add_name"
      name="name"
      value={cardName}
      onChange={handleChangeValueName}
      type="text"
      placeholder="Название"
      autoComplete="off"
      minLength="2"
      maxLength="30"
      required
      />
      <span className={`popup__error ${(nameError && nameDirty) && 'popup__error_visible'}`} id="name-error">
        {nameError}
      </span>
      <input
        onBlur={evt => blurInput(evt)}
        className="popup__input popup__input_add_link"
        name="link"
        value={cardLink}
        onChange={handleChangeValueLink}
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      /> 
      <span className={`popup__error ${(linkError && linkDirty) && 'popup__error_visible'}`} id="link-error">
        {linkError}
      </span>
  </PopupWithForm>
  )
}

export default PopupAddNewCard;