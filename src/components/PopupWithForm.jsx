function PopupWithForm({name, title, buttonText, isOpen, isClose, children}) {
  return (
    <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={isClose}></button>
          <form
            className={`popup__form popup__form_${name}`}
            action="#"
            noValidate
          >
            <fieldset className="popup__fieldset">
              <label className="popup__label">{title}</label>
              {children}
            </fieldset>
            <button
              className={`popup__save-btn popup__save-btn_${name}`}
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