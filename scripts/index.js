const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonProfileEdit = document.querySelector('.profile__edit-btn');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__btn-close');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const buttonPlaceAdd = document.querySelector('.profile__add-btn');
const buttonClosePopupAddPlace = popupAddPlace.querySelector('.popup__btn-close');

const popupViewPlace = document.querySelector('.popup_type_view-place');
const buttonClosePopupViewPlace = popupViewPlace.querySelector('.popup__btn-close');
const urlImg = popupViewPlace.querySelector('.popup__place-img');
const titleImg = popupViewPlace.querySelector('.popup__place-title');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const formEditProfile = popupEditProfile.querySelector('.form');
const formNameProfile = popupEditProfile.querySelector('.form__input_type_name-profile');
const formJobProfile = popupEditProfile.querySelector('.form__input_type_job-profile');

const formAddPlace = popupAddPlace.querySelector('.form');
const formNamePlace = popupAddPlace.querySelector('.form__input_type_title-place');
const formUrlImgPlace = popupAddPlace.querySelector('.form__input_type_url-img');

const placeSection = document.querySelector('.places');
const placeTemplate = document.querySelector('.template__place-card').content;
const placeElement = placeTemplate.querySelector('.card');


function createCard(titlePlace, urlImg) {
  const card = placeElement.cloneNode(true);
  card.querySelector('.card__title').textContent = titlePlace;
  card.querySelector('.card__img').src = urlImg;
  card.querySelector('.card__img').alt = `Изображение места ${titlePlace}`;
  addListeners(card);
  return card;
}


function addListeners(element) {
  element.querySelector('.card__btn-like').addEventListener('click', likePlace);
  element.querySelector('.card__btn-del').addEventListener('click', deletePlace);
  element.querySelector('.card__img').addEventListener('click', viewPlace);
}


initialCards.forEach((placeItem) => {
  const card = createCard(placeItem.name, placeItem.link);
  placeSection.prepend(card);
});


function openPopup(popup) {
  popup.classList.add('popup_opened');
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function openFormEditProfile() {
  openPopup(popupEditProfile);
  formNameProfile.value = nameProfile.textContent;
  formJobProfile.value = jobProfile.textContent;
}


function handleFormEditProfile(event) {
  event.preventDefault();
  const nameInput = formNameProfile.value;
  const jobInput = formJobProfile.value;
  nameProfile.textContent = nameInput;
  jobProfile.textContent = jobInput;
  closePopup(popupEditProfile);
  formNameProfile.value = '';
  formJobProfile.value = '';
}


function openFormAddPlace() {
  openPopup(popupAddPlace);
}


function handleFormAddPlace(event) {
  event.preventDefault();
  const namePlaceInput = formNamePlace.value;
  const urlPlaceInput = formUrlImgPlace.value;
  const card = createCard(namePlaceInput, urlPlaceInput);
  placeSection.prepend(card);
  closePopup(popupAddPlace);
  formNamePlace.value = '';
  formUrlImgPlace.value = '';
}


function viewPlace(event) {
  openPopup(popupViewPlace);
  urlImg.src = event.target.src;
  titleImg.textContent = event.target.nextElementSibling.firstElementChild.textContent;
}


function likePlace(event) {
  event.target.classList.toggle('card__btn-like_active');
}


function deletePlace(event) {
  event.target.closest('.card').remove();
}


function selectPopupToClose(event) {
  const eventTarget = event.target;
  popup = eventTarget.closest('.popup');
  closePopup(popup);
}


buttonProfileEdit.addEventListener('click', openFormEditProfile);
formEditProfile.addEventListener('submit', handleFormEditProfile);
buttonClosePopupEditProfile.addEventListener('click', selectPopupToClose);

buttonPlaceAdd.addEventListener('click', openFormAddPlace);
formAddPlace.addEventListener('submit', handleFormAddPlace);
buttonClosePopupAddPlace.addEventListener('click', selectPopupToClose);

buttonClosePopupViewPlace.addEventListener('click', selectPopupToClose);
