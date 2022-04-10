import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  /**
   * Создаёт экземпляр попапа с согласием на удаление карточки
   * @param {string} popupSelector - Селектор экземпляра попапа
   * @param {object} handleConfirm - Функция-обработчик 'submit'
   */
  constructor(popupSelector, elementId, element, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._elementId = elementId;
    this._element = element;
    this._confirmButton = this._popup.querySelector('.popup__btn-confirm');
  }


  /**
   * Метод добавляет слушатели на события, связанные с экземпляром попапа с согласием на удаление карточки
   */
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', (event) => {
      this._handleConfirm(this, this._elementId, this._element);
    });
  }
}
