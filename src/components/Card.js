export default class Card {
  /**
   * Создаёт экземпляр карточки места
   * @param {object} data - Объект с наименованием места и ссылкой на его изображение
   * @param {object} templateSelector - Селектор html-шаблона для карточки места
   * @param {object} handleCardClick - Функция, обрабатывающая клик по изображению на карточке места
   */
  constructor(data, templateSelector, handleCardClick) {
    this._placeTitle = data.name;
    this._imgUri = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }


  /**
   * Метод достаёт разметку карточки места из html-шаблона
   * @returns {Node} - Объект карточки, не заполненный данными
   * @private
   */
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }


  /**
   * Метод добавляет лайк карточке места
   * @private
   */
  _likePlace = () => {
    this._likeButton.classList.toggle('card__btn-like_active');
  }


  /**
   * Метод удаляет карточку места
   * @private
   */
  _deletePlace = () => {
    this._cardElement.remove();
    this._cardElement = null;
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
    this._deleteButton.addEventListener('click', this._deletePlace);
  }


  /**
   * Метод создаёт объект карточки места для дальнейшего добавления в DOM
   * @returns {Node} - Объект карточки
   */
  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardImg = this._cardElement.querySelector('.card__img');
    this._likeButton = this._cardElement.querySelector('.card__btn-like');
    this._deleteButton = this._cardElement.querySelector('.card__btn-del');

    this._addCardListeners();

    this._cardElement.querySelector('.card__title').textContent = this._placeTitle;
    this._cardImg.src = this._imgUri;
    this._cardImg.alt = `Изображение места ${this._placeTitle}`;

    return this._cardElement;
  }
}
