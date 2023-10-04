import avatarPreload from "../images/profile/avatar-preload.jpg";
import Card from './Card';

function Main({onEditAvatar, userAvatar, userName, userDescription, onEditProfile, onAddPlace, onCardClick, cards}) {
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
                src={userAvatar ? `${userAvatar}` : avatarPreload}
                alt="Аватар профиля"
              />
            </button>
            <div className="profile__description">
              <h1 className="profile__title">{userName}</h1>
              <p className="profile__subtitle">{userDescription}</p>
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
          {cards.map(card => {
            return <Card key={card._id} onCardClick={onCardClick} card={card} />
        })}</ul>
      </section>
    </main>
  );
}

export default Main;
