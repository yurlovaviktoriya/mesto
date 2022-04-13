class Api {
  /**
   * Создаёт экземпляр API для взаимодействия с сервером
   * @param {string} options - Объект с настройками для взаимодействия с сервером
   */
  constructor(options) {
    this._options = options;
  }


  /**
   * Метод проверяет ответ от сервера
   * @param {Promise} res - Ответ от сервера
   * @returns {Promise}
   * @private
   */
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  /**
   * Метод, осуществляющий GET-запрос на сервер, чтобы получить данные для отрисовки карточек места
   * @returns {Promise} - Данные о местах, добавленных пользователями, или ошибка
   */
  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {headers: this._options.headers})
      .then(this._checkResponse)
  }


  /**
   * Метод, осуществляющий GET-запрос на сервер, чтобы получить данные о текущем пользователе
   * @returns {Promise} - Данные о текущем пользователе (имя, род занятий, аватар и техническая информация) или ошибка
   */
  getProfileInfo() {
    return fetch(`${this._options.baseUrl}/users/me `, {headers: this._options.headers})
      .then(this._checkResponse)
  }


  /**
   * Метод, осуществляющий PATCH-запрос на сервер, чтобы обновить данные о текущем пользователе
   * @param name {string} - Имя пользователя
   * @param job {string} - Род занятий пользователя
   * @returns {Promise} - Обновлённые данные о пользователе или ошибка
   */
  editProfileInfo({ name, job} ) {
    return fetch (`${this._options.baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify({
          name: name,
          about: job
        })
      }
    )
      .then(this._checkResponse)
  }


  /**
   * Метод, осуществляющий PATCH-запрос на сервер, чтобы обновить аватар текущего пользователя
   * @param {string} avatar - Ссылка на аватар пользователя
   * @returns {Promise} - Обновлённы данные об аватаре или ошибка
   */
  updateAvatar({ avatar }) {
    return fetch (`${this._options.baseUrl}/users/me/avatar `,
      {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify({
          avatar: avatar
        })
      }
    )
      .then(this._checkResponse)
  }


  /**
   * Метод, осуществляющий POST-запрос на сервер, чтобы сохранить данные о новом месте
   * @param {string} name - Наименование места
   * @param {string} link - Ссылка на изображение места
   * @returns {Promise} - Данные о месте или ошибка
   */
  addCard( {name, link} ) {
    return fetch (`${this._options.baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._options.headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }
    )
      .then(this._checkResponse)
  }


  /**
   * Метод, осуществляющий DELETE-запрос на сервер, чтобы удалить данные о месте
   * @param {string} cardId - Идентификатор места
   * @returns {Promise} - Сообщение об удалении места или ошибка
   */
  deleteCard(cardId) {
    return fetch (`${this._options.baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._options.headers
      }
    )
      .then(this._checkResponse)
  }


  /**
   * Метод, осуществляющий PUT-запрос на сервер, чтобы поставить лайк карточке места
   * @param {string} cardId - Идентификатор места
   * @returns {Promise} - Обновлённые данные по лайкам карточки или ошибка
   */
  likeCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`,
      {
        method: 'PUT',
        headers: this._options.headers
      })
      .then(this._checkResponse)
  }


  /**
   * Метод, осуществляющий DELETE-запрос на сервер, чтобы удалить лайк у карточки места
   * @param {string} cardId - Идентификатор места
   * @returns {Promise} - Обновлённые данные по лайкам карточки или ошибка
   */
  removeLikeCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`,
      {
        method: 'DELETE',
        headers: this._options.headers
      })
      .then(this._checkResponse)
  }
}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'fb780614-8b91-4a08-a132-9155c120d0f3',
    'Content-Type': 'application/json'
  }
});
