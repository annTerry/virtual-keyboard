import { keyBoardMatrix, keyboardProperties } from './data.js';
import OneKey from './oneKey.js';

class Keyboard {
  row = [];

  keyMap = {};

  keyPressed = new Set();

  constructor() {
    Object.keys(keyboardProperties).forEach((oneKey) => {
      const keyProperty = keyboardProperties[oneKey];
      const el = new OneKey(oneKey, keyProperty.default || keyProperty.title, keyProperty);
      this.keyMap[oneKey] = el;
    });
    this.language = localStorage.getItem('language') || '';
  }

  create() {
    const textFieldDiv = document.createElement('div');
    textFieldDiv.className = 'main';
    this.textField = document.createElement('textarea');
    this.textField.readOnly = true;
    this.textField.id = 'textField';
    textFieldDiv.append(this.textField);
    document.body.append(textFieldDiv);
    this.keyBoard = document.createElement('div');
    this.keyBoard.id = 'keyboard';
    textFieldDiv.append(this.keyBoard);
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
      keyboard.keyPressed.add(event.code);
      if (element) {
        const thisKeyProperty = keyboardProperties[event.code];
        element.classList.add('Active');
        if (thisKeyProperty.action === 'changeLanguage'
        && (keyboard.keyPressed.has(thisKeyProperty.condition1)
        || keyboard.keyPressed.has(thisKeyProperty.condition2))) {
          keyboard.changeLanguage();
        }
      }
    });
    window.addEventListener('keyup', (event) => {
      const element = document.getElementById(event.code);
      keyboard.keyPressed.delete(event.code);
      if (element) {
        element.classList.remove('Active');
        const thisKeyProperty = keyboardProperties[event.code];
        if (thisKeyProperty) {
          const thisChar = keyboard.getThisChar(thisKeyProperty, true);
          let value = keyboard.keyPressed.has('ShiftLeft')
          || keyboard.keyPressed.has('ShiftRight') ? thisChar.shift : thisChar.main;
          if (value) {
            value = keyboard.keyPressed.has('ShiftLeft')
            || keyboard.keyPressed.has('ShiftRight')
            || keyboard.capsLock ? value.toUpperCase() : value.toLowerCase();
            keyboard.textField.innerText = keyboard.textField.value + value;
          }
        }
      }
    });
  }

  getThisChar(thisKey, withDefault) {
    const keyboard = this;
    const currentLanguage = keyboard.language;
    const mainKey = currentLanguage === '' ? 'default' : 'ru';
    const shiftKey = currentLanguage === '' ? 'shift' : `${currentLanguage}_shift`;
    const newKey = thisKey[mainKey] || !withDefault ? thisKey[mainKey] : thisKey.default;
    const newKeyShift = thisKey[shiftKey] || !withDefault ? thisKey[shiftKey] : thisKey.shift;
    return { main: newKey, shift: newKeyShift };
  }

  changeLanguage() {
    const keyboard = this;
    this.language = this.language === '' ? 'ru' : '';
    localStorage.setItem('language', this.language);
    Object.keys(keyboardProperties).forEach((keyCode) => {
      const newKeys = keyboard.getThisChar(keyboardProperties[keyCode]);
      const element = document.getElementById(keyCode);
      if (element && newKeys.main) {
        const mainKeySpan = element.getElementsByClassName('main-key');
        if (mainKeySpan && mainKeySpan.length > 0) mainKeySpan[0].innerHTML = newKeys.main;
      }
      if (element && newKeys.shift) {
        const shiftKeySpan = element.getElementsByClassName('shift');
        if (shiftKeySpan && shiftKeySpan.length > 0) shiftKeySpan[0].innerHTML = newKeys.shift;
      }
    });
  }
}

export default Keyboard;
