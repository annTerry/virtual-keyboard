class OneKey {
  main = '';

  shift = '';

  constructor(keyCode, keyValue, keyProperty) {
    this.key = document.createElement('div');
    this.key.id = keyCode;
    this.key.innerHTML = `<span class="main-key">${keyValue.toUpperCase()}</span>`;
    this.key.classList.add('onekey');
    if (keyProperty && keyProperty.size) {
      this.key.classList.add(keyProperty.size);
    }
    if (keyProperty && keyProperty.shift) {
      this.key.innerHTML += `<span class="shift">${keyProperty.shift}</span>`;
    }
  }

  thisElement() {
    return this.key;
  }

  setNew(main, shift) {
    if (main) {
      this.key.innerHTML = `<span class="main-key">${main.toUpperCase()}</span>`;
      if (shift) {
        this.key.innerHTML += `<span class="shift">${shift}</span>`;
      }
      this.main = main;
      this.shift = shift;
    }
  }
}
export default OneKey;
