import { Node } from "./Node.mjs";

//recorrido de profundidad y lista de adyacencia

class LinKedList {
  #head;
  #size;

  constructor() {
    this.#head = null;
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.#size) {
      let node = this.#head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return null;
  }
  add(value) {
    let newNode = new Node(value);
    console.log(" node :" + newNode.value);
    if (this.#head == null) {
      this.#head = newNode;
    } else {
      let current = this.#head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.#size++;
  }

  insert(value, index) {
    if (index < 0 || index > this.#size) return null;

    let newNode = new Node(value);
    let current = this.#head;
    let previous;

    if (index === 0) {
      newNode.next = current;
      this.#head = newNode;
    } else {
      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }
      newNode.next = current;
      previous.next = newNode;
    }
    this.#size++;
  }
}


export { LinKedList };
