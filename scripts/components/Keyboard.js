import { createElement } from '../common/utils.js';

export default class Keyboard {
  element = createElement('div', 'keyboard-wrapper');

  textarea = null;

  constructor(textarea) {
    this.textarea = textarea;
    document.body.append(this.element);
  }

  start() {
    this.language = 'en';
  }
}
