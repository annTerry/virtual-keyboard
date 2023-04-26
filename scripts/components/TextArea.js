import { createElement } from '../common/utils.js';

export default class TextArea {
  element = createElement('textarea', 'main-textarea');

  constructor() {
    this.element.className = 'main-textarea';
  }

  create() {
    document.body.append(this.element);
  }

  addValue(text) {
    this.element.value += text;
  }
}
