export default class Board {
  constructor(container) {
    this.container = container;
  }

  static get markup() {
    return `
    <div class="polling__widget">
      <ul class="messages-container"></ul>
    </div>
`;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML("afterbegin", this.constructor.markup);
  }
}
