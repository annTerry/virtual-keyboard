import { createElement } from '../common/utils.js';

export default class TextArea {
  element = createElement('textarea', 'main-textarea');

  constructor() {
    this.element.className = 'main-textarea';
  }

  create() {
    document.body.append(this.element);
    this.element.focus();
  }

  addValue(text) {
    this.element.value += text;
    this.element.focus();
    this.cursorPoint();
  }

  delPrev() {
    const currentValue = this.element.value;
    this.element.value = currentValue.slice(0, -1);
    this.element.focus();
    this.cursorPoint();
  }

  delNext() {
    const currentValue = this.element.value;
    this.element.value = currentValue;
    this.element.focus();
    this.cursorPoint();
  }

  cursorPoint() {
    const cursorEnd = this.element.selectionEnd;
    const cursorBegin = this.element.selectionBegin;
    console.log(cursorBegin, cursorEnd);
  }

  doSelect() {
    this.cursorPoint();
  }
}
