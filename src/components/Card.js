export default class Card {
  /**
   * Создаёт экземпляр карточки места
   * @param {object} data - Объект с наименованием места и ссылкой на его изображение
   * @param {object} templateSelector - Селектор html-шаблона для карточки места
   * @param {object} handleCardClick - Функция, обрабатывающая клик по изображению на карточке места
   * @param {object} openPopupConfirmDelete - Функция, обрабатывающая клик по кнопке удаления карточки
   * @param {object} handleCardLike - Функция, обрабатывающая постановку лайка на карточке места
   * @param {object} handleRemoveCardLike - Функция, обрабатывающая удаление лайка на карточке места
   */
  constructor(data, templateSelector, handleCardClick, openPopupConfirmDelete, handleCardLike, handleRemoveCardLike) {
    this._id = data._id;
    this._owner = data.owner._id;
    this._placeTitle = data.name;
    this._imgUri = data.link;
    this._likes = data.likes;
    this._numLike = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupConfirmDelete = openPopupConfirmDelete;
    this._handleCardLike = handleCardLike;
    this._handleRemoveCardLike = handleRemoveCardLike;
  }


  /**
   * Метод достаёт разметку карточки места из html-шаблона
   * @returns {Node} - Объект карточки, не заполненный данными
   * @private
   */
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    if (!this._userIsCardOwner) {
      cardElement.querySelector('.card__btn-del').remove()
    }
    return cardElement;
  }


  /**
   * Метод запускает процесс удаления карточки места
   * @private
   */
  _deletePlace = () => {
    this._openPopupConfirmDelete(this._id, this._cardElement);
  }


  /**
   * Метод обрабатывает 'click' по кнопке лайка при его добавлении
   * @private
   */
  _addLike() {
    this._handleCardLike(this._id)
      .then((res) => {
      this._counterLike.textContent = res.likes.length;
      this._likeButton.classList.add('card__btn-like_active');
      this._userLikedCard = true;
      })
      .catch(err => {
        console.log(err);
      });
  }


   /**
   * Метод обрабатывает 'click' по кнопке лайка при его удалении
   * @private
   */
  _removeLike() {
    this._handleRemoveCardLike(this._id)
      .then(res => {
        if (res.likes.length === 0) {
          this._counterLike.textContent = '';
        } else {
          this._counterLike.textContent = res.likes.length;
        }
        this._likeButton.classList.remove('card__btn-like_active');
        this._userLikedCard = false;
      })
      .catch(err => {
        console.log(err);
      })
  }


  /**
   * Метод добавляет слушатели на карточку места для просмотра изображения, лайка и удаления
   * @private
   */
  _addCardListeners() {
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._placeTitle, this._imgUri);
    });

    this._likeButton.addEventListener('click', () => {
      if (this._userLikedCard) {
        this._removeLike();
      } else {
        this._addLike();
      }
    });

    if (this._userIsCardOwner) {
      this._deleteButton.addEventListener('click', this._deletePlace);
    }
  }


  /**
   * Метод проверяет, является ли пользователь собственником карточки
   * @param {string} userId - Идентификатор пользователя
   * @returns {boolean}
   * @private
   */
  _checkUserIsCardOwner(userId) {
    let userIsCardOwner = true;
    if (this._owner != userId) {
      userIsCardOwner = false;
    }
    return userIsCardOwner;
  }


  /**
   * Метод проверяет поставил ли пользователь лайк карточке
   * @param {string} userId - Идентификатор пользователя
   * @returns {boolean}
   * @private
   */
  _checkUserLikedCard(userId) {
    return this._likes.some(function(item) {
      return item._id === userId;
    });
  }


  /**
   * Метод создаёт объект карточки места для дальнейшего добавления в DOM
   * @returns {Node} - Объект карточки
   */
  generateCard(userId) {
    this._userIsCardOwner = this._checkUserIsCardOwner(userId);
    this._cardElement = this._getTemplate();

    this._cardImg = this._cardElement.querySelector('.card__img');
    this._likeButton = this._cardElement.querySelector('.card__btn-like');
    this._deleteButton = this._cardElement.querySelector('.card__btn-del');
    this._counterLike = this._cardElement.querySelector('.card__counter-like');

    this._cardElement.querySelector('.card__title').textContent = this._placeTitle;
    this._cardImg.src = this._imgUri;
    this._cardImg.alt = `Изображение места ${this._placeTitle}`;

    if (this._numLike > 0) {
      this._counterLike.textContent = this._numLike;
    }

    this._userLikedCard = this._checkUserLikedCard(userId);
    if (this._userLikedCard) {
      this._likeButton.classList.add('card__btn-like_active');
    }

    this._addCardListeners();

    return this._cardElement;
  }

}
