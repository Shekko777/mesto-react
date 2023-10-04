import PopupWithForm from "./PopupWithForm";

export default function PopupEditAvatar({name, title, buttonText, isOpen, isClose}) {
  return (
    <PopupWithForm name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose}>
      <input
          className={`popup__input popup__input_${name}`}
          name="avatar"
          defaultValue=""
          type="url"
          placeholder="URL"
          autoComplete="off"
          required
        />
        <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
  )
}