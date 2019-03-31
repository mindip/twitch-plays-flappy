
function endState() {};

endState.prototype = {
  init: function(param){
    game.stage.backgroundColor = "#09f";
    this.scoreText = game.add.text(window.innerWidth/2 - 300, window.innerHeight/2 - 200, "Your Score is: ", { font: "50px fipp", fill: "#ffffff" });
    this.scoreText.text = this.scoreText.text + param;
    this.gameOverText = game.add.text(window.innerWidth/2 - 200, window.innerHeight/2 - 100, "Game Over", { font: "50px fipp", fill: "#ffffff" });
    this.nameText = game.add.text(window.innerWidth/2 - 750, window.innerHeight/2 , "Press Enter to Join the Leaderboard", { font: "50px fipp", fill: "#ffffff" });
    this.restartText = game.add.text(window.innerWidth/2 - 450, window.innerHeight/2 + 100, "Press Space to Restart", { font: "50px fipp", fill: "#ffffff" });
  },
  create: function(){
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.getName, this);
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.restart, this);
  },
  getName: function(){
    var player = prompt("Please enter your name", "name");
  },
  restart: function() {
      game.state.start("start");   
  }
};