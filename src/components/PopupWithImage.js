import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  /**
   * Создаёт экземпляр попапа с формой
   * @param {string} popupSelector - Селектор экземпляра попапа
   */
  constructor(popupSelector) {
      super(popupSelector);
      this._imgUri = this._popup.querySelector('.popup__place-img');
      this._titleImg = this._popup.querySelector('.popup__place-title');
    }


  /**
   * Метод открывает экземпляр попапа и заполняет его актуальными данными
   * @param {string} name - Наименование места
   * @param {string} link - Ссылка на изображение места
   */
  open({name, link}) {
    super.open();

    this._imgUri.src = link;
    this._imgUri.alt = `Изображение места ${name}`;
    this._titleImg.textContent = name;
  }
}
