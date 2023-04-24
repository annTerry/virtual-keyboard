import TextArea from './TextArea.js';
import Keyboard from './Keyboard.js';

export default class PageManager {
  textarea = new TextArea();

  keyboard = new Keyboard(this.textarea);

  constructor() {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.keyboard.keyDown(event.code, event.shiftKey);
    });
  }

  start() {
    this.keyboard.start();
  }
}
