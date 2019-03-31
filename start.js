var startState = {
	create: function(){
		game.stage.backgroundColor = "#09f";
		this.endText = game.add.text(window.innerWidth/2 - 200, window.innerHeight/2 - 100, "Press Space to Start", { font: "50px Arial", fill: "#ffffff" });
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.start, this);
	},
	start: function(){
		game.state.start("main");
	}
};