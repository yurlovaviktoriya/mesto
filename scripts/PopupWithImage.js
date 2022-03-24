import Popup from './Popup.js';


export default class PopupWithImage extends Popup {

  /**
   * Метод открывает экземпляр попапа и заполняет его актуальными данными
   * @param {string} name - Наименование места
   * @param {string} link - Ссылка на изображение места
   */
  open({name, link}) {
    const imgUri = this.popup.querySelector('.popup__place-img');
    const titleImg = this.popup.querySelector('.popup__place-title');

    imgUri.src = link;
    imgUri.alt = `Изображение места ${name}`;
    titleImg.textContent = name;

    this.popup.classList.add('popup_opened');
  }
}
