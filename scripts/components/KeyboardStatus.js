import { STORE_NAME, DEFAULT_LANGUAGE, ALTER_LANGUAGE } from '../common/const.js';

export default class KeyboardStatus {
  capital = false;

  shift = false;

  language = window.localStorage.getItem(STORE_NAME) || DEFAULT_LANGUAGE;

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
      if (!this.conditions.includes(current)) this.changeLanguageAction();
      else this.conditions = conditions;
    } else {
      this.conditions = [];
    }
  }

  changeLanguageAction() {
    this.language = this.language ? DEFAULT_LANGUAGE : ALTER_LANGUAGE;
    window.localStorage.setItem(STORE_NAME, this.language);
    this.header.setLanguage(this.language);
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
