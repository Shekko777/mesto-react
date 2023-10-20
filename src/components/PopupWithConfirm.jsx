import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirm({name, title, buttonText, isOpen, isClose}) {
  return (
    <PopupWithForm name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose}/>

  )
}