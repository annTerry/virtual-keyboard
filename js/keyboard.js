import { keyBoardMatrix, keyboardProperties } from './data.js';
import OneKey from './oneKey.js';

class Keyboard {
  CONST_MESSAGE = 'Переключение языка Ctrl + Alt. Разрабатывалось под Windows';

  row = [];

  keyMap = {};

  keyPressed = new Set();

  keyClicked = new Set();

  constructor() {
    this.language = localStorage.getItem('language') || '';
    Object.keys(keyboardProperties).forEach((oneKey) => {
      const keyProperty = keyboardProperties[oneKey];
      const el = new OneKey(oneKey, keyProperty.default || keyProperty.title, keyProperty);
      this.keyMap[oneKey] = el;
    });
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
        const thisButtonObject = keyboard.keyMap[buttonElement];
        const buttonValue = keyboard.getThisChar(keyboardProperties[buttonElement], true);
        thisButtonObject.setNew(buttonValue.main, buttonValue.shift);
        const thisButton = thisButtonObject.thisElement();
        thisButton.addEventListener('mousedown', (event) => {
          let element = event.target;
          if (element.nodeName.toLowerCase() !== 'div') {
            element = element.parentNode;
          }
          keyboard.buttonActionOn(element, element.id, true);
          event.preventDefault();
        });
        thisButton.addEventListener('mouseup', (event) => {
          let element = event.target;
          if (element.nodeName.toLowerCase() !== 'div') {
            element = element.parentNode;
          }
          keyboard.buttonActionOff(element, element.id, true);
        });
        tmpRow.append(thisButton);
      });
      this.keyBoard.append(tmpRow);
    });

    window.addEventListener('keydown', (event) => {
      const element = document.getElementById(event.code);
      if (element) {
        event.preventDefault();
        event.stopImmediatePropagation();
        keyboard.buttonActionOn(element, event.code);
      }
    });
    window.addEventListener('keyup', (event) => {
      const element = document.getElementById(event.code);
      keyboard.buttonActionOff(element, event.code);
    });
    window.addEventListener('mouseup', (event) => {
      keyboard.clearClickList();
      event.preventDefault();
    });
    const message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = this.CONST_MESSAGE;
    document.body.append(message);
  }

  buttonActionOn(element, keyCode, mouse) {
    if (mouse) this.keyClicked.add(keyCode); else this.keyPressed.add(keyCode);
    if (element) {
      const thisKeyProperty = keyboardProperties[keyCode];
      element.classList.add('Active');
      if (thisKeyProperty && thisKeyProperty.action === 'Backspace') {
        const newValue = this.textField.value.substring(0, this.textField.value.length - 1);
        this.textField.value = newValue;
      }
      if (thisKeyProperty && thisKeyProperty.action === 'Enter') {
        this.textField.value += '\r\n';
      }
      if (thisKeyProperty && thisKeyProperty.action === 'Tab') {
        this.textField.value += '\t';
      }
      if (thisKeyProperty && thisKeyProperty.action === 'changeLanguage'
      && (this.keyPressed.has(thisKeyProperty.condition1)
      || this.keyPressed.has(thisKeyProperty.condition2))) {
        this.changeLanguage();
      }
    }
  }

  buttonActionOff(element, keyCode, mouse) {
    const thisKeyProperty = keyboardProperties[keyCode];
    if (element) {
      if (thisKeyProperty) {
        const shiftClicked = this.keyPressed.has('ShiftLeft') || this.keyPressed.has('ShiftRight')
        || this.keyClicked.has('ShiftLeft') || this.keyClicked.has('ShiftRight');
        const thisChar = this.getThisChar(thisKeyProperty, true);
        let value = thisChar.shift && shiftClicked ? thisChar.shift : thisChar.main;
        if (thisKeyProperty.action === 'CapsLock') {
          this.capsLock = !this.capsLock;
          if (this.capsLock) element.classList.add('CapsLock'); else element.classList.remove('CapsLock');
        }
        if (value) {
          value = shiftClicked || this.capsLock ? value.toUpperCase() : value.toLowerCase();
          this.textField.value += value;
        }
      }
    }
    if (mouse) {
      if (thisKeyProperty && thisKeyProperty.action === 'changeLanguage'
    && (this.keyClicked.has(thisKeyProperty.condition1)
      || this.keyClicked.has(thisKeyProperty.condition2))) this.changeLanguage();
      this.clearClickList();
    } else {
      this.keyPressed.delete(keyCode);
      if (element) element.classList.remove('Active');
    }
  }

  clearClickList() {
    this.keyClicked.forEach((code) => document.getElementById(code).classList.remove('Active'));
    this.keyClicked.clear();
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
