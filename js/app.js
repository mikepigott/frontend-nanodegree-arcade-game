// All of the sprites have a lot of transparent space, so the height
// of the image does not reflect where it would collide with a player.
// Likewise, the topY and bottomY must be supplied to accurately determine
// when a bug hits a player.
//
// startX and startY represent the starting position of the character.
var Character = function(sprite, startX, startY, topY, bottomY) {
    this.sprite = sprite;
    this.x = startX;
    this.y = startY;
    this.topY = topY;
    this.bottomY = bottomY;
}

// Draw the character on the screen
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Verify there are no collisions between bugs and players.
// This must be called both when a bug is updated and a player
// is updated, so moving its behavior into the parent class.
Character.prototype.checkState = function() {
    var playerWidth = Resources.get(player.sprite).width;

    // Defeat.
    //
    // This cycles through all of the enemies to see if there are any collisions.
    // The if statement can be a little confusing, but it works out such that if
    // the enemy's leftmost pixel is smaller than the player's rightmost pixel, AND
    // the enemy's rightmost pixel is greater than the player's leftmost pixel, the
    // two are overlapping.  The same works in the vertical direction.
    for (var e = 0; e < allEnemies.length; e++) {
        var enemy = allEnemies[e];
        var enemyWidth = Resources.get(enemy.sprite).width;
        if (((enemy.x <= (player.x + playerWidth)) && ((enemy.x + enemyWidth) >= player.x))
            && (((enemy.y + enemy.topY) <= (player.y + player.bottomY)) && ((enemy.y + enemy.bottomY) >= (player.y + player.topY)))) {

            player.x = player.startX;
            player.y = player.startY;
        }
    }

    // Victory!
    if (player.y < 0) {
        player.x = player.startX;
        player.y = player.startY;
    }
}

// Enemies our player must avoid.
//
// The speed is how fast this particular enemy moves between updates.
var Enemy = function(startX, startY, topY, bottomY, speed) {
    Character.call(this, 'images/enemy-bug.png', startX, startY, topY, bottomY);
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

    this.checkState();
}

// travelDistance is how far the player moves in any direction when a key is pushed.
// sprites contains the various sprites a player may use while playing, and spriteIndex
// represents the current sprite in use.
var Player = function(startX, startY, topY, bottomY, travelDistance, sprites, spriteIndex) {
  Character.call(this, sprites[spriteIndex], startX, startY, topY, bottomY);
  this.travelDistance = travelDistance;
  this.startX = startX;
  this.startY = startY;
  this.sprites = sprites;
  this.spriteIndex = spriteIndex;
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

// Up, down, left, and right arrows move the player, while 'p' changes the character's sprite.
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
    } else if (key == 'player') {
        this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length;
        this.sprite = this.sprites[this.spriteIndex];
    }
}

Player.prototype.update = function() {
    this.checkState();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    // new Enemy(startX, startY, topY, bottomY, speed)
    new Enemy(0, 50,  77, 144,  50),
    new Enemy(0, 150, 77, 144,  75),
    new Enemy(0, 250, 77, 144, 100)
];

var player = buildPlayer(75, 425);

function buildPlayer(startX, startY) {
    var sprites = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
    // new Player(startX, startY, topY, bottomY, distanceTraveled, sprites, spriteIndex)
    return new Player(startX, startY, 63, 137, 25, sprites, 0);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'player'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
