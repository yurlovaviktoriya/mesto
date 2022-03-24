export default class Section {
  /**
   * Создаёт экземпляр секции для добавления в неё DOM-элементов
   * @param {object} items - Объект с элементами, которые нужно добавить в секцию
   * @param {object} renderer - Функция вставки DOM-элементов в секцию
   * @param {string} containerSelector - Селектор секции-контейнера
   */
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  /**
   * Метод запускает отрисовку первоначальных данных
   */
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item, this._container);
    })
  }


  /**
   * Метод добавляет запускает добавление одного DOM-элемента
   * @param {object} domElement - Элемент, который нужно добавить в секцию-контейнер
   */
  addItem(domElement) {
    this._renderer(domElement, this._container);
  }
}
