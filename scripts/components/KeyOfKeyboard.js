import KEYS_DATA from '../common/keysData.js';

export default class KeyOfKeyboard {
  element = document.createElement('button');

  constructor(keyCode) {
    const keyData = KEYS_DATA[keyCode];
    if (keyData) {
      this.element.className = 'keyboard__one-key';
      this.element.textContent = keyData.title || keyData.default;
    } else {
      console.log('Wrong data key', keyCode);
    }
  }
}
