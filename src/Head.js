// creates a constructor function - research ES6 classes
class Head {

  // this is what's called when you use the "new" keyword
  constructor($el, apple) {
    this.node = $('<div id="head"></div>');
    this.currentDirection = 'right';
    this.SPEED = 500;
    this.tail = [];
    this.apple = apple;
    $el.append(this.node);
    this.node.css({ top: 0, left: 0 });
    setTimeout(this.move.bind(this), this.SPEED);
  }

  // same as Head.prototype.move = function() {...}
  move() {
    let direction = this.currentDirection;
    let position = this.node.position();
    let headSize = this.node.width();

    if (this.isColliding(position, false)) return;

    if (direction === 'right') {
      position.left += headSize;
    } else if (direction === 'left') {
      position.left -= headSize;
    } else if (direction === 'up') {
      position.top -= headSize;
    } else if (direction === 'down') {
      position.top += headSize;
    }

    let board = this.node.parent();
    let width = board.width();
    let height = board.height();
    if (position.left > width - 50 || position.left < 0 || position.top > height - 50 || position.top < 0) {
      // edge hit
      return;
    }

    let apple = $("#apple");
    if (apple.position().top === position.top && apple.position().left === position.left) {
      let last; 
      if (this.tail.length) {
        last = this.tail[this.tail.length - 1].node;
      } else {
        last = this.node;
      }

      let lastPos = last.position();
      let segment = new Body(board);
      segment.setPosition(lastPos);
      this.tail.push(segment);
      this.apple.randomPos(this);
    }

    let prevPosition = this.node.position();
    this.tail.forEach(segment => {
      let temp = segment.node.position();
      segment.node.css(prevPosition);
      prevPosition = temp;
    });

    this.node.css(position);
    setTimeout(this.move.bind(this), this.SPEED);
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
}
