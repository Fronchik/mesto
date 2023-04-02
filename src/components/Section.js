// отвечает за отрисовку элементов на странице
export default class Section {
  constructor(renderer, selector) {
    this.renderer = renderer;
    this._container = document.querySelector(selector);
  }

  // отвечает за отрисовку всех элементов
  renderItems(items, myId) {
    items.forEach(item => {
      this._container.append(this.renderer(item, myId));
    });
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}

