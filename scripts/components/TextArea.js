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

  delPrev() {
    const currentValue = this.element.value;
    this.element.value = currentValue.slice(0, -1);
  }

  delNext() {
    const currentValue = this.element.value;
    this.element.value = currentValue;
  }
}
