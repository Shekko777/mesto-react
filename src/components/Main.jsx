import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import avatarPreload from "../images/profile/avatar-preload.jpg";
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onConfirmDelete}) {
  const currentUserContext = React.useContext(CurrentUserContext);
  const cardsContext = React.useContext(CardsContext);

  return (
    <main className="main">
      {/* PROFILE */}
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__info">
            <button
              className="profile__avatar-button"
              type="button"
              onClick={onEditAvatar}
            >
              <img
                className="profile__avatar"
                src={currentUserContext.avatar ? `${currentUserContext.avatar}` : avatarPreload}
                alt="Аватар профиля"
              />
            </button>
            <div className="profile__description">
              <h1 className="profile__title">{currentUserContext.name}</h1>
              <p className="profile__subtitle">{currentUserContext.about}</p>
              <button
                className="profile__edit-btn"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
          </div>
          <button
            className="profile__add-btn"
            type="button"
            onClick={onAddPlace}
          ></button>
        </div>
      </section>

      {/*Elements */}
      <section className="elements" aria-label="Фотокарточки">
        <ul className="elements__list">
          {cardsContext.map(card => {
            return <Card key={card._id} onConfirmDelete={onConfirmDelete} handleLikeClick={onCardLike} onCardClick={onCardClick} card={card} />
        })}</ul>
      </section>
    </main>
  );
}

export default Main;

// handleDeleteButton={onCardDelete}