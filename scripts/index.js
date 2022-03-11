import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initialData.js';


const popups = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonProfileEdit = document.querySelector('.profile__edit-btn');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const buttonPlaceAdd = document.querySelector('.profile__add-btn');

const popupViewPlace = document.querySelector('.popup_type_view-place');
const imgUri = popupViewPlace.querySelector('.popup__place-img');
const titleImg = popupViewPlace.querySelector('.popup__place-title');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const formEditProfile = popupEditProfile.querySelector('.form');
const formNameProfile = popupEditProfile.querySelector('#input-profile-name');
const formJobProfile = popupEditProfile.querySelector('#input-profile-job');

const formAddPlace = popupAddPlace.querySelector('.form');
const formNamePlace = popupAddPlace.querySelector('#input-place-name');
const formUrlImgPlace = popupAddPlace.querySelector('#input-place-url-img');

const placeSection = document.querySelector('.places');


const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}

const formValidators = {};


/**
 * Функция создаёт экземпляры валидаторов всех форм, добавляет их в один объект и запускает валидацию каждой формы
 * @param {object} settings - Объект с именами классов и селекторов
 */
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  })
};


/**
 * Функция создаёт экземпляр карточки места
 * @param {object} placeItem - Объект с названием места и ссылкой на изображение
 * @returns {*} - Экземпляр карточки места
 */
function createCard(placeItem) {
  return new Card(placeItem, '.template__place-card', handleCardClick);
}


/**
 * Добавляет карточки в DOM-дерево при загрузке страницы
 */
initialCards.forEach((placeItem) => {
  const card = createCard(placeItem);
  placeSection.prepend(card.generateCard());
});


/**
 * Функция проверяет нажатие клавиши Esc; при true вызывает закрытие попапа
 * @param {object} event - Объект события
 */
function checkEscapeEventKey(event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}


/**
 * Функция добавляет слушателя на событие клавиатуры (нажатие клавиши)
 */
function addEscListeners() {
  document.addEventListener('keydown', checkEscapeEventKey);
}


/**
 * Функция удаляет слушателя на событии клавиатуры (нажатие клавиши)
 */
function removeEscListeners() {
  document.removeEventListener('keydown', checkEscapeEventKey);
}


/**
 * Функция показывает попап и вызывает функцию добавления слушателя
 * @param {object} popup - Объект попапа
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEscListeners();
}


/**
 * Функция закрывает попап и вызывает функцию удаления слушателя
 * @param {object} popup - Объект попапа
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEscListeners();
}


/**
 * Функция открывает попап с формой редактирования профиля;
 * очищает поля формы от несохранённых данных,
 * заполняет поля ввода актуальными сведениями,
 * деактивирует кнопку сабмита
 */
function openFormEditProfile() {
  formEditProfile.reset();
  formValidators[formEditProfile.getAttribute('name')].resetValidation();
  formNameProfile.value = nameProfile.textContent;
  formJobProfile.value = jobProfile.textContent;
  openPopup(popupEditProfile);
}


/**
 * Функция обрабатывает 'submit' формы редактирования профиля
 * @param {object} event - Объект события
 */
function handleFormEditProfile(event) {
  event.preventDefault();
  const nameInput = formNameProfile.value;
  const jobInput = formJobProfile.value;
  nameProfile.textContent = nameInput;
  jobProfile.textContent = jobInput;
  closePopup(popupEditProfile);
}


/**
 * Функция открывает попап с формой добавления нового места
 */
function openFormAddPlace() {
  formValidators[formAddPlace.getAttribute('name')].resetValidation();
  openPopup(popupAddPlace);
}


/**
 * Функция обрабатывает 'submit' формы добавления нового места
 * @param {object} event - Объект события
 */
function handleFormAddPlace(event) {
  event.preventDefault();
  const place = {name: formNamePlace.value, link: formUrlImgPlace.value}
  const card = createCard(place);
  placeSection.prepend(card.generateCard());
  closePopup(popupAddPlace);
  formAddPlace.reset();
}


/**
 * Функция обрабатывает 'click' по изображению карточки места
 * @param {string} name - Название места
 * @param {string} link - Ссылка на изображение места
 */
function handleCardClick(name, link) {
  imgUri.src = link;
  imgUri.alt = `Изображение места ${name}`;
  titleImg.textContent = name;
  openPopup(popupViewPlace);
}


buttonProfileEdit.addEventListener('click', openFormEditProfile);
formEditProfile.addEventListener('submit', handleFormEditProfile);

buttonPlaceAdd.addEventListener('click', openFormAddPlace);
formAddPlace.addEventListener('submit', handleFormAddPlace);


/**
 * Добавляет слушатели всем попапам на событие нажатия мыши;
 * если событие сработало на кнопке закрытия попапа или оверлее, вызывает функцию закрытия попапа
 */
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__btn-close')) {
      closePopup(popup)
    }
  })
})


enableValidation(settings);
