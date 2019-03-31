var game = new Phaser.Game(window.innerWidth, window.innerHeight);
game.state.add("start", startState);
game.state.add("main", mainState);
game.state.add("end", endState);
game.state.start("start");