export default class Popup {
  /**
   * Создаёт экземпляр модального окна - попапа
   * @param {string} popupSelector - Селектор попапа-контейнера
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }


  /**
   * Метод обрабатывает нажатие клавиши "Escape"
   * @param {string} event - Объект события
   * @private
   */
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }


  /**
   * Метод добавляет слушатели на события, связанные с экземпляром попапа
   */
  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (event.target.classList.contains('popup__btn-close')) {
        this.close();
      }
    });
  }


  /**
   * Метод открывает экземпляр попапа
   */
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._boundHandleEscClose);
  }


  /**
   * Метод закрывает экземпляр попапа
   */
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._boundHandleEscClose);
  }
}
