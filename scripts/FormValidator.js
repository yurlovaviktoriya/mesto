export default class FormValidator {
  /**
   * Создаёт экземпляр валидатора для формы
   * @param {object} settings - Объект настроек с селекторами и классами формы
   * @param {object} formElement - Объект формы, которую нужно валидировать
   */
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }


  /**
   * Метод передаёт текст ошибки для поля, не прошедшего валидацию, и добавляет классы для стилизации ошибки
   * @param {object} inputElement - Поле формы, не прошедшее валидацию
   * @param {string} errorMessage - Текст ошибки, который надо показать пользователю
   * @private
   */
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }


  /**
   * Метод удаляет текст ошибки для поля, прошедшего валидацию, и убирает классы стилизации ошибки
   * @param {object} inputElement - Поле формы, успешно прошедшее валидацию
   * @private
   */
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }


  /**
   * Метод проверяет валидность поля: если поле не валидно вызывает функцию для показа ошибки
   * @param {object} inputElement - Поле формы, которое надо валидировать
   * @private
   */
  _isValid(inputElement) {
     if (!inputElement.validity.valid) {
       this._showInputError(inputElement, inputElement.validationMessage);
     } else {
       this._hideInputError(inputElement);
     }
  }

  /**
   * Метод проверяет валидность данных всех полей в форме
   * @param {object} inputList - Поля формы, которые надо валидировать
   * @returns {boolean} - true, если все поля формы прошли проверку на валидность; иначе - false
   * @private
   */
   _hasInvalidInput() {
     return this._inputList.some((inputElement) => {
       return !inputElement.validity.valid;
     });
  }


  /**
   * Метод активирует или деактивирует кнопку отправки формы в зависимости от валидности вводимых в поля формы данных
   * @param {object} inputList - Поля формы, которые надо валидировать
   * @param {object} buttonElement - Кнопка, которую надо активировать / деактивировать
   * @private
   */
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = 'disabled';
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = '';
    }
  }


  /**
   * Метод добавляет слушателей события "input" на все поля формы
   * @private
   */
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }


  /**
   * Метод запускает валидацию полей формы в браузере
   */
  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }


  /**
   * Метод запускает очистку инпутов формы и управление кнопкой сабмита формы
   */
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }
}
