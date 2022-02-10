/**
 * Функция передаёт текст ошибки для поля, не прошедшего валидацию, и добавляет классы для стилизации ошибки
 * @param {object} selectorsAndClassesDict - Пары "ключ-значение" с наименованием классов и селекторов
 * @param {object} formElement - Форма, поле которой не прошло валидацию
 * @param {object} inputElement - Поле формы, не прошедшее валидацию
 * @param {string} errorMessage - Текст ошибки, который надо показать пользователю
 */
function showInputError(selectorsAndClassesDict, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorsAndClassesDict.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorsAndClassesDict.errorClass);
}


/**
 * Функция удаляет текст ошибки для поля, прошедшего валидацию, и убирает классы стилизации ошибки
 * @param {object} selectorsAndClassesDict - Пары "ключ-значение" с наименованием классов и селекторов
 * @param {object} formElement - Форма, поле которой успешно прошло валидацию
 * @param {object} inputElement - Поле формы, успешно прошедшее валидацию
 */
function hideInputError(selectorsAndClassesDict, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorsAndClassesDict.inputErrorClass);
  errorElement.classList.remove(selectorsAndClassesDict.errorClass);
  errorElement.textContent = '';
}


/**
 * Функция проверяет валидность поля: если поле не валидно вызывает функцию для показа ошибки
 * @param {object} selectorsAndClassesDict - Пары "ключ-значение" с наименованием классов и селекторов
 * @param {object} formElement - Форма, поле которой надо валидировать
 * @param {object} inputElement - Поле формы, которое надо валидировать
 */
function isValid(selectorsAndClassesDict, formElement, inputElement) {
   if (!inputElement.validity.valid) {
     showInputError(selectorsAndClassesDict, formElement, inputElement, inputElement.validationMessage);
   } else {
     hideInputError(selectorsAndClassesDict, formElement, inputElement);
   }
}


/**
 * Функция проверяет валидность данных всех полей в форме
 * @param {object} inputList - Поля формы, которые надо валидировать
 * @returns {boolean} - true, если все поля формы прошли проверку на валидность; иначе - false
 */
 function hasInvalidInput(inputList) {
   return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
   });
}


/**
 * Функция активирует или деактивирует кнопку отправки формы в зависимости от валидности вводимых в поля формы данных
 * @param {object} selectorsAndClassesDict - Пары "ключ-значение" с наименованием классов и селекторов
 * @param {object} inputList - Поля формы, которые надо валидировать
 * @param {object} buttonElement - Кнопка, которую надо активировать / деактивировать
 */
function toggleButtonState(selectorsAndClassesDict, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectorsAndClassesDict.inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  } else {
    buttonElement.classList.remove(selectorsAndClassesDict.inactiveButtonClass);
    buttonElement.disabled = '';
  }
}


/**
 * Функция добавляет слушателей события "input" на все поля переданной формы
 * @param {object} selectorsAndClassesDict - Пары "ключ-значение" с наименованием классов и селекторов
 * @param {object} formElement - Форма, на поля которой добавляют слушателей
 */
function setEventListeners(selectorsAndClassesDict, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(selectorsAndClassesDict.inputSelector));
  const buttonElement = formElement.querySelector(selectorsAndClassesDict.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(selectorsAndClassesDict, formElement, inputElement);
      toggleButtonState(selectorsAndClassesDict, inputList, buttonElement);
    });
  });
}


/**
 * Функция запускает валидацию полей форм в браузере
 * @param {object} selectorsAndClassesDict - Пары "ключ-значение" с наименованием классов и селекторов
 */
function enableValidation(selectorsAndClassesDict) {
  const formList = Array.from(document.querySelectorAll(selectorsAndClassesDict.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(selectorsAndClassesDict, formElement);
  });
}


enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
});
