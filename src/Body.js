class Body {
    constructor ($el, cellSize) {
        this.node = $('<div class="tail"></div>');
        this.node.width(cellSize);
        this.node.height(cellSize);
        $el.append(this.node);
    }

    setPosition (position) {
        this.node.css(position);
    }
}