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

  useEffect(() => {
    setCardName('')
    setCardLink('')
    setNameDirty(false)
    setLinkDirty(false)
    setNameError('Введите название картинки')
    setLinkError('Вставьте URL картинки')
    setFormValid(false)
  }, [isOpen])

  useEffect(() => {
    if(linkError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [linkError, nameError])

  function blurInput(e) {
    switch(e.target.name) {
      case 'name':
        setNameDirty(true)
        break;
      case 'link':
        setLinkDirty(true)
        break
    }
  }

  function handleChangeValueLink(e) {
    setCardLink(e.target.value);

    const re = /(https?:\/\/.*\.(?:png|jpg))/i;
    if(!re.test(String(e.target.value).toLowerCase()) && e.target.value.length >= 1) {
      setLinkError('Некорректная ссылка')
      setLinkDirty(true)
    } else if (e.target.value.length == 0) {
      setLinkError('Вставьте URL картинки')
    } else {
      setLinkError('');
    }
  }

  function handleChangeValueName(e) {
    setCardName(e.target.value);

    if(e.target.value.length > 0 && e.target.value.length < 3) {
      setNameError('Слишком короткое название')
      setNameDirty(true)
    } else if (e.target.value.length == 0) {
      setNameError('Введите название картинки')
    } else {
      setNameError('')
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      link: cardLink,
      name: cardName,
    })
  }

  return (
  <PopupWithForm closeTouchOverlay={closeTouchOverlay} name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose} onSubmit={handleSubmit} buttonStatus={formValid}>
    <input
      onBlur={e => blurInput(e)}
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
        onBlur={e => blurInput(e)}
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