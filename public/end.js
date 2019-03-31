function endState() {}

endState.prototype = {
  init: function(param) {
    this.score = param;
    game.stage.backgroundColor = "#09f";
    this.db = firebase.firestore();
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
  preload: function() {
    let users = {};
    this.db
      .collection("scores")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          user = doc.data()["user"];
          users[user] = doc.data()["score"];
        });
        // Create items array
        var items = Object.keys(users).map(function(key) {
          return [key, users[key]];
        });
        // Sort the array based on the second element
        items.sort(function(first, second) {
          return second[1] - first[1];
        });
        items = items.slice(0, 5);
        scores = "";
        items.forEach(arr => {
          scores += arr[1] + "                  " + arr[0] + "\n";
        });
        this.scoresText = game.add.text(
          window.innerWidth / 3,
          window.innerHeight / 2,
          scores,
          { font: "50px impact", fill: "#ffffff" }
        );
      })
      .catch(function(error) {
        console.log("Error getting SCORES: ", error);
      });
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
      .then(ref => {});
  },
  restart: function() {
    game.state.start("start");
  }
};
