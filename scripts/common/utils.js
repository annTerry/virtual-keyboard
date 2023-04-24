export const createElement = (nodeName, styles, textContent, childElements) => {
  const newNode = document.createElement(nodeName);
  if (styles) newNode.className = styles;
  if (textContent !== undefined) newNode.textContent = textContent;
  if (childElements && childElements.length > 0) {
    childElements.forEach((oneChild) => {
      newNode.append(oneChild);
    });
  }
  return newNode;
};

export const defaultText = '';
