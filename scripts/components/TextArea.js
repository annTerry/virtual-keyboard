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
    let currentValue = this.element.value;
    const cursor = this.cursorPoint();
    if (cursor.begin === cursor.end) {
      currentValue = currentValue.substring(0, cursor.begin) + text
                     + currentValue.substring(cursor.begin);
    } else if (cursor.begin !== cursor.end) {
      currentValue = currentValue.substring(0, cursor.begin) + text
      + currentValue.substring(cursor.end);
    } else return;
    this.setValue(currentValue, cursor.begin + text.length);
  }

  delPrev() {
    let currentValue = this.element.value;
    const cursor = this.cursorPoint();
    if (cursor.begin === cursor.end && cursor.begin > 0) {
      currentValue = currentValue.substring(0, cursor.begin - 1)
                     + currentValue.substring(cursor.begin);
    } else if (cursor.begin !== cursor.end) {
      currentValue = currentValue.substring(0, cursor.begin)
      + currentValue.substring(cursor.end);
    } else return;
    this.setValue(currentValue, cursor.begin - 1);
  }

  delNext() {
    let currentValue = this.element.value;
    const cursor = this.cursorPoint();
    if (cursor.begin === cursor.end && cursor.begin < currentValue.length) {
      currentValue = currentValue.substring(0, cursor.begin)
                     + currentValue.substring(cursor.begin + 1);
    } else if (cursor.begin !== cursor.end) {
      currentValue = currentValue.substring(0, cursor.begin)
      + currentValue.substring(cursor.end);
    } else return;
    this.setValue(currentValue, cursor.begin);
  }

  cursorPoint() {
    const cursorEnd = this.element.selectionEnd;
    const cursorBegin = this.element.selectionStart;
    return { begin: cursorBegin, end: cursorEnd };
  }

  setValue(currentValue, cursor) {
    this.element.value = currentValue;
    this.element.focus();
    if (cursor !== undefined) {
      this.element.selectionStart = cursor;
      this.element.selectionEnd = cursor;
    }
  }
}
