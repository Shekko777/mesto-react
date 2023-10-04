export default function Card({card, onCardClick}) {
  return (
    <li className="elements__item">
      <button className="elements__button-delete" type="button"></button>
      <img className="elements__img" src={card?.link} alt={card?.name} onClick={_ => onCardClick(card)} />
      <div className="elements__info">
        <h2 className="elements__title">{card?.name}</h2>
        <div className="elements__wrapper">
          <button className="elements__like" type="button"></button>
          <p className="elements__counter">{card?.likes.length}</p>
        </div>
      </div>
    </li>
  )
}