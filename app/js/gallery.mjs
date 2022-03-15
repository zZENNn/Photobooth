import { Card } from "./card.mjs";

export class Gallery {
  root;
  card;
 
  constructor(rootElement) {
    this.root = rootElement
    this.addCard()
    
  }

  addCard() {
    this.card = new Card(this.root,this.root.querySelector('template'))
    
  }
  addPicture(data) {
      this.card.isFull() && this.addCard();
      this.card.addPicture(data)
     
    
  
  }

  clear() {
    this.root.querySelectorAll('.card').forEach(element=>element.remove())
    this.addCard()
  }
}