import './index.css';

import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import { api } from '../components/Api';

const buttonProfileEdit = document.querySelector('.profile__edit-btn');
const buttonUpdateAvatar = document.querySelector('.profile__avatar-overlay');
const buttonPlaceAdd = document.querySelector('.profile__add-btn');
const inputProfileName = document.querySelector('#input-profile-name');
const inputProfileJob = document.querySelector('#input-profile-job');

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
 * Функция делает запрос к API, чтобы получить с сервера данные о текущем пользователе
 */
function getProfileInfo() {
  api.getProfileInfo()
  .then(res => {
    userInfo.setUserInfo(res);
  })
  .catch(err => {
    console.log(err);
  });
}


/**
 * Функция делает запрос к API, чтобы получить с сервера данные о местах
 */
function getInitialCards() {
  api.getInitialCards()
  .then(res => {
    cardSection.renderItems(res);
  })
  .catch(err => {
    console.log(err);
  });
}


/**
 * Функция обрабатывает 'click' по изображению карточки места
 * @param {string} name - Название места
 * @param {string} link - Ссылка на изображение места
 */
function handleCardClick(name, link) {
  popupViewPlace.open({name: name, link: link});
}


/**
 * Функция создаёт попап для подтверждения удаления карточки места и открывает его
 * @param {string} cardId - Идентификатор записи о месте
 * @param {object} cardElement - Карточка, к которой привязан попап согласия на удаление
 */
function createPopupConfirmDelete(cardId, cardElement) {
  const popupConfirmDelete = new PopupWithConfirmation(
    '.popup_type_confirm-delete',
    cardId,
    cardElement,
    handleCardDelete
  );
  popupConfirmDelete.setEventListeners();

  popupConfirmDelete.open();
}


/**
 * Функция обрабатывает 'click' с согласием на удаление карточки места
 * @param {object} popup - Попап согласия на удаление карточки места
 * @param {string} cardId - Идентификатор записи о месте
 * @param {object} cardElement - Карточка, к которой привязан попап согласия на удаление
 */
function handleCardDelete(popup, cardId, cardElement) {
  api.deleteCard(cardId)
    .catch(err => {
      console.log(err);
    });

  popup.close();
  popup = null;

  cardElement.remove();
  cardElement = null;
}


/**
 * Функция обрабатывает 'click' для постановки лайка карточке места
 * @param {string} cardId - Идентификатор записи о месте
 * @param {object} counterLike - Элемент DOM-дерева с отображением количества лайкнувших
 */
function handleCardLike(cardId, counterLike) {
  api.likeCard(cardId)
    .then(res => {
      counterLike.textContent = res.likes.length;
    })
    .catch(err => {
      console.log(err);
    })
}


/**
 * Функция обрабатывает 'click' для удаления лайка карточке места
 * @param {string} cardId - Идентификатор записи о месте
 * @param {object} counterLike - Элемент DOM-дерева с отображением количества лайкнувших
 */
function handleRemoveCardLike(cardId, counterLike) {
  api.removeLikeCard(cardId)
    .then(res => {
      if (res.likes.length === 0) {
        counterLike.textContent = '';
      } else {
        counterLike.textContent = res.likes.length;
      }
    })
    .catch(err => {
      console.log(err);
    })
}


/**
 * Функция создаёт экземпляр карточки места
 * @param {object} placeItem - Объект с названием места и ссылкой на изображение
 * @returns {*} - Экземпляр карточки места
 */
function createCard(placeItem) {
  const card = new Card(
    placeItem,
    '.template__place-card',
    handleCardClick,
    createPopupConfirmDelete,
    handleCardLike,
    handleRemoveCardLike
  );

  return card.generateCard(userInfo.getUserInfo().id);
}


/**
 * Функция вызывает метод экземпляра класса Card, чтобы добавить карточку места на страницу
 * @param {object} placeItem - Объект с названием места и ссылкой на изображение
 */
function renderCard(placeItem) {
  cardSection.addItem(createCard(placeItem));
}


/**
 * Функция деактивирует кнопку при отправке данных на сервер и меняет текст на ней
 * @param {object} popup - Попап с формой отправки данных
 * @param {boolean} isLoading - Информация об отправке данных на сервер
 */
function disableButton(popup, isLoading) {
  const btn = popup.querySelector('.form__btn')
  if (isLoading) {
    btn.disabled = 'disabled';
    btn.textContent = 'Сохранение...';
  } else {
    btn.textContent = 'Сохранить';
  }

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
  inputProfileName.value = name;
  inputProfileJob.value = job;

  popupEditProfile.open();
}


/**
 * Функция обрабатывает 'submit' формы редактирования профиля
 * @param {object} popup - Попап с формой отправки данных
 * @param {object} inputValues - Объект с данными из инпутов
 */
function handleFormEditProfile(popup, inputValues) {
  disableButton(popup, true);

  api.editProfileInfo({name: inputValues['nameProfile'], job: inputValues['jobProfile']})
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      console.log(err);
    });

  disableButton(popup, false);

  popupEditProfile.close();
}


/**
 * Функция открывает попап с формой редактирования аватара;
 * очищает поля формы от несохранённых данных,
 * заполняет поля ввода актуальными сведениями,
 * деактивирует кнопку сабмита
 */
function openPopupUpdateAvatar() {
  formValidators[formUpdateAvatar.getAttribute('name')].resetValidation();

  popupUpdateAvatar.open();
}


/**
 * Функция обрабатывает 'submit' формы редактирования аватара
 * @param {object} popup - Попап с формой отправки данных
 * @param {object} inputValues - Объект с данными из инпута
 */
function handleFormUpdateAvatar(popup, inputValues) {
  disableButton(popup);
  api.updateAvatar({avatar: inputValues['urlAvatar']})
    .then(res => {
      document.querySelector('.profile__avatar').src = res.avatar;
    })
    .catch(err => {
      console.log(err);
    });

  popupUpdateAvatar.close()
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
 * @param {object} popup - Попап с формой отправки данных
 * @param {object} inputValues - Объект с данными из инпутов
 */
function handleFormAddPlace(popup, inputValues) {
  const place = {name: inputValues['namePlace'], link: inputValues['urlPlaceImg']};
  disableButton(popup);

  api.addCard(place)
    .then(res => {
      cardSection.addItem(createCard(res));
    })
    .catch(err => {
        console.log(err);
      });

  popupAddPlace.close();
}


buttonProfileEdit.addEventListener('click', openFormEditProfile);
buttonUpdateAvatar.addEventListener('click', openPopupUpdateAvatar);
buttonPlaceAdd.addEventListener('click', openFormAddPlace);

popupAddPlace.setEventListeners();
popupEditProfile.setEventListeners();
popupViewPlace.setEventListeners();
popupUpdateAvatar.setEventListeners();

enableValidation(settings);
getProfileInfo();
getInitialCards();
