import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  /**
   * Создаёт экземпляр попапа с согласием на удаление карточки
   * @param {string} popupSelector - Селектор экземпляра попапа
   * @param {object} handleConfirm - Функция-обработчик 'submit'
   */
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__btn-confirm');
    this._handleConfirm = handleConfirm;
    this._cardId = null;
    this._cardElement = null;
  }


  /**
   * Метод добавляет слушатели на события, связанные с экземпляром попапа
   */
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirm(this._cardId)
        .then(() => {
          this._cardElement.remove();
          this.close();
        })
        .catch(err => {
            console.log(err);
        });
    });
  }


  /**
   * Метод связывает данные карточки с попапом
   * @param cardId
   * @param cardElement
   */
  updateCardInfo({ cardId, cardElement }) {
    this._cardId = cardId;
    this._cardElement = cardElement;
  }


  /**
   * Метод закрывает попап;
   * отвязывает попап от какой-либо карточки
   */
  close() {
    super.close();
    this._cardId = null;
    this._cardElement = null;
  }
}
