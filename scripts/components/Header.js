import { HEADER } from '../common/const.js';
import { createElement } from '../common/utils.js';

export default class Header {
  language = '';

  element = createElement('header', 'header');

  setLanguage(language) {
    this.language = language;
    this.setHeader();
  }

  setHeader() {
    this.element.innerHTML = '';
    Object.entries(HEADER).forEach(([nodeName, nodeData]) => {
      const newElement = createElement(nodeName, nodeData.className, nodeData[`text_${this.language}`]);
      this.element.append(newElement);
    });
  }
}
