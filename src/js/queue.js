class queue {
    constructor()
    {
        this.array = [];
    }

    enqueue(elem) {
        this.array.push(elem);
    }
    dqueue() {
        return this.array.shift();
    }
    isEmpty() {
        return (this.array.length == 0);
    }
    top()
    {
        return this.array[0];
    }
    back()
    {
        return this.array[this.array.length-1];
    }
    size()
    {
        return this.array.length;
    }
}