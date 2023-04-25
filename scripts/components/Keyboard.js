import { createElement } from '../common/utils.js';
import KEYBOARD_SET from '../common/keyBoardSet.js';
import KeyOfKeyboard from './KeyOfKeyboard.js';

export default class Keyboard {
  element = createElement('div', 'keyboard-wrapper');

  textarea = null;

  language = window.localStorage.getItem('keyboard-language') || '';

  allKeys = {};

  rows = [];

  constructor(textarea) {
    this.textarea = textarea;
    KEYBOARD_SET.forEach((row) => {
      const oneRow = createElement('div', 'keyboard-row');
      row.forEach((key) => {
        const newKey = new KeyOfKeyboard(key);
        this.allKeys[key] = newKey;
        oneRow.append(newKey.element);
      });
      this.rows.push(oneRow);
    });
  }

  create() {
    document.body.append(this.element);
    this.rows.forEach((oneRow) => { this.element.append(oneRow); });
  }
}
