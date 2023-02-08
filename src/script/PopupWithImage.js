import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(name, link) {
    const previewImg = this._popup.querySelector('.preview__image');
    const previewName = this._popup.querySelector('.preview__name');

    previewImg.src = link;
    previewImg.alt = name;
    previewName.textContent = name;
    super.open();
  }
}


