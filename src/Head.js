class Head {
  constructor($el, size) {
    this.tail = null;
    this.size = size;
    this.position = { top: 0, left: 0};
    this.direction = 'right';
    this.nextDirection = 'right';

    this.node = $('<img id="head" src="src/assets/snakeHead.gif"></img>');
    this.node.width(size);
    this.node.height(size);
    $el.append(this.node);
    
    $('body').on('keydown', (e) => {
      let direction = Head.Keys[e.keyCode];
      if (direction !== undefined) {
        this.nextDirection = direction;
      }
    });
  }

  isColliding(position, checkHead = true) {
    let headPos = this.node.position();
    
    if (checkHead) {
      if (position.left === headPos.left && position.top === headPos.top) return true;
    }

    let segment = this.tail;
    while (segment) {
      if (segment.isColliding(position)) return true;
      segment = segment.next;
    }

    return false;
  }

  grow () {
    // create new tail segment
    this.tail = new Body(this.node.parent(), this.node.position(), this.node.width(), this.tail);
  }

  update () {
    //change direction to user requested direction if valid
    if (Math.abs(Body.Rotations[this.direction] - Body.Rotations[this.nextDirection]) !== 180) {
      this.node.css("transform", `rotate(${Body.Rotations[this.nextDirection]}deg)`);
      this.direction = this.nextDirection;
    }

    // update head position
    this.position.top += this.size * Body.Directions[this.direction].top;
    this.position.left += this.size * Body.Directions[this.direction].left;
    this.node.css(this.position);

    // update tail positions starting with 'neck'
    if (this.tail){
      this.tail.update(this.direction);
    }

    // return false if snake is colliding with itself
    return !this.isColliding(this.position, false);
  }

  destroy () {
    this.node.remove();
    if (this.tail) {
      this.tail.destroy();
    }
  }
}
Head.Keys = {
  "37": "left",
  "38": "up",
  "39": "right",
  "40": "down"
};
