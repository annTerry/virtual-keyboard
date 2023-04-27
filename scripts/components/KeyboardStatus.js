export default class KeyboardStatus {
  capital = false;

  shift = false;

  language = '';

  conditions = [];

  textarea;

  actions = {
    changeLanguage: this.changeLanguage,
    backspace: this.backspace,
    capsLock: this.capsLock,
    enter: this.enter,
    shift: this.doShift,
    tab: this.doTab,
  };

  constructor(language, textarea) {
    this.language = language;
    this.textarea = textarea;
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
    this.language = this.language ? '' : 'ru';
  }

  backspace(down) {
    if (down) {
      this.textarea.delPrev();
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
