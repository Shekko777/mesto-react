import PopupWithForm from "./PopupWithForm";  

function PopupAddNewCard({name, title, buttonText, isOpen, isClose}) {
  return (
  <PopupWithForm name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose}>
    <input
      className="popup__input popup__input_add_name"
      name="name"
      defaultValue=""
      type="text"
      placeholder="Название"
      autoComplete="off"
      minLength="2"
      maxLength="30"
      required
      />
      <span className="popup__error" id="name-error">
        Вы пропустили это поле.
      </span>
      <input
        className="popup__input popup__input_add_link"
        name="link"
        defaultValue=""
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className="popup__error" id="link-error">
        Введите адрес сайта.
      </span>
  </PopupWithForm>
  )
}

export default PopupAddNewCard;