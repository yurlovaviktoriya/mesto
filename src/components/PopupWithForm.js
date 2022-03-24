import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  /**
   * Создаёт экземпляр попапа с формой
   * @param {string} popupSelector - Селектор экземпляра попапа
   * @param {object} handleForm - Функция-обработчик формы
   */
  constructor(popupSelector, handleForm) {
    super(popupSelector);
    this._handleForm = handleForm;
  }


  /**
   * Метод достаёт данные из всех инпутов формы и собирает их в объект
   * @returns {object} - Объект с данными из инпутов формы
   * @private
   */
  _getInputValues() {
    this._inputValues = {};
    this._inputList = this._form.querySelectorAll('.form__input');
    this._inputList.forEach(inputElement => {
      this._inputValues[inputElement.name] = inputElement.value;
    });
    return this._inputValues;
  }


  /**
   * Метод добавляет слушатели на события, связанные с экземпляром попапа с формой
   */
  setEventListeners() {
    super.setEventListeners();
    this._form = this.popup.querySelector('.form');
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleForm(this._getInputValues());
    });
  }


  /**
   * Метод закрывает попап с формой и сбрасывает данные с инпутов
   */
  close() {
    super.close();
    this._form.reset();
  }
}
