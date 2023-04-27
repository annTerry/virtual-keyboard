import KEYS_DATA from '../common/keysData.js';

export default class KeyOfKeyboard {
  element = document.createElement('button');

  keyBoardStatus;

  keyData;

  keyCode;

  constructor(keyCode, keyBoardStatus) {
    this.keyBoardStatus = keyBoardStatus;
    this.textarea = keyBoardStatus.textarea;
    const keyData = KEYS_DATA[keyCode];
    this.keyData = keyData;
    this.keyCode = keyCode;
    if (keyData) {
      this.element.className = 'keyboard__one-key';
      this.element.textContent = this.showOnKeySymbol();
      this.element.addEventListener('mousedown', () => { this.mouseDown(); });
      this.element.addEventListener('mouseup', () => { this.mouseUp(); });
    } else {
      console.log('Wrong data key', keyCode);
    }
  }

  showOnKeySymbol() {
    if (this.keyData.title) return this.keyData.title;
    if ((this.keyBoardStatus.toCapital())) return this.keyData.default.toUpperCase();
    return this.keyData.default.toLowerCase();
  }

  currentSymbol() {
    const modifiers = this.keyBoardStatus.modifiers().join('_');
    let result = this.keyData.default;
    if (modifiers) {
      result = this.keyData[modifiers] || result;
    }
    if (result) {
      if (this.keyBoardStatus.toCapital()) { return result.toUpperCase(); }
      return result.toLowerCase();
    }
    return '';
  }

  mouseDown() {
    this.element.classList.add('Active');
    this.doAction(true, this.keyCode, this.keyData.conditions);
  }

  mouseUp() {
    this.doAction(false);
    this.element.classList.remove('Active');
  }

  keyDown() {
    this.element.classList.add('Active');
    this.doAction(true, this.keyCode, this.keyData.conditions);
  }

  keyUp() {
    this.doAction(false);
    this.element.classList.remove('Active');
  }

  doAction(down) {
    if (down) this.textarea.addValue(this.currentSymbol());
    const keyAction = this.keyData.action;
    if (keyAction) {
      const action = this.keyBoardStatus.actions[keyAction];
      if (action) {
        action.call(this.keyBoardStatus, down);
      }
    }
  }
}
