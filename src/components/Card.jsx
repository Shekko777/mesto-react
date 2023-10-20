import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function Card({card, onCardClick, handleLikeClick, handleButtonDelete}) {
  // Подписка на котекст (пока что бесплатно)
  const currentUserContext = React.useContext(CurrentUserContext)

  // Переменные состояний
  const isOwn = card.owner._id === currentUserContext.id;
  const isLiked = card.likes.some(like => like._id === currentUserContext.id);
  const cardLikeButtonClassName = `
    elements__like ${isLiked && 'elements__like_active'}
  `
  return (
    <li className="elements__item">
      {isOwn && <button className="elements__button-delete" type="button" onClick={_ => handleButtonDelete(card)} />}
      <img className="elements__img" src={card?.link} alt={card?.name} onClick={_ => onCardClick(card)} />
      <div className="elements__info">
        <h2 className="elements__title">{card?.name}</h2>
        <div className="elements__wrapper">
          <button className={cardLikeButtonClassName} type="button" onClick={_ => handleLikeClick(card)}></button>
          <p className="elements__counter">{card?.likes.length}</p>
        </div>
      </div>
    </li>
  )
}