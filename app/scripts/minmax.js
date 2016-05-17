// Score heuristic Based on:
// Nils J. Nilson. Artificial Intelligence, a new syntheses. 1998.

// Alphabeta Based on:
// George T Heineman; Stanley Selkow; Gary Pollice,
//    Algorithms in a nutshell. 2009.

class Alphabeta {
  constructor (ply) {
    this.ply = ply;

  }

  bestMove (s, player, opponent){
    this.state = new GameState(s.state)
    // this.best = new MoveEvaluation(null, null);
    var me = this.alphabeta(this.ply, player, opponent, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER );
//     var me = this.alphabeta(this.ply, player, opponent, -1, 1 );

    return me.move;
  }

  alphabeta(ply, player, opponent, low, high) {
    var s = this.state;
    var it = s.getNextValidMoves();
    if(ply === 0 || !it.length ) {
      return new MoveEvaluation(undefined, player.eval(s));
    }

    // this.best = new MoveEvaluation(null, low);
    var best = new MoveEvaluation(undefined, low);
    while (it.length) {
       var mov = it.shift();
       s.executeMove(mov, player.val);
       this.plyCount = ++this.plyCount || 1; // STATS Purpose.
       var me  = this.alphabeta(ply-1, opponent, player, -high, -low);
       //
//        console.log(s.state[0]+""+s.state[1]+""+s.state[2]+"\n"+
//                    s.state[3]+""+s.state[4]+""+s.state[5]+"\n"+
//                    s.state[6]+""+s.state[7]+""+s.state[8]
//                    +"\n\nplayer "+player.val
//                    +"\n\ncurr mov "+mov
//                    +"\n\nscore "+ -me.score
//                    +"\n\nbest.mov "+best.mov)
//        //
       s.undoMove(mov);

       if((-me.score) > low){
         low = -me.score;
         best = new MoveEvaluation(mov, low);
       }

       if(low >= high) {
         return best;
       }

    }
    return best;
  }

}

// Trata o mapa do jogo como vetor linear
class MoveEvaluation {
  constructor (move, score) {
    this.move = move;
    this.score = score;
  }
}

class GameState {
  constructor(gamearray){
    this.state = gamearray.slice(0);
  }

  isTerminalState(){
    if(
        (this.state[0] !== 0 && this.state[0] == this.state[1] && this.state[1] == this.state[2]) ||
        (this.state[3] !== 0 && this.state[3] == this.state[4] && this.state[4] == this.state[5]) ||
        (this.state[6] !== 0 && this.state[6] == this.state[7] && this.state[7] == this.state[8]) ||
        (this.state[0] !== 0 && this.state[0] == this.state[3] && this.state[3] == this.state[6]) ||
        (this.state[1] !== 0 && this.state[1] == this.state[4] && this.state[4] == this.state[7]) ||
        (this.state[2] !== 0 && this.state[2] == this.state[5] && this.state[5] == this.state[8]) ||
        (this.state[0] !== 0 && this.state[0] == this.state[4] && this.state[4] == this.state[8]) ||
        (this.state[2] !== 0 && this.state[2] == this.state[4] && this.state[4] == this.state[6])
    ) return true;
    else return false;
  }


  getNextValidMoves(){
    if(this.isTerminalState()) return [];
    else {
    var indexes = [], i;
    for(i = 0; i < this.state.length; i++)
        if (this.state[i] === 0)
            indexes.push(i);
    return indexes;
    }
  }

  executeMove(movePosition, value) {
    this.state[movePosition] = value;
  }

  undoMove(movePosition){
    this.state[movePosition] = 0;
  }

  toString(){
    return this.state[0]+""+this.state[1]+""+this.state[2]+"\n"+
           this.state[3]+""+this.state[4]+""+this.state[5]+"\n"+
           this.state[6]+""+this.state[7]+""+this.state[8]
  }

}


class Player {
  constructor (playerNum) {
    if(playerNum === 1) {
      this.val = playerNum;
      this.opponent = 2;
    } else if (playerNum === 2) {
      this.val = playerNum;
      this.opponent = 1;
    }
  }

  checkWin(playerValue) {
    if (
        ( this.stateArray[0] == playerValue && this.stateArray[1] == playerValue && this.stateArray[2] == playerValue ) ||
        ( this.stateArray[3] == playerValue && this.stateArray[4] == playerValue && this.stateArray[5] == playerValue ) ||
        ( this.stateArray[6] == playerValue && this.stateArray[7] == playerValue && this.stateArray[8] == playerValue ) ||
        ( this.stateArray[0] == playerValue && this.stateArray[3] == playerValue && this.stateArray[6] == playerValue ) ||
        ( this.stateArray[1] == playerValue && this.stateArray[4] == playerValue && this.stateArray[7] == playerValue ) ||
        ( this.stateArray[2] == playerValue && this.stateArray[5] == playerValue && this.stateArray[8] == playerValue ) ||
        ( this.stateArray[0] == playerValue && this.stateArray[4] == playerValue && this.stateArray[8] == playerValue ) ||
        ( this.stateArray[2] == playerValue && this.stateArray[4] == playerValue && this.stateArray[6] == playerValue )
      ) return true;
      else return false;
  }

  countBLockedPaths(opponentVal) {
    var blockedPaths = 0;
    if ((this.stateArray[0] == opponentVal || this.stateArray[1] == opponentVal || this.stateArray[2] == opponentVal)) blockedPaths++;
    if ((this.stateArray[3] == opponentVal || this.stateArray[4] == opponentVal || this.stateArray[5] == opponentVal)) blockedPaths++;
    if ((this.stateArray[6] == opponentVal || this.stateArray[7] == opponentVal || this.stateArray[8] == opponentVal)) blockedPaths++;
    if ((this.stateArray[0] == opponentVal || this.stateArray[3] == opponentVal || this.stateArray[6] == opponentVal)) blockedPaths++;
    if ((this.stateArray[1] == opponentVal || this.stateArray[4] == opponentVal || this.stateArray[7] == opponentVal)) blockedPaths++;
    if ((this.stateArray[2] == opponentVal || this.stateArray[5] == opponentVal || this.stateArray[8] == opponentVal)) blockedPaths++;
    if ((this.stateArray[0] == opponentVal || this.stateArray[4] == opponentVal || this.stateArray[8] == opponentVal)) blockedPaths++;
    if ((this.stateArray[2] == opponentVal || this.stateArray[4] == opponentVal || this.stateArray[6] == opponentVal)) blockedPaths++;
    return blockedPaths;
  }

  countOpenPaths(playerValue, blockingValue) {
    var WINNING_PATHS = 8;
    return WINNING_PATHS - this.countBLockedPaths(blockingValue);

  }

  eval(gameState) {
    this.stateArray = gameState.state;
    if (this.checkWin(this.val))
      return Number.MAX_SAFE_INTEGER;
    else if (this.checkWin(this.opponent))
      return Number.MIN_SAFE_INTEGER;
    else
      return this.countOpenPaths(
        this.val, this.opponent) - this.countOpenPaths(this.opponent, this.val);
  }
}//eof


var human = new Player(1);
var comp = new Player(2);

var min = new Alphabeta(9);


var vState = [1,2,1,
              2,2,1,
              1,1,2];


//Testar caso de retornar undefined e haver posição.



var gameState = new GameState(vState);

var tie = comp.eval(gameState); console.log(tie);
var CnextMove = min.bestMove(gameState, comp, human); console.log('%cC ' + CnextMove, "color:orange;font-size: 16pt" )
// var HnextMove = min.bestMove(gameState, human, comp); console.log('H ' + HnextMove)
