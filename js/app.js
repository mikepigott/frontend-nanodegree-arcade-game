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
    if (player.won) {
        return;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 500) {
        this.x = -100;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(startX, startY, travelDistance) {
  Character.call(this, 'images/char-boy.png', startX, startY, 100, 100);
  this.travelDistance = travelDistance;
  this.startX = startX;
  this.startY = startY;
  this.won = false;
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(key) {
    if (!key || this.won) {
        return;
    }
    if ((key == 'down') && (this.y <= 400)) {
        this.y = this.y + this.travelDistance;
    } else if ((key == 'up') && (this.y >= 0)) {
        this.y = this.y - this.travelDistance;
    } else if ((key == 'left') && (this.x >= 25)) {
        this.x = this.x - this.travelDistance;
    } else if ((key == 'right') && (this.x <= 350)) {
        this.x = this.x + this.travelDistance;
    }
}

Player.prototype.update = function() {
    if (this.won) {
        return;
    }

    var playerTop = 75;

    for (var e = 0; e < allEnemies.length; e++) {
        var enemy = allEnemies[e];
        if (((enemy.x <= (this.x + this.width)) && ((enemy.x + enemy.width) >= this.x))
            && ((enemy.y <= (this.y + playerTop + this.height)) && ((enemy.y + enemy.height ) >= (this.y + playerTop)))) {

            this.x = this.startX;
            this.y = this.startY;
        }
    }

    if (this.y < 0) {
        console.log("Victory is mine, Trebek!");
        this.won = true;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array(new Enemy(0, 0, 101, 171, 50));
var player = new Player(75, 425, 25);

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
