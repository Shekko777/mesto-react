function PopupWithForm({name, title, buttonText, isOpen, isClose, onSubmit, children, buttonStatus, closeTouchOverlay}) {
  return (
    <div onClick={evt => closeTouchOverlay(evt)} className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={isClose}></button>
          <form
            className={`popup__form popup__form_${name}`}
            action="#"
            noValidate
            onSubmit={onSubmit}
          >
            <fieldset className="popup__fieldset">
              <label className="popup__label">{title}</label>
              {children}
            </fieldset>
            <button
              disabled={!buttonStatus}
              className={`popup__save-btn popup__save-btn_${name} ${!buttonStatus && 'popup__save-btn_disabled'}`}
              type="submit"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    );
}

export default PopupWithForm;