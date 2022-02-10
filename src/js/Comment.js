export default class Comment {
  constructor(data) {
    this.data = data;
    this.created = new Date(data.created).toLocaleString();
  }

  init() {
    this.bindToDOM();
  }

  static template(data, created) {
    return `
      <li class="posts__comment" data-id="${data.id}" data-time="${created}" data-author="${data.author_id}" data-posts_id="${data.post_id}">
        <div class="comment__wrapper">
          <div class="comment__header">
            <div class="avatar-wrapper">
              <img class="author__avatar-comment" alt="avatar" src="${data.avatar}">
            </div>
            <div class="comment__info">
              <span class="comment__author">${data.author}, </span>
              <span class="comment__datetime">${created}</span>
            </div>
          </div>
          <div class="comment__content">
          <p class="comment__text">${data.content}</p>
          </div>    
        </div>
      </li>
      `;
  }

  bindToDOM() {
    const comment = this.addComment(this.data, this.created);

    const panel = [...document.querySelectorAll(".posts__card")].find(
      (elem) => elem.dataset.id === this.data.post_id
    );

    panel
      .querySelector(".comments__list")
      .insertAdjacentHTML("beforeend", comment);
  }

  addComment() {
    if (this.data) {
      const result = this.constructor.template(this.data, this.created);

      return result;
    }
    return false;
  }
}
