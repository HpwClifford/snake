class Board {
    constructor (cellSize, width, height, speed) {
        this.apple = new Apple($('#board'));
        this.snake = new Head($('#board'), apple);
        this.node = $('<div id="board"></div>');
        this.speed = speed;
        this.update();
    }

    update () {
        

        setTimeout(this.update.bind(this), this.speed);
    }
}