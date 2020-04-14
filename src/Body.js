class Body {
    constructor ($el, position, size, next) {
        this.position = position;
        this.size = size;
        this.next = next;
        this.direction = null;

        this.node = $('<img class="body"></img>');
        this.node.width(size);
        this.node.height(size);
        if (!this.next){ //tail element
            this.node.attr('src', 'src/assets/snakeTail.gif');
        }
        $el.append(this.node);
    }

    update (direction) {
        //update position/direction
        if (this.direction) {
            //change position based on current direction
            this.position.top += this.size * Body.Directions[this.direction].top;
            this.position.left += this.size * Body.Directions[this.direction].left;

            //pass current direction to next body segment
            if (this.next){
                this.next.update(this.direction);
            }
        }
        this.direction = direction;
        
        //update dom object
        this.node.css(this.position);
        this.node.css("transform", `rotate(${Body.Rotations[this.direction]}deg)`);
        if (this.next){ //middle segment
            if (this.direction !== this.next.direction) { //turning segment
                this.node.attr('src', 'src/assets/snakeTurn.gif');

                // //invert horizontally when rotational difference between this segment and next segment is 270 degrees.
                let rotation = Body.Rotations[this.direction] - Body.Rotations[this.next.direction];
                if ((rotation < 0 ? rotation + 360 : rotation) % 360 === 270)
                    this.node.css("transform", this.node.css("transform") + "scaleX(-1)");

            } else { //straight segment
                this.node.attr('src', 'src/assets/snakeBody.gif');
            }
        }
    }

    isColliding(position) {
        if (this.position) {
            return position.left === this.position.left && position.top === this.position.top;
        }
        return false;
    }

    destroy () {
        this.node.remove();
        if (this.next) {
            this.next.destroy();
        }
    }
}
Body.Rotations = {
    "up": 0,
    "right": 90,
    "down": 180,
    "left": 270
};
Body.Directions = {
    "up": { top: -1, left: 0 },
    "right": { top: 0, left: 1 },
    "down": { top: 1, left: 0 },
    "left": { top: 0, left: -1 }
};