import TextArea from './TextArea.js';
import Keyboard from './Keyboard.js';

export default class PageManager {
  textarea = new TextArea();

  keyboard = new Keyboard(this.textarea);

  constructor() {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      console.log(event.code);
      this.keyboard.keyDown(event.code, event.shiftKey);
    });

    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.keyboard.keyUp(event.code, event.shiftKey);
    });
  }

  create() {
    this.textarea.create();
    this.keyboard.create();
  }
}
