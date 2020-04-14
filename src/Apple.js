class Apple {

  constructor($el, cellSize) {
    this.node = $('<img id="apple"></img>');
    this.node.attr('src', 'src/assets/apple.jpg');
    this.node.width(cellSize);
    this.node.height(cellSize);
    $el.append(this.node);
    this.randomPos();
  }

  randomPos(head = null) {
    let cellSize = this.node.width();

    let newPos, top, left;
    do {
      let boardHeight = this.node.parent().height();
      let gridHeight = boardHeight / cellSize;
      top = Math.floor(Math.random() * (gridHeight - 1)) * cellSize;

      let boardWidth = this.node.parent().width();
      let gridWidth = boardWidth / cellSize;
      left = Math.floor(Math.random() * (gridWidth - 1)) * cellSize;

      newPos = {};
      newPos.top = top;
      newPos.left = left;
    } while(head && head.isColliding(newPos));

    this.node.css({ top: top, left: left });
  }
}
