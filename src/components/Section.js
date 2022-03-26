export default class Section {
  /**
   * Создаёт экземпляр секции для добавления в неё DOM-элементов
   * @param {object} renderer - Функция вставки DOM-элементов в секцию
   * @param {string} containerSelector - Селектор секции-контейнера
   */
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  /**
   * Метод запускает отрисовку первоначальных данных
   * @param {object} items - Объект с элементами, которые нужно добавить в секцию
   */
  renderItems(items) {
    items.forEach((item) => {
      this.addItem(item);
    });
  }


  /**
   * Метод добавляет один DOM-элемент в секцию-контейнер
   * @param {object} domElement - Элемент, который нужно добавить в секцию-контейнер
   */
  addItem(domElement) {
    const newCard = this._renderer(domElement);
    this._container.prepend(newCard);
  }
}
