import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirm({name, title, buttonText, isOpen, isClose, onSubmit, closeTouchOverlay}) {
  return (
    <PopupWithForm closeTouchOverlay={closeTouchOverlay} onSubmit={onSubmit} name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose} buttonStatus={true}/>

  )
}