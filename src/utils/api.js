// Класс API для работы с сервером.
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // Функция проверки ответа от сервера.
  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(console.log(`Oops: ${res.status}`));
  }

  // Получить карточки.
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResponce);
  }

  // Получить информацию о пользователе с сервера.
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResponce);
  }

  // Изменить информацию о пользователе на сервере.
  setNewUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponce);
  }

  // Добавить новую карточку на сервер.
  addNewCard(link, name) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: link,
        name: name,
      }),
    }).then(this._getResponce);
  }

  // Удалить карточку с сервера.
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponce);
  }

  // Смена аватара.
  setNewAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${newAvatar}`,
      }),
    }).then(this._getResponce);
  }

  // Лайк карточки.
  likeCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponce);
  }

  // Не лайк карточки.
  unLikeCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponce);
  }
}

const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    "Content-Type": "application/json",
    authorization: "a4c45c7f-c893-4f18-9f88-b5a255df5416",
  },
};

const api = new Api(apiConfig);

export default api;
