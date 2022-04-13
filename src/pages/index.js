import './index.css';

import {
  buttonProfileEdit,
  buttonUpdateAvatar,
  buttonPlaceAdd,
  profileAvatar,
  settings,
  formValidators
} from '../utils/constans.js';

import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import { api } from '../components/Api';


const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});
const cardSection = new Section(renderCard, '.places');
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', handleFormEditProfile);
const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', handleFormUpdateAvatar);
const popupAddPlace = new PopupWithForm('.popup_type_add-place', handleFormAddPlace);
const popupViewPlace = new PopupWithImage('.popup_type_view-place');
const popupConfirmDelete = new PopupWithConfirmation('.popup_type_confirm-delete', handleCardDelete);


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
 * Функция делает запрос к API, чтобы получить с сервера данные о текущем пользователе
 */
function getProfileInfo() {
  return api.getProfileInfo();
}


/**
 * Функция делает запрос к API, чтобы получить с сервера данные о местах
 */
function getInitialCards() {
  return api.getInitialCards();
}


/**
 * Промис объединяет два запроса к API (данные о пользователе, данные о местах);
 * при успешном ответе сервера запускает отрисовку данных на странице
 */
Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profileInfo, initialCards]) => {
    userInfo.setUserInfo(profileInfo);
    cardSection.renderItems(initialCards);
  })
  .catch(err => {
    console.log(err);
  });


/**
 * Функция обрабатывает 'click' по изображению карточки места;
 * открывает попап с изображением
 * @param {string} name - Название места
 * @param {string} link - Ссылка на изображение места
 */
function handleCardClick(name, link) {
  popupViewPlace.open({name, link});
}


/**
 * Функция открывает попап для подтверждения удаления карточки места;
 * привязывает данные карточки к этому попапу
 * @param {string} cardId - Идентификатор записи о месте
 * @param {object} cardElement - Карточка, к которой привязан попап согласия на удаление
 */
function openPopupConfirmDelete(cardId, cardElement) {
  popupConfirmDelete.updateCardInfo({cardId, cardElement});

  popupConfirmDelete.open();
}


/**
 * Функция делает запрос к API, чтобы удалить данные о месте из БД на сервере
 * @param {string} cardId - Идентификатор записи о месте
 */
function handleCardDelete(cardId) {
  return api.deleteCard(cardId);
}


/**
 * Функция делает запрос к API, чтобы обновить данные в БД на сервере (поставить лайк карточке места)
 * @param {object} cardId - Идентификатор записи о месте
 */
function handleCardLike(cardId) {
  return api.likeCard(cardId);
}


/**
 * Функция делает запрос к API, чтобы обновить данные в БД на сервере (удалить лайк у карточки места)
 * @param {string} cardId - Идентификатор записи о месте
 */
function handleRemoveCardLike(cardId) {
  return api.removeLikeCard(cardId);
}


/**
 * Функция создаёт экземпляр карточки места и генерирует элемент карточки для DOM-дерева
 * @param {object} placeItem - Объект с названием места и ссылкой на изображение
 * @returns {*} - Экземпляр карточки места
 */
function renderCard(placeItem) {
  const card = new Card(
    placeItem,
    '.template__place-card',
    handleCardClick,
    openPopupConfirmDelete,
    handleCardLike,
    handleRemoveCardLike
  );

  return card.generateCard(userInfo.getUserInfo().id);
}


/**
 * Функция открывает попап с формой редактирования профиля;
 * очищает поля формы от несохранённых данных,
 * заполняет поля ввода актуальными сведениями,
 * деактивирует кнопку сабмита
 */
function openFormEditProfile() {
  formValidators[formEditProfile.getAttribute('name')].resetValidation();

  const { name, job } = userInfo.getUserInfo();
  popupEditProfile.setInputValues({nameProfile: name, jobProfile: job});

  popupEditProfile.open();
}


/**
 * Функция обрабатывает 'submit' формы редактирования профиля;
 * делает запрос к API, чтобы обновить данные в БД на сервере (имя пользователя и род занятий)
 * @param {object} inputValues - Объект с данными из инпутов
 */
function handleFormEditProfile(inputValues) {
  return api.editProfileInfo({name: inputValues['nameProfile'], job: inputValues['jobProfile']})
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      console.log(err);
    })
}


/**
 * Функция открывает попап с формой редактирования аватара;
 * очищает поля формы от несохранённых данных,
 * заполняет поля ввода актуальными сведениями,
 * деактивирует кнопку сабмита
 */
function openPopupUpdateAvatar() {
  formValidators[formUpdateAvatar.getAttribute('name')].resetValidation();

  const { avatar } = userInfo.getUserInfo();
  popupUpdateAvatar.setInputValues({urlAvatar: avatar});

  popupUpdateAvatar.open();
}


/**
 * Функция обрабатывает 'submit' формы редактирования аватара;
 * делает запрос к API, чтобы обновить данные в БД на сервере (аватар пользователя)
 * @param {object} inputValues - Объект с данными из инпута
 */
function handleFormUpdateAvatar(inputValues) {
  return api.updateAvatar({avatar: inputValues['urlAvatar']})
    .then(res => {
      userInfo.setUserInfo(res);
      profileAvatar.src = res.avatar;
    })
    .catch(err => {
      console.log(err);
    })
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
 * Функция обрабатывает 'submit' формы добавления нового места;
 * делает запрос к API, чтобы обновить данные в БД на сервере (добавить новое место)
 * @param {object} inputValues - Объект с данными из инпутов
 */
function handleFormAddPlace(inputValues) {
  const place = {name: inputValues['namePlace'], link: inputValues['urlPlaceImg']};

  return api.addCard(place)
    .then(res => {
      cardSection.addItem(res);
    })
    .catch(err => {
        console.log(err);
    });
}


buttonProfileEdit.addEventListener('click', openFormEditProfile);
buttonUpdateAvatar.addEventListener('click', openPopupUpdateAvatar);
buttonPlaceAdd.addEventListener('click', openFormAddPlace);

popupAddPlace.setEventListeners();
popupEditProfile.setEventListeners();
popupViewPlace.setEventListeners();
popupUpdateAvatar.setEventListeners();
popupConfirmDelete.setEventListeners();

enableValidation(settings);
