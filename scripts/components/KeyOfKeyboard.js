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
      this.element.className = 'keyboard__btn';
      this.correctSymbol();
      this.element.addEventListener('mousedown', () => { this.mouseDown(); });
      this.element.addEventListener('mouseup', () => { this.mouseUp(); });
    }
  }

  correctSymbol() {
    this.element.textContent = this.currentSymbol() || this.showOnKeySymbol();
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

  newStyleSet(newStyle) {
    if (newStyle && newStyle.add) this.element.classList.add(newStyle.add);
    if (newStyle && newStyle.remove) this.element.classList.remove(newStyle.remove);
  }

  mouseDown() {
    this.element.classList.add('Active');
    const newStyle = this.doAction(true, this.keyCode, this.keyData.conditions);
    this.newStyleSet(newStyle);
  }

  mouseUp() {
    const newStyle = this.doAction(false);
    this.element.classList.remove('Active');
    this.newStyleSet(newStyle);
  }

  keyDown() {
    this.element.classList.add('Active');
    const newStyle = this.doAction(true, this.keyCode, this.keyData.conditions);
    this.newStyleSet(newStyle);
  }

  keyUp() {
    const newStyle = this.doAction(false);
    this.element.classList.remove('Active');
    this.newStyleSet(newStyle);
  }

  doAction(down) {
    if (down) this.textarea.addValue(this.currentSymbol());
    const keyAction = this.keyData.action;
    if (keyAction) {
      const action = this.keyBoardStatus.actions[keyAction];
      if (action) {
        const newStyle = action.call(
          this.keyBoardStatus,
          down,
          this.keyCode,
          this.keyData.conditions,
        );
        if (newStyle) return newStyle;
      }
    }
    return '';
  }
}
