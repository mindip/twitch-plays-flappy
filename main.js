var enterKey;
var tabKey;

// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the images and sounds
        game.load.image('bird', 'assets/bird.png');  
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.  
        game.stage.backgroundColor = '#71c5cf';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
        tabKey.onDown.add(this.jump, this);

        this.score = 0;
        //this.player1 = "Player 1";
        //this.player2 = "Player 2";
        this.labelScore = game.add.text(190, 20, "0", { font: "30px Arial", fill: "#ffffff" });
        this.player1 = game.add.text(20, 20, "Player 1", { font: "20px Arial", fill: "#ffffff" });
        this.player2 = game.add.text(20, 20, "", { font: "20px Arial", fill: "#ffffff" });
    },
    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic   
        if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();

        if (tabKey.isDown){
            enterKey.onDown.add(this.jump, this);
            tabKey.onDown.remove(this.jump, this);
            this.player2.text = "Player 2";
            this.player1.text = "";
        }
        else if(enterKey.isDown){
            tabKey.onDown.add(this.jump, this);
            enterKey.onDown.remove(this.jump, this);
            this.player1.text = "Player 1";
            this.player2.text = "";
        }
    },
    jump: function() {
    // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },
    restartGame: function() {
    // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');