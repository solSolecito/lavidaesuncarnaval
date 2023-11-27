export default function findElement (
  wrapper,
  tagName = 'div',
  id = '',
  className = '',
  content = ''
) {
  let element = id
    ? document.getElementById(id)
    : document.getElementsByTagName(tagName)[0]
  if (!element) {
    element = document.createElement(tagName)
    if (id) {
      element.setAttribute('id', id)
    }
    if (content) {
      const textNode = document.createTextNode(content)
      element.appendChild(textNode)
    }
    if (className) {
      element.classList.add(className)
    }
    wrapper.appendChild(element)
  }
  return element
}
