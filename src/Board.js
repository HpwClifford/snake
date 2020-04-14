class Board {
    constructor ($el, cellSize, width, height, speed) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.speed = speed;

        // create board jquery object
        this.node = $('<div id="board"></div>');
        this.node.width(width);
        this.node.height(height);
        $el.append(this.node);
        
        // initialize apple + snake
        this.apple = new Apple(this.node, cellSize);
        this.snake = new Head(this.node, cellSize);
        

        this.update();
    }

    update () {
        //check for collision between snake and apple
        if (this.snake.isColliding(this.apple.node.position())) {
            this.snake.grow();
            this.apple.randomPos();
        }

        // update snake position
        if (!this.snake.update()) {
            // GAME OVER
            console.log("game over1");
            return;
        }

        //check for collision with boundries
        if (!this.inBounds(this.snake.node.position())) {
            console.log(this.snake.node.position());
            console.log("game over2");
            // edge hit
            return;
        }

        setTimeout(this.update.bind(this), this.speed);
    }

    inBounds (position) {
        return position.left < this.width
            && position.left >= 0 
            && position.top < this.height
            && position.top >= 0;
    }
}