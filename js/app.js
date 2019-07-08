// Enemies our player must avoid
var Enemy = function(laneNumber) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // the width and height of an enemy
    this.width = 95;
    this.height = 70;
    
    // initialise an enemy's starting position
    this.x = -101;
    this.y = (85 * laneNumber) - 30;
    
    // get random integer between min and max int parameter
    this.getRandomInt = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // get random movement speed multiplier
    this.randomSpeedMultiplier = this.getRandomInt(3,5) * 100;
    
    // the game platform  border of the x axis for the enemy
    this.xMin = -101;
    this.xMax = 101 * 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // move the enemy to the right based on dt parameter and random speed multiplier
    this.x += dt * this.randomSpeedMultiplier;
    
    // check for collision with player
    this.checkForCollision();
    
    // if enemy has exit the game platform 
    if(this.x >= this.xMax){
        // reset enemy to starting position off left of the game platform for the next run
        this.x = this.xMin
        // randomly change the enemy's movement speed for the next run
        this.randomSpeedMultiplier = this.getRandomInt(2,5) * 100;
        // randomly change enemy's lane position for the next run
        this.y = (85 * this.getRandomInt(1,3)) - 30;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if an enemy has collided with the player
Enemy.prototype.checkForCollision = function(){
    // if the enemy collides with the player
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x + player.width/2 &&
        this.y < player.y + player.height &&
        this.y + this.height > player.y + player.height/2){
        // reset the player's position to the player's starting position
        player.resetPosition()
    } 
    
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    
    // the width and height of the player
    this.width = 70;
    this.height = 80;
    
    // the player's starting position
    this.startingX = 101 * 2;
    this.startingY = -30 + (85 * 5);
    
    // initialise the player's starting position
    this.x = this.startingX;
    this.y = this.startingY;
    
    // space of one square (block) on x-axis
    this.dx = 101;
    // space of one square (block) on y-axis
    this.dy = 85;
    
    // the game platform border of the x axis for the player
    this.xMin = 0;
    this.xMax = 101 * 4;
    
    // the game platform border of the y axis for the player
    this.yMax = -30 + (85 * 0);
    this.yMin = -30 + (85 * 5);
    
    // player wins at this y-axis position
    this.yWin = -30 + (85 * 1);
};

// Update the player's position, required method for game
Player.prototype.update = function(){};

// Draw the player on the screen, required method for game
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the player input arrow key
Player.prototype.handleInput = function(key){
    // if the player input left arrow key and the player's position has not reached the left border of the game platform, move the player's position to the left by one square (block)
    if(key == 'left' && this.x > this.xMin){
        this.x -= this.dx;
    }
    // if the player input right arrow key and the player's position has not reached the right border of the game platform, move the player's position to the right by one square (block)
    else if(key == 'right' && this.x < this.xMax){
        this.x += this.dx;
    }
    // if the player input up arrow key
    else if(key == 'up'){
        // if the player has reached the water, the player has won. Reset player positon to player's starting position.
        if(this.y <= this.yWin){
            this.resetPosition();
        }
        // if the player's position has not reached the top border of the game platform or has not reached the water, move the player's position to the top by one square (block)
        else if(this.y > this.yMax){
            this.y -= this.dy;
        }
    }
    // if the player input down arrow key and the player's position has not reached the bottom border of the game platform, move the player's position to the bottom by one square (block)
    else if(key == 'down' && this.y < this.yMin){
        this.y += this.dy;
    }
    // update the player's position
    this.update();
}

// reset player positon to player's starting position
Player.prototype.resetPosition = function(){
    this.x = this.startingX;
    this.y = this.startingY;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [
    // enemy start at lane 1
    new Enemy(1),
    // enemy start at lane 2
    new Enemy(2),
    // enemy start at lane 3
    new Enemy(3),
];



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
