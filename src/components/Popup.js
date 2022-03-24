export default class Popup {
  /**
   * Создаёт экземпляр модального окна - попапа
   * @param {string} popupSelector - Селектор попапа-контейнера
   */
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
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
    this.popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (event.target.classList.contains('popup__btn-close')) {
        this.close();
      }
    });
    document.addEventListener('keydown', event => {this._handleEscClose(event)});
  }


  /**
   * Метод открывает экземпляр попапа
   */
  open() {
    this.popup.classList.add('popup_opened');
  }


  /**
   * Метод закрывает экземпляр попапа
   */
  close() {
    this.popup.classList.remove('popup_opened')
  }
}
