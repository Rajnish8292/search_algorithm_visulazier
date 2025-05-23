class stack {
    constructor()
    {
        this.array = [];
    }

    isEmpty() {
        return (this.array.length == 0);
    }

    push(elem) {
        this.array.push(elem);
    }

    pop() {
        return this.array.pop();
    }
    
    top() {
        return this.array[this.array.length-1];
    }
    size() {
        return this.array.length;
    }
}