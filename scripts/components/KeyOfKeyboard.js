import KEYS_DATA from '../common/keysData.js';

export default class KeyOfKeyboard {
  element = document.createElement('button');

  textarea;

  keyData;

  constructor(keyCode, textarea) {
    this.textarea = textarea;
    const keyData = KEYS_DATA[keyCode];
    this.keyData = keyData;
    if (keyData) {
      this.element.className = 'keyboard__one-key';
      this.element.textContent = this.currentSymbol();
    } else {
      console.log('Wrong data key', keyCode);
    }
  }

  currentSymbol() {
    return this.keyData.title || this.keyData.default;
  }

  keyDown() {
    const click = new Audio();
    click.src = '../../assets/audio/click.mp3';
    click.onload = click.play();
    this.element.classList.add('Active');
    this.textarea.addValue(this.currentSymbol());
  }

  keyUp() {
    this.element.classList.remove('Active');
  }
}
