import TextArea from './TextArea.js';
import Keyboard from './Keyboard.js';
import Header from './Header.js';
import KeyboardStatus from './KeyboardStatus.js';

export default class PageManager {
  textarea = new TextArea();

  header = new Header();

  keyboardStatus = new KeyboardStatus(this.textarea, this.header);

  keyboard = new Keyboard(this.textarea, this.keyboardStatus);

  constructor() {
    document.body.append(this.header.element);
    window.addEventListener('keydown', (event) => {
      this.keyboard.keyDown(event);
    });

    window.addEventListener('keyup', (event) => {
      this.keyboard.keyUp(event);
    });
  }

  create() {
    this.textarea.create();
    this.keyboard.create();
  }
}
