const popupEditProfile = document.getElementById('popupEditProfile');
const buttonProfileEdit = document.querySelector('.profile__edit-btn');

const popupAddPlace = document.getElementById('popupAddPlace');
const buttonPlaceAdd = document.querySelector('.profile__add-btn');

const popupViewPlace = document.getElementById('popupViewPlace');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const formEditProfile = document.getElementById('formEditProfile');
const formNameProfile = document.getElementById('formNameProfile');
const formJobProfile = document.getElementById('formJobProfile');

const formAddPlace = document.getElementById('formAddPlace');
const formNamePlace = document.getElementById('formNamePlace');
const formUrlImgPlace = document.getElementById('formUrlImgPlace');

const placeSection = document.querySelector('.places');
const placeTemplate = document.getElementById('templatePlaceCard').content;


function renderPlaceCard(titlePlace, urlImg) {
  const placeElement = placeTemplate.querySelector('.card').cloneNode(true);
  placeElement.querySelector('.card__title').textContent = titlePlace;
  placeElement.querySelector('.card__img').src = urlImg;
  placeElement.querySelector('.card__img').alt = `Изображение места ${titlePlace}`;
  placeSection.prepend(placeElement);
  addListeners(placeElement);
}


function addListeners(element) {
  element.querySelector('.card__btn-like').addEventListener('click', likePlace);
  element.querySelector('.card__btn-del').addEventListener('click', deletePlace);
  element.querySelector('.card__img').addEventListener('click', viewPlace);
}


initialCards.forEach((placeItem) => {
  renderPlaceCard(placeItem.name, placeItem.link);
});


function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__btn-close').addEventListener('click', closePopup);
}


function closePopup(event) {
  const eventTarget = event.target;
  const popup = eventTarget.closest('.popup');
  popup.classList.remove('popup_opened');
  if (popup !== popupViewPlace) {
    inputs = popup.querySelectorAll('.form__input');
    resetForm(inputs);
  }
}


function resetForm(inputs) {
  inputs.forEach((input) => {
    input.value = '';
  });
}


function openFormEditProfile() {
  openPopup(popupEditProfile);
  formNameProfile.value = nameProfile.textContent;
  formJobProfile.value = jobProfile.textContent;
}


function formEditProfileSubmitHandler(event) {
  event.preventDefault();
  nameInput = formNameProfile.value;
  jobInput = formJobProfile.value;
  nameProfile.textContent = nameInput;
  jobProfile.textContent = jobInput;
  closePopup(event);
}


function openFormAddPlace() {
  openPopup(popupAddPlace);
}


function formAddPlaceSubmitHandler(event) {
  event.preventDefault();
  namePlaceInput = formNamePlace.value;
  urlPlaceInput = formUrlImgPlace.value;
  renderPlaceCard(namePlaceInput, urlPlaceInput);
  closePopup(event);
}


function viewPlace(event) {
  openPopup(popupViewPlace);
  const urlImg = popupViewPlace.querySelector('.popup__place-img');
  urlImg.src = event.target.src;
  const titleImg = popupViewPlace.querySelector('.popup__place-title');
  titleImg.textContent = event.target.nextElementSibling.firstElementChild.textContent;
}


function likePlace(event) {
  event.target.classList.toggle('card__btn-like_active');
}


function deletePlace(event) {
  event.target.closest('.card').remove();
}


buttonProfileEdit.addEventListener('click', openFormEditProfile);
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

buttonPlaceAdd.addEventListener('click', openFormAddPlace);
formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler);
