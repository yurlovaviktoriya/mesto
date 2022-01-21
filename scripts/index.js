let popup = document.querySelector('.popup');
let buttonPopupClose = document.querySelector('.popup__btn-close');

let buttonProfileEdit = document.querySelector('.profile__edit-btn');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

let formPopup = document.querySelector('.form');
let formName = document.getElementById('formNameProfile');
let formJob = document.getElementById('formJobProfile');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput = formName.value;
  jobInput = formJob.value;
  nameProfile.textContent = nameInput;
  jobProfile.textContent = jobInput;
  closePopup();
}

function editProfile() {
  openPopup();
  formName.value = nameProfile.textContent;
  formJob.value = jobProfile.textContent;
}

buttonProfileEdit.addEventListener('click', editProfile);

buttonPopupClose.addEventListener('click', closePopup);

formPopup.addEventListener('submit', formSubmitHandler);
