
function endState() {};

endState.prototype = {
	init: function(param){
		game.stage.backgroundColor = "#09f";
        this.scoreText = game.add.text(window.innerWidth/2, window.innerHeight/2 - 100, "0", { font: "50px fipp", fill: "#ffffff" });
        this.scoreText.text = param;
        this.gameOver = game.add.text(window.innerWidth/2, window.innerHeight/2, "Game Over", { font: "50px fipp", fill: "#ffffff" });
        this.restartText = game.add.text(window.innerWidth/2 - 200, window.innerHeight/2 + 100, "Press Space to Restart", { font: "50px fipp", fill: "#ffffff" });
        
	},
	create: function(){
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.restart, this);
	},
    restart: function() {
        game.state.start("start");   
    }
};