import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupEditAvatar({name, title, buttonText, isOpen, isClose, onUpdateAvatar, closeTouchOverlay}) {
  const [userAvatar, setUserAvatar] = React.useState('');

  const [linkDirty, setLinkDirty] = React.useState(false);
  const [linkError, setLinkError] = React.useState('Вставьте ссылку на аватар');
  const [formValid, setFormValid] = React.useState(false);

  useEffect(() => {
    setUserAvatar('')
    setLinkDirty(false)
    setLinkError('Вставьте ссылку на аватар')
    setFormValid(false)
  }, [isOpen])

  useEffect(() => {
    if(linkError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [linkError])

  function onChangeUserAvatar(e) {
    setUserAvatar(e.target.value);

    const re = /(https?:\/\/.*\.(?:png|jpg))/i;
    if(!re.test(String(e.target.value)) && e.target.value.length >= 1) {
      setLinkError('Некорректная ссылка аватара');
      setLinkDirty(true)
    } else if (e.target.value.length < 1) {
      setLinkError('Вставьте ссылку на аватар')
    } else {
      setLinkError('')
    }
  }

  function blurInput() {
    setLinkDirty(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
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