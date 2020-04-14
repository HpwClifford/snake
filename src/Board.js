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

        // create gameover
        this.popup = $(`
            <div id="popup">
                <h1>You Lose!</h1>
                <button>Play Again</button>
            </div>
        `);
        this.popup.css('display', 'none');
        this.node.append(this.popup);

        $('#popup button').on('click', () => {
            this.popup.css('display', 'none');
            this.begin();
        });
        
        this.begin();
    }

    begin () {
        if (this.apple) {
            this.apple.destroy();
            this.snake.destroy();
            this.speed = 500;
        }

        // initialize apple + snake
        this.apple = new Apple(this.node, this.cellSize);
        this.snake = new Head(this.node, this.cellSize);
        this.moveApple();

        this.update();
    }

    update () {
        //check for collision between snake and apple
        if (this.snake.isColliding(this.apple.node.position())) {
            this.snake.grow();
            this.moveApple();
            this.speed *= 0.9;
        }

        // update snake position and check for collision with boundries
        if (!this.snake.update() || !this.inBounds(this.snake.node.position())) {
            // GAME OVER
            this.popup.css('display', 'flex');
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

    moveApple () {
        let newPos;
        do {
            // generate random position within board bounds
            newPos = {
                top: Math.floor(Math.random() * ((this.height / this.cellSize) - 1)) * this.cellSize,
                left: Math.floor(Math.random() * ((this.width / this.cellSize) - 1)) * this.cellSize
            };
        // while position isn't valid
        } while (this.snake.isColliding(newPos));

        // when valid, set new apple position
        this.apple.setPosition(newPos);
    }
}