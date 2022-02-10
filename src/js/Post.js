export default class Post {
  constructor(data) {
    this.data = data;
    this.created = new Date(data.created).toLocaleString();
  }

  init() {
    this.bindToDOM();
  }

  static template(data, created) {
    return `
      <li class="posts__card" data-id="${data.id}" data-time="${created}" data-author="${data.author_id}">
        <div class="post__wrapper">
          <div class="post__header">
            <div class="avatar-wrapper">
              <img class="author__avatar" alt="avatar" src="${data.avatar}">
            </div>
            <div class="posts__info">
              <span class="posts__author">${data.author}, </span>
              <span class="posts__datetime">${created}</span>
            </div>
          </div>
          <div class="post__content">${data.title}</div>    
        </div>
      </li>
      `;
  }

  bindToDOM() {
    const panel = document.querySelector(".messages-container");

    const post = this.addPost(this.data, this.created);

    panel.insertAdjacentHTML("afterbegin", post);
  }

  addPost() {
    if (this.data) {
      const result = this.constructor.template(this.data, this.created);

      return result;
    }
    return false;
  }
}
