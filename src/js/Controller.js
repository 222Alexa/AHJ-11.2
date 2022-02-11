import { ajax } from "rxjs/ajax";
import { fromEvent, forkJoin } from "rxjs";
import { map, switchMap, pluck } from "rxjs/operators";

import Post from "./Post";
import Comment from "./Comment";

export default class Controller {
  constructor(board) {
    this.board = board;
    this.postsId = new Set();
  }

  init() {
    this.board.bindToDOM();
    this.subscribeStream();
    this.btn = document.querySelector(".btn");
    this.showComments();
  }

  subscribeStream() {
    this.postStream$ = ajax
      .getJSON(`https://coatest.herokuapp.com/posts/latest`)
      .pipe(
        pluck("data"),
        switchMap((posts) => {
          const postsAndComments = posts.map((post) =>
            ajax
              .getJSON(
                `https://coatest.herokuapp.com/posts/${post.id}/comments/latest`
              )
              .pipe(
                pluck("data"),
                map((comments) => ({ ...post, comments }))
              )
          );

          return forkJoin(postsAndComments);
        })
      )
      .subscribe(
        (postsAndComments) => this.getValue(postsAndComments),
        (err) => console.log(err)
      );
  }

  getValue(obj) {
    if (!obj.length) {
      return;
    }
    obj.forEach((elem) => {
      const message = new Post(elem);
      message.init();

      this.getComments(elem.comments);
    });
  }

  getComments(obj) {
    console.log(obj, "obj");
    if (!obj.length) {
      return;
    }

    obj.forEach((elem) => {
      const comment = new Comment(elem);
      const parent = [...document.querySelectorAll(".posts__card")].find(
        (item) => item.dataset.id === elem.post_id
      );

      if (!parent.querySelector(".comments__list")) {
        const panel = document.createElement("ul");
        panel.classList.add("comments__list");
        parent.querySelector(".post__wrapper").append(panel);
      }
      comment.init();
    });
  }

  showComments() {
    fromEvent(this.btn, "click").subscribe((event) => {
      this.toggleVision([...document.querySelectorAll(".comments__list")]);
    });
  }

  toggleVision(arr) {
    arr.forEach((elem) => elem.classList.toggle("active"));
    const active = arr.some((elem) => elem.classList.contains("active"));
    active
      ? (this.btn.textContent = "Скрыть комментарии")
      : (this.btn.textContent = "Показать комментарии");
  }
}
