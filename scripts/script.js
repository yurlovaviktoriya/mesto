let popup = document.querySelector('.popup');
let buttonPopupClose = document.querySelector('.popup__btn-close');

let buttonProfileEdit = document.querySelector('.profile__edit-btn');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

let formPopup = document.querySelector('.form');
let formInputs = document.querySelectorAll('.form__input');


function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput = formInputs[0].value;
  jobInput = formInputs[1].value;
  nameProfile.textContent = nameInput;
  jobProfile.textContent = jobInput;
  closePopup();
}

function editProfile() {
  openPopup();
  formInputs[0].value = nameProfile.textContent;
  formInputs[1].value = jobProfile.textContent;
}

buttonProfileEdit.addEventListener('click', editProfile);

buttonPopupClose.addEventListener('click', closePopup);

formPopup.addEventListener('submit', formSubmitHandler);
