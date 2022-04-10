export default class Card {
  /**
   * Создаёт экземпляр карточки места
   * @param {object} data - Объект с наименованием места и ссылкой на его изображение
   * @param {object} templateSelector - Селектор html-шаблона для карточки места
   * @param {object} handleCardClick - Функция, обрабатывающая клик по изображению на карточке места
   */
  constructor(data, templateSelector, handleCardClick, createPopupCardDelete, handleCardLike, handleRemoveCardLike) {
    this._id = data._id;
    this._owner = data.owner._id;
    this._placeTitle = data.name;
    this._imgUri = data.link;
    this._likes = data.likes;
    this._numLike = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._createPopupCardDelete = createPopupCardDelete;
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
   * Метод запускает процесс добавления или снятия лайка у карточки места
   * @private
   */
  _likePlace = () => {
    if (this._likeButton.classList.contains('card__btn-like_active')) {
      this._handleRemoveCardLike(this._id, this._counterLike);
    } else {
      this._handleCardLike(this._id, this._counterLike);
    }
    this._likeButton.classList.toggle('card__btn-like_active');
  }


  /**
   * Метод запускает процесс удаления карточки места
   * @private
   */
  _deletePlace = () => {
    this._createPopupCardDelete(this._id, this._cardElement);
  }


  /**
   * Метод добавляет слушатели на карточку места для просмотра изображения, лайка и удаления
   * @private
   */
  _addCardListeners() {
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._placeTitle, this._imgUri);
    });
    this._likeButton.addEventListener('click', this._likePlace);
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
  _checkUserLikesCard(userId) {
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

    this._addCardListeners();

    this._cardElement.querySelector('.card__title').textContent = this._placeTitle;
    this._cardImg.src = this._imgUri;
    this._cardImg.alt = `Изображение места ${this._placeTitle}`;

    if (this._numLike > 0) {
      this._counterLike.textContent = this._numLike;
    }

    const userLikeCard = this._checkUserLikesCard(userId);
    if (userLikeCard) {
      this._likeButton.classList.add('card__btn-like_active');
    }

    return this._cardElement;
  }
}
