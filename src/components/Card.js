class Card {
  constructor(data, templateSelector, onImgClick, onDelete, onLike, onDislike, myId) {
    this._id = data._id;
    this._owner = data.owner;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._onImgClick = onImgClick;
    this._onDelete = onDelete;
    this._onLike = onLike;
    this._onDislike = onDislike;
    this._myId = myId;
  };

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const template = document.querySelector(this._templateSelector)
      .content
      .querySelector('.picture')
      .cloneNode(true);

    return template;
  };

  generateCard() {
    // Запишем разметку в приватное поле _element
    this._element = this._getTemplate();
    this._element.querySelector('.picture__name').textContent = this._name;

    this._cardImg = this._element.querySelector('.picture__image');
    this._cardImg.alt = this._name;
    this._cardImg.src = this._link;
    this._likeCounter = this._element.querySelector('.picture__likes');
    this._heart = this._element.querySelector('.picture__button');
    this._basket = this._element.querySelector('.picture__basket');
    if (this._owner._id !== this._myId) {
      this._basket.remove();
    }

    this._generateLikes();

    // добавим обработчики
    this._setEventListeners();
    return this._element;
  };

  _generateLikes() {
    this._likeCounter.textContent = this._likes.length;

    if (this._likedByMe()) {
      this._heart.classList.add('picture__button_active');
    } else {
      this._heart.classList.remove('picture__button_active');
    }
  }

  _likedByMe() {
    const cardIsLiked = this._likes.find((element) => {
      return element._id === this._myId;
    })
    return cardIsLiked !== undefined;
  }

  _updateLikes = (likes) => {
    this._likes = likes;
    this._generateLikes();
  }

  _setEventListeners() {
    this._cardImg.addEventListener('click', () => { this._onImgClick(this._name, this._link) });
    this._basket.addEventListener('click', () => {
      if (this._myId !== this._owner._id) {
        return
      }
      // колбек принимает idCard и функцию, которую нужно выполнить в случае удачного удаления с сервера
      this._onDelete(this._id, () => { this._element.remove(); })
    });

    this._heart.addEventListener('click', () => {
      console.log(this._myId);
      if (this._likedByMe()) {
        this._onDislike(this._id, this._updateLikes);
      } else {
        this._onLike(this._id, this._updateLikes);
      }
    });
  }
};

export default Card;
