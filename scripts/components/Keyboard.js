import { createElement } from '../common/utils.js';
import KEYBOARD_SET from '../common/keyBoardSet.js';
import KeyOfKeyboard from './KeyOfKeyboard.js';
import KeyboardStatus from './KeyboardStatus.js';

export default class Keyboard {
  element = createElement('div', 'keyboard-wrapper');

  textarea = null;

  language = window.localStorage.getItem('keyboard-language') || '';

  allKeys = {};

  rows = [];

  click = new Audio();

  constructor(textarea) {
    this.click.src = '../../assets/audio/click.mp3';
    this.textarea = textarea;
    this.keyboardStatus = new KeyboardStatus(this.language, this.textarea);
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

  keyDown(keyCode) {
    this.click.play();
    this.allKeys[keyCode].keyDown();
  }

  keyUp(keyCode) {
    this.allKeys[keyCode].keyUp();
  }

  create() {
    document.body.append(this.element);
    this.rows.forEach((oneRow) => { this.element.append(oneRow); });
  }
}
