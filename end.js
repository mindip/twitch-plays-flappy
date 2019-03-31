var endState = {
    create: function() {
        game.stage.backgroundColor = "#09f";
        this.labelScore = game.add.text(window.innerWidth/2, window.innerHeight/2, "Game Over", { font: "50px Arial", fill: "#ffffff" });
        this.restartText = game.add.text(window.innerWidth/2 - 200, window.innerHeight/2 + 100, "Press Space to Restart", { font: "50px Arial", fill: "#ffffff" });
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.restart, this);
    },
    restart: function() {
        game.state.start("start");   
    }
};
