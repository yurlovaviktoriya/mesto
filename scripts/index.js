const popups = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonProfileEdit = document.querySelector('.profile__edit-btn');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const buttonPlaceAdd = document.querySelector('.profile__add-btn');

const popupViewPlace = document.querySelector('.popup_type_view-place');
const urlImg = popupViewPlace.querySelector('.popup__place-img');
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
const placeTemplate = document.querySelector('.template__place-card').content;
const placeElement = placeTemplate.querySelector('.card');


/**
 * Функция добавляет слушатели на карточку места для лайка, удаления и просмотра изображения
 * @param {object} card - Объект созданной карточки
 */
function addCardListeners(card) {
  card.querySelector('.card__btn-like').addEventListener('click', likePlace);
  card.querySelector('.card__btn-del').addEventListener('click', deletePlace);
  card.querySelector('.card__img').addEventListener('click', viewPlace);
}


/**
 * Функция создаёт объект карточки места для дальнейшего добавления в DOM
 * @param {string} titlePlace - Наименование места
 * @param {string} urlImg - Ссылка на картинку места
 * @returns {Node} - Объект карточки
 */
function createCard(titlePlace, urlImg) {
  const card = placeElement.cloneNode(true);
  card.querySelector('.card__title').textContent = titlePlace;
  const cardImg = card.querySelector('.card__img');
  cardImg.src = urlImg;
  cardImg.alt = `Изображение места ${titlePlace}`;
  addCardListeners(card);
  return card;
}


/**
 * Добавляет карточки в DOM-дерево при загрузке страницы
 */
initialCards.forEach((placeItem) => {
  const card = createCard(placeItem.name, placeItem.link);
  placeSection.prepend(card);
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
 * Функция активирует кнопку отправки формы
 * @param {object} form -Объект формы
 */
function enableButtonSubmit(form) {
  const buttonSubmit = form.querySelector('.form__btn');
  buttonSubmit.disabled = '';
  buttonSubmit.classList.remove('form__btn_disabled');
}


/**
 * Функция удаляет классы, стилизующие ошибки полей ввода, и текст ошибки
 * @param {object} form - Объект формы
 * @param {object} input - Объект поля формы
 */
function deleteInputError(form, input) {
  input.classList.remove('form__input_type_error');
  const errorMessage = form.querySelector(`.${input.id}-error`);
  errorMessage.classList.remove('form__error_visible');
  errorMessage.textContent = '';
}


/**
 * Функция проверяет стилизуются ли поля формы как ошибочные;
 * при true вызывает функцию удаления ошибок из полей формы и функцию активации кнопки отправки формы
 * @param {object} form - Объект формы
 * @param {NodeList} inputs - Все поля формы
 */
function checkInputError(form, inputs) {
  inputs.forEach((input) => {
    if (input.classList.contains('form__input_type_error')) {
      deleteInputError(form, input);
      enableButtonSubmit(form);
    }
  })
}


/**
 * Функция открывает попап с формой редактирования профиля;
 * вызывает функцию проверки стилизации полей ввода как ошибочных;
 * заполняет поля ввода актуальными сведениями
 */
function openFormEditProfile() {
  const form = popupEditProfile.querySelector('.form')
  const inputs = form.querySelectorAll('.form__input');
  checkInputError(form, inputs);
  openPopup(popupEditProfile);
  formNameProfile.value = nameProfile.textContent;
  formJobProfile.value = jobProfile.textContent;
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
  openPopup(popupAddPlace);
}


/**
 * Функция обрабатывает 'submit' формы добавления нового места
 * @param {object} event - Объект события
 */
function handleFormAddPlace(event) {
  event.preventDefault();
  const namePlaceInput = formNamePlace.value;
  const urlPlaceInput = formUrlImgPlace.value;
  const card = createCard(namePlaceInput, urlPlaceInput);
  placeSection.prepend(card);
  closePopup(popupAddPlace);
  formNamePlace.value = '';
  formUrlImgPlace.value = '';
  const buttonSubmit = event.target.querySelector('.form__btn');
  buttonSubmit.classList.add('form__btn_disabled');
  buttonSubmit.disabled = 'disabled';
}


/**
 * Функция открывает попап просмотра изображения места
 * @param {object} event - Объект события
 */
function viewPlace(event) {
  openPopup(popupViewPlace);
  const titlePlace = event.target.nextElementSibling.firstElementChild.textContent;
  urlImg.src = event.target.src;
  urlImg.alt = `Изображение места ${titlePlace}`;
  titleImg.textContent = titlePlace;
}


/**
 * Функция добавляет лайк карточке места
 * @param {object} event - Объект события
 */
function likePlace(event) {
  event.target.classList.toggle('card__btn-like_active');
}


/**
 * Функция удаляет карточку места
 * @param {object} event - Объект события
 */
function deletePlace(event) {
  event.target.closest('.card').remove();
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

