var startState = {
  create: function() {
    game.stage.backgroundColor = "#09f";
    this.startText = game.add.text(
      window.innerWidth / 2 - 200,
      window.innerHeight / 2 - 100,
      "Select Your Difficulty",
      { font: "40px Impact", fill: "#ffffff" }
    );
    this.easyText = game.add.text(
      window.innerWidth / 2 - 200,
      window.innerHeight / 2 - 50,
      "Easy - E",
      { font: "30px Impact", fill: "#ffffff" }
    );
    this.hardText = game.add.text(
      window.innerWidth / 2 - 200,
      window.innerHeight / 2,
      "Hard - H",
      { font: "30px Impact", fill: "#ffffff" }
    );
    this.memeText = game.add.text(
      window.innerWidth / 2 - 200,
      window.innerHeight / 2 + 50,
      "Meme - M",
      { font: "30px Impact", fill: "#ffffff" }
    );
    var eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    eKey.onDown.addOnce(this.easyStart, this);
    var hKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
    hKey.onDown.addOnce(this.hardStart, this);
    var mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    mKey.onDown.addOnce(this.memeStart, this);
  },
  easyStart: function() {
    game.state.start("main", true, false, "easy");
  },
  hardStart: function() {
    game.state.start("main", true, false, "hard");
  },
  memeStart: function() {
    game.state.start("main", true, false, "meme");
  }
};
