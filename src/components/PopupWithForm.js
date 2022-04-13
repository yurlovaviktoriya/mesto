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
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.form__btn');
  }


  /**
   * Метод достаёт данные из всех инпутов формы и собирает их в объект
   * @returns {object} - Объект с данными из инпутов формы
   * @private
   */
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(inputElement => {
      this._inputValues[inputElement.name] = inputElement.value;
    });
    return this._inputValues;
  }


  /**
   * Метод заполняет актуальными данными инпуты при открытии формы
   * @param {objects} data - Объект с актуальными данными в зависимости от экземпляра формы
   */
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }


  /**
   * Метод добавляет слушатели на события, связанные с экземпляром попапа с формой
   */
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._handleForm(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._submitButton.textContent = initialText;
        })
    })
  }


  /**
   * Метод закрывает попап с формой и сбрасывает данные с инпутов
   */
  close() {
    super.close();
    this._form.reset();
  }
}
