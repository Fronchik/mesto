import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._previewImg = this._popup.querySelector('.preview__image');
    this._previewName = this._popup.querySelector('.preview__name');
  }

  open(name, link) {
    this._previewImg.src = link;
    this._previewImg.alt = name;
    this._previewName.textContent = name;
    super.open();
  }
}


