var Character = function(sprite, startX, startY, width, height) {
    this.sprite = sprite;
    this.x = startX;
    this.y = startY;
    this.width = width;
    this.height = height;
}

// Draw the character on the screen
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function(startX, startY, width, height, speed) {
    Character.call(this, 'images/enemy-bug.png', startX, startY, width, height);
    this.speed = speed;
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 500) {
        this.x = -100;
    }

    var isInWidth = ((this.x <= (player.x + player.width)) && ((this.x + this.width) >= player.x));
    var isInHeight = ((this.y <= (player.y + player.height)) && ((this.y + this.height ) >= player.y));

    if (isInWidth && isInHeight) {

        //console.log("Bug killed player!: Player: {x:" + player.x + " x + width: " + (player.x + player.width) + " y: " + player.y + " y + height: " + (player.y + player.height));
        //console.log("Bug killed player!:    Bug: {x:" + this.x + " x + width: " + (this.x + this.width) + " y: " + this.y + " y + height: " + (this.y + this.height));
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(startX, startY, width, height) {
  Character.call(this, 'images/char-boy.png', startX, startY, width, height);
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(key) {
    if (!key) {
        return;
    }
    console.log("Received input: " + key);
    if ((key == 'down') && (this.y <= 400)) {
        this.y = this.y + this.height;
    } else if ((key == 'up') && (this.y >= 0)) {
        this.y = this.y - this.height;
    } else if ((key == 'left') && (this.x >= 25)) {
        this.x = this.x - this.width;
    } else if ((key == 'right') && (this.x <= 350)) {
        this.x = this.x + this.width;
    }

    console.log("player.x = " + player.x + ", player.y = " + player.y);
}

Player.prototype.update = function() {
    for (var enemy in allEnemies) {
        if (((enemy.x <= (this.x + this.width)) && ((enemy.x + enemy.width) >= this.x))
            && ((enemy.y <= (this.y + this.height)) && ((enemy.y + enemy.height ) >= this.y))) {

            //console.log("Player committed suicide!");
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array(new Enemy(0, 0, 101, 171, 50));
var player = new Player(75, 425, 25, 25);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
