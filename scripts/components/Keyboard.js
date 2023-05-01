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
    this.keyboardStatus.languageElement.addEventListener('click', () => {
      this.keyboardStatus.changeLanguageAction();
      this.changeKeys();
    });
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
      if (down && !currentKey.down) {
        this.click.play();
        currentKey.keyDown();
      } else if (!down) {
        this.click.pause();
        currentKey.keyUp();
      }
      currentKey.down = down;
    }
    this.changeKeys();
  }

  keyDown(event) {
    this.keyAction(event, true);
    this.changeKeys();
  }

  keyUp(event) {
    this.keyAction(event, false);
    this.changeKeys();
  }

  create() {
    document.body.append(this.element);
    this.rows.forEach((oneRow) => { this.element.append(oneRow); });
  }

  changeKeys() {
    Object.values(this.allKeys).forEach((keyElement) => { keyElement.correctSymbol(); });
  }
}
