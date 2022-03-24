import UserInfo from './UserInfo.js';
import Section from './Section.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initialData.js';


const buttonProfileEdit = document.querySelector('.profile__edit-btn');
const buttonPlaceAdd = document.querySelector('.profile__add-btn');
const userInfo = new UserInfo({nameSelector: '.profile__title', jobSelector: '.profile__subtitle'});
const cardSection = new Section({items: initialCards, renderer: renderCard}, '.places');
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', handleFormEditProfile);
const popupAddPlace = new PopupWithForm('.popup_type_add-place', handleFormAddPlace);
const popupViewPlace = new PopupWithImage('.popup_type_view-place');

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
 * Функция обрабатывает 'click' по изображению карточки места
 * @param {string} name - Название места
 * @param {string} link - Ссылка на изображение места
 */
function handleCardClick(name, link) {
  popupViewPlace.open({name: name, link: link});
}


/**
 * Функция создаёт экземпляр карточки места
 * @param {object} placeItem - Объект с названием места и ссылкой на изображение
 * @returns {*} - Экземпляр карточки места
 */
function createCard(placeItem) {
  return new Card(placeItem, '.template__place-card', handleCardClick);
}


/**
 * Функция создаёт экземпляры класса Card и добавляет карточки места на страницу
 * @param {object} placeItem - Объект с названием места и ссылкой на изображение
 * @param {object} container - DOM-элемент, в который добавляются карточки места
 */
function renderCard(placeItem, container) {
  const card = createCard(placeItem);
  container.prepend(card.generateCard());
}


/**
 * Функция открывает попап с формой редактирования профиля;
 * очищает поля формы от несохранённых данных,
 * заполняет поля ввода актуальными сведениями,
 * деактивирует кнопку сабмита
 */
function openFormEditProfile() {
  formValidators[formEditProfile.getAttribute('name')].resetValidation();

  const {name, job} = userInfo.getUserInfo();
  popupEditProfile.popup.querySelector('#input-profile-name').value = name;
  popupEditProfile.popup.querySelector('#input-profile-job').value = job;

  popupEditProfile.open();
}


/**
 * Функция обрабатывает 'submit' формы редактирования профиля
 * @param {object} inputValues - Объект с данными из инпутов
 */
function handleFormEditProfile(inputValues) {
  userInfo.setUserInfo({name: inputValues['nameProfile'], job: inputValues['jobProfile']});

  popupEditProfile.close();
}


/**
 * Функция открывает попап с формой добавления нового места;
 * очищает поля формы от несохранённых данных,
 * деактивирует кнопку сабмита
 */
function openFormAddPlace() {
  formValidators[formAddPlace.getAttribute('name')].resetValidation();

  popupAddPlace.open();
}


/**
 * Функция обрабатывает 'submit' формы добавления нового места
 * @param {object} inputValues - Объект с данными из инпутов
 */
function handleFormAddPlace(inputValues) {
  const place = {name: inputValues['namePlace'], link: inputValues['urlPlaceImg']};
  cardSection.addItem(place);

  popupAddPlace.close();
}


buttonProfileEdit.addEventListener('click', openFormEditProfile);
buttonPlaceAdd.addEventListener('click', openFormAddPlace);

popupAddPlace.setEventListeners();
popupEditProfile.setEventListeners();
popupViewPlace.setEventListeners();

cardSection.renderItems();

enableValidation(settings);
