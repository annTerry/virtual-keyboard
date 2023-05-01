import {
  STORE_NAME, DEFAULT_LANGUAGE, ALTER_LANGUAGE, LANG_LABEL,
} from '../common/const.js';
import { createElement } from '../common/utils.js';

export default class KeyboardStatus {
  capital = false;

  shift = false;

  currentDownMouse = null;

  language = window.localStorage.getItem(STORE_NAME) || DEFAULT_LANGUAGE;

  languageElement = createElement('div', 'language-label', LANG_LABEL[`label_${this.language}`]);

  conditions = [];

  textarea;

  actions = {
    changeLanguage: this.changeLanguage,
    backspace: this.backspace,
    capsLock: this.capsLock,
    enter: this.enter,
    shift: this.doShift,
    tab: this.doTab,
    del: this.doDel,
  };

  constructor(textarea, header) {
    this.textarea = textarea;
    this.header = header;
    this.header.setLanguage(this.language);
    document.body.append(this.languageElement);
  }

  modifiers() {
    const result = [];
    result.push(this.language);
    if (this.shift) result.push('shift');
    return result;
  }

  toCapital() {
    return (this.capital && !this.shift) || (!this.capital && this.shift);
  }

  changeLanguage(down, current, conditions) {
    if (down) {
      if (this.conditions.includes(current)) this.changeLanguageAction();
      else this.conditions = conditions;
    } else {
      this.conditions = [];
    }
  }

  changeLanguageAction() {
    this.language = this.language ? DEFAULT_LANGUAGE : ALTER_LANGUAGE;
    window.localStorage.setItem(STORE_NAME, this.language);
    this.header.setLanguage(this.language);
    this.languageElement.textContent = LANG_LABEL[`label_${this.language}`];
  }

  backspace(down) {
    if (down) {
      this.textarea.delPrev();
    }
  }

  doDel(down) {
    if (down) {
      this.textarea.delNext();
    }
  }

  capsLock(down) {
    if (down) this.capital = !this.capital;
    if (!down && this.capital) return { add: 'Set' };
    if (!down && !this.capital) return { remove: 'Set' };
    return '';
  }

  enter(down) {
    if (down) this.textarea.addValue('\n');
  }

  doShift() {
    this.shift = !this.shift;
  }

  doTab(down) {
    if (down) this.textarea.addValue('\t');
  }
}
