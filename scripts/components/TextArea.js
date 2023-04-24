import { createElement } from '../common/utils.js';

export default class TextArea {
  element = createElement('textarea', 'main-textarea');

  constructor() {
    document.body.append(this.element);
  }
}
