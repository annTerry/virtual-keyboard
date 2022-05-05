import { keyBoardMatrix, keyboardProperties } from './data.js';
import OneKey from './oneKey.js';

class Keyboard {
  row = [];

  keyMap = {};

  constructor() {
    Object.keys(keyboardProperties).forEach((oneKey) => {
      const keyProperty = keyboardProperties[oneKey];
      const el = new OneKey(oneKey, keyProperty.default || keyProperty.title, keyProperty);
      this.keyMap[oneKey] = el;
    });
    this.language = localStorage.getItem('language') || '';
  }

  create() {
    this.keyBoard = document.createElement('div');
    this.keyBoard.id = 'keyboard';
    document.body.append(this.keyBoard);
    const keyboard = this;
    keyBoardMatrix.forEach((rowArray) => {
      const tmpRow = document.createElement('div');
      tmpRow.className = 'keyboard-row';
      rowArray.forEach((buttonElement) => {
        tmpRow.append(keyboard.keyMap[buttonElement].thisElement());
      });
      this.keyBoard.append(tmpRow);
    });
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const element = document.getElementById(event.code);
      if (element) {
        element.classList.add('Active');
      }
    });
    window.addEventListener('keyup', (event) => {
      const element = document.getElementById(event.code);
      if (element) {
        element.classList.remove('Active');
      }
    });
  }

  changeLanguage() {
    const keyboard = this;
    this.language = this.language === '' ? 'ru' : '';
    localStorage.setItem('language', this.language);
    keyboardProperties.forEach((keyCode) => {
      const thisKey = keyboardProperties[keyCode];
      const currentLanguage = keyboard.language;
      const mainKey = currentLanguage === '' ? 'default' : 'ru';
      //  const shiftKey = currentLanguage === '' ? 'shift' : `${currentLanguage}_shift`;
      const newKey = thisKey[mainKey];
      //  const newKeyShift = thisKey[shiftKey];
      const element = document.getElementById(keyCode);
      if (element && newKey) {
        element.innerHTML = newKey;
      }
    });
  }
}

export default Keyboard;
