function endState() {}

endState.prototype = {
  init: function(param) {
    this.score = param;
    game.stage.backgroundColor = "#09f";
    this.db = firebase.firestore();
    this.db
      .collection("scores")
      .add({
        user: "asdawerawer",
        score: param
      })
      .then(ref => {
        console.log("SUCCESS");
      });
    this.scoreText = game.add.text(
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 - 200,
      "0",
      { font: "50px impact", fill: "#ffffff" }
    );
    this.userText = game.add.text(
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 - 150,
      "Press Enter to Join the Leaderboard",
      { font: "50px impact", fill: "#ffffff" }
    );
    this.scoreText.text = "YOUR SCORE   " + param;
    this.gameOver = game.add.text(
      window.innerWidth / 2 - 250,
      window.innerHeight / 2 - 250,
      "Game Over",
      { font: "50px impact", fill: "#ffffff" }
    );
    this.restartText = game.add.text(
      window.innerWidth / 2 - 300,
      window.innerHeight / 2 - 350,
      "Press Space to Restart",
      { font: "50px impact", fill: "#ffffff" }
    );
  },
  create: function() {
    var enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enter.onDown.addOnce(this.getName, this);
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.restart, this);
  },
  getName: function() {
    var player = prompt("PLEASE ENTER YOUR NAME ", "gene");
    this.db
      .collection("scores")
      .add({
        user: player,
        score: this.score
      })
      .then(ref => {
        console.log(player);
      });
  },
  restart: function() {
    game.state.start("start");
  }
};
