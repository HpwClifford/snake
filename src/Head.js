// creates a constructor function - research ES6 classes
class Head {

  // this is what's called when you use the "new" keyword
  constructor($el, cellSize) {
    this.tail = [];
    this.currentDirection = 'right';
    this.nextDirection = null;

    this.node = $('<div id="head"></div>');
    this.node.css({ top: 0, left: 0 });
    this.node.width(cellSize);
    this.node.height(cellSize);
    $el.append(this.node);
    
    $('body').on('keydown', (e) => {
      if (e.keyCode === 37) {
        this.nextDirection = 'left';
      } else if (e.keyCode === 38) {
        this.nextDirection = 'up';
      } else if (e.keyCode === 39) {
        this.nextDirection = 'right';
      } else if (e.keyCode === 40) {
        this.nextDirection = 'down';
      }
    });
  }

  setDirection (direction) {
    if (this.currentDirection === 'up' && direction === 'down') return;
    if (this.currentDirection === 'down' && direction === 'up') return;
    if (this.currentDirection === 'left' && direction === 'right') return;
    if (this.currentDirection === 'right' && direction === 'left') return;

    this.currentDirection = direction;
  }

  isColliding(position, checkHead = true) {
    let snakePos = {};

    if (checkHead) {
      let headPos = this.node.position();
      snakePos[`${headPos.top} ${headPos.left}`] = true;
    }

    for (let tailObj of this.tail) {
      let tailPos = tailObj.node.position();
      snakePos[`${tailPos.top} ${tailPos.left}`] = true;
    }

    const posString = position.top + ' ' + position.left;
    return snakePos[posString];
  }

  grow () {
    // create new tail segment
    let last; 
    if (this.tail.length) {
      last = this.tail[this.tail.length - 1].node;
    } else {
      last = this.node;
    }

    let lastPos = last.position();
    let segment = new Body(this.node.parent(), this.node.width());
    segment.setPosition(lastPos);
    this.tail.push(segment);
  }

  update () {
    let position = this.node.position();
    let headSize = this.node.width();

    this.setDirection(this.nextDirection);
    let direction = this.currentDirection;

    // update head position
    if (direction === 'right') {
        position.left += headSize;
    } else if (direction === 'left') {
        position.left -= headSize;
    } else if (direction === 'up') {
        position.top -= headSize;
    } else if (direction === 'down') {
        position.top += headSize;
    }

    // is head colliding with body
    if (this.isColliding(position, false)) return false;

    // update tail positions
    let prevPosition = this.node.position();
    this.tail.forEach(segment => {
      let temp = segment.node.position();
      segment.node.css(prevPosition);
      prevPosition = temp;
    });

    this.node.css(position);
    return true;
  }
}
