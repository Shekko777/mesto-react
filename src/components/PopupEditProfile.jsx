import PopupWithForm from './PopupWithForm';

export default function PopupEditProfile({name, title, buttonText, isOpen, isClose}) {
  return (
    <PopupWithForm name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose}>
      <input
          className={`popup__input popup__input_place_title`}
          name="user"
          defaultValue=""
          type="text"
          placeholder="Введите ваше имя"
          autoComplete="off"
          minLength="2"
          maxLength="20"
          required
        />
        <span className="popup__error" id="user-error">
          Вы пропустили это поле.
        </span>
        <input
          className="popup__input popup__input_place_subtitle"
          name="about"
          defaultValue=""
          type="text"
          placeholder="Напишите о себе"
          autoComplete="off"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error" id="about-error">
          Вы пропустили это поле.
        </span>
    </PopupWithForm>
  )
}