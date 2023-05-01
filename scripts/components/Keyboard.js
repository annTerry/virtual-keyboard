import { createElement } from '../common/utils.js';
import KEYBOARD_SET from '../common/keyBoardSet.js';
import KeyOfKeyboard from './KeyOfKeyboard.js';

export default class Keyboard {
  element = createElement('div', 'keyboard-wrapper');

  textarea = null;

  allKeys = {};

  rows = [];

  click = new Audio();

  constructor(textarea, keyboardStatus) {
    this.keyboardStatus = keyboardStatus;
    this.click.src = '../../assets/audio/click.mp3';
    this.textarea = textarea;
    KEYBOARD_SET.forEach((row) => {
      const oneRow = createElement('div', 'keyboard-row');
      row.forEach((key) => {
        const newKey = new KeyOfKeyboard(key, this.keyboardStatus);
        this.allKeys[key] = newKey;
        oneRow.append(newKey.element);
      });
      this.rows.push(oneRow);
    });
  }

  keyAction(event, down = true) {
    const currentKey = this.allKeys[event.code];
    if (currentKey) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (down) {
        this.click.play();
        currentKey.keyDown();
      } else {
        this.click.pause();
        currentKey.keyUp();
      }
    }
  }

  keyDown(event) {
    this.keyAction(event, true);
  }

  keyUp(event) {
    this.keyAction(event, false);
  }

  create() {
    document.body.append(this.element);
    this.rows.forEach((oneRow) => { this.element.append(oneRow); });
  }
}
