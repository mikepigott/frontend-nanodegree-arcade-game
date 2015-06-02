var Character = function(sprite, startX, startY, speed) {
    this.sprite = sprite;
    this.x = startX;
    this.y = startY;
    this.speed = speed;
}

// Draw the character on the screen
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
    Character.call(this, 'images/enemy-bug.png', startX, startY, speed);
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(startX, startY, speed) {
  Character.call(this, 'images/char-boy.png', startX, startY, speed);
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(key) {
    if (!key) {
        return;
    }
    console.log("Received input: " + key);
    if (key == 'down') {
        this.y = this.y + 75;
    } else if (key == 'up') {
        this.y = this.y - 75;
    } else if (key == 'left') {
        this.x = this.x - 100;
    } else if (key == 'right') {
        this.x = this.x + 100;
    }
}

Player.prototype.update = function(dt) {

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array(new Enemy(0, 0, 0));
var player = new Player(100, 150, 0);

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
