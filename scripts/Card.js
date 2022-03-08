import {openPopup} from './index.js';

const popupViewPlace = document.querySelector('.popup_type_view-place');
const uriImg = popupViewPlace.querySelector('.popup__place-img');
const titleImg = popupViewPlace.querySelector('.popup__place-title');


export default class Card {
  /**
   * Создаёт экземпляр карточки места
   * @param {object} placeTitle - Название места
   * @param {object} imgUri - Ссылка на изображение места
   * @param {object} templateSelector - Селектор html-шаблона для карточки места
   */
  constructor(placeTitle, imgUri, templateSelector) {
    this._placeTitle = placeTitle;
    this._imgUri = imgUri;
    this._templateSelector = templateSelector;
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
   * @param {object} event - Объект события
   * @private
   */
  _likePlace(event) {
    event.target.classList.toggle('card__btn-like_active');
  }


  /**
   * Метод удаляет карточку места
   * @param {object} event - Объект события
   * @private
   */
  _deletePlace(event) {
    event.target.closest('.card').remove();
  }


  /**
   * Метод открывает попап просмотра изображения места
   * @param {object} event - Объект события
   * @private
   */
  _viewPlace(event) {
    openPopup(popupViewPlace);
    const titlePlace = event.target.nextElementSibling.firstElementChild.textContent;
    uriImg.src = event.target.src;
    uriImg.alt = `Изображение места ${titlePlace}`;
    titleImg.textContent = titlePlace;
  }


  /**
   * Метод добавляет слушатели на карточку места для лайка, удаления и просмотра изображения
   * @param {object} cardElement - Объект созданной карточки
   * @private
   */
  _addCardListeners(cardElement) {
    cardElement.querySelector('.card__btn-like').addEventListener('click', this._likePlace);
    cardElement.querySelector('.card__btn-del').addEventListener('click', this._deletePlace);
    cardElement.querySelector('.card__img').addEventListener('click', this._viewPlace);
  }


  /**
   * Метод создаёт объект карточки места для дальнейшего добавления в DOM
   * @returns {Node} - Объект карточки
   */
  generateCard() {
    this._cardElement = this._getTemplate();
    this._addCardListeners(this._cardElement);

    this._cardElement.querySelector('.card__title').textContent = this._placeTitle;
    const cardImg = this._cardElement.querySelector('.card__img');
    cardImg.src = this._imgUri;
    cardImg.alt = `Изображение места ${this._placeTitle}`;

    return this._cardElement;
  }
}
