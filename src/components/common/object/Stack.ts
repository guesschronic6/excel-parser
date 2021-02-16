class Stack<T> {
  data: T[];
  top: number;

  constructor(stack?: Stack<T>) {
    this.data = [];
    this.top = 0;

    if (stack) {
      this.data = stack.data;
      this.top = stack.top;
    }
  }

  push(element: T) {
    this.data[this.top] = element;
    this.top = this.top + 1;
  }

  length() {
    return this.top;
  }

  peek() {
    return this.data[this.top - 1];
  }

  isEmpty() {
    return this.top === 0;
  }

  pop() {
    if (this.isEmpty() === false) {
      this.top = this.top - 1;
      return this.data.pop() as T; // removes the last element
    }
  }
}

export default Stack;
