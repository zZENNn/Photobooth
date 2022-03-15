export class Card {
  root;
  container;
  template;

  constructor(container, template) {
       this.container = container
       this.template = template
       const clone = document.importNode(template.content,true)
       this.root = clone.firstElementChild
       this.container.insertBefore(clone, this.container.firstElementChild)
      
       
  }

  isFull() {
    return !this.getEmptyImageElement()
  }

  getEmptyImageElement() {
    return this.root.querySelector(':not([src])')
  }

  addPicture(data) {
    const image = this.getEmptyImageElement()
    image && image.setAttribute('src',data)
  }

}