class OneKey {
  constructor(keyCode, keyValue, keyProperty) {
    this.key = document.createElement('div');
    this.key.id = keyCode;
    this.key.innerHTML = keyValue.toUpperCase();
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
}
export default OneKey;
