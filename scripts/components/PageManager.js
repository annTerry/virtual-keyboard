import TextArea from './TextArea.js';
import Keyboard from './Keyboard.js';
import { createElement } from '../common/utils.js';

export default class PageManager {
  textarea = new TextArea();

  header = createElement('h1','header','Virtual Keyboard');

  keyboard = new Keyboard(this.textarea);

  constructor() {
    document.body.append(this.header);
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
