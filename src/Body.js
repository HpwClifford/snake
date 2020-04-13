class Body {
    constructor ($el) {
        this.node = $('<div class="tail"></div>');
        $el.append(this.node);
    }

    setPosition (position) {
        this.node.css(position);
    }
}