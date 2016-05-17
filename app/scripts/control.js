var control = {};

control.vState = [0,0,0,
                  0,0,0,
                  0,0,0];

control.human = new Player(1,2);
control.comp = new Player(2,1);
control.min = new Alphabeta(8);

control.gameState = new GameState(control.vState);
control.CnextMove = control.min.bestMove(control.gameState, control.comp, control.human);
console.log('%cC ' + control.CnextMove, "color:orange;font-size: 16pt" )
