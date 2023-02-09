// отвечает за отрисовку элементов на странице
export default class Section {
  constructor({ items, renderer }, selector) {
    this._initialCards = items;
    this.renderer = renderer;
    this._container = document.querySelector(selector);
  }

  // отвечает за отрисовку всех элементов
  renderItems() {
    this._initialCards.forEach(item => {
      this._container.append(this.renderer(item));
    });
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}

