// Author: Roland Gabriel @rolandgnm
// Score heuristic Based on:
// Nils J. Nilson, a new syntheses. 1998.
//    Artificial Intelligence

// Alphabeta Based on:
// George T Heineman; Stanley Selkow; Gary Pollice,
//    Algorithms in a nutshell. 2009.

class Alphabeta {
  constructor (ply) {
    // depth in tree the algo can go
    this.ply = ply;

  }

  // Requested every computer turn
  // @params: s: state, player: Player, opponent: Player
  // @return: position: Number (0~8)
  bestMove (s, player, opponent){
    this.state = new GameState(s.state)
    // MoveEvaluation {move, score}
    var me = this.alphabeta(this.ply, player, opponent, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER );

    return me.move;
  }

  // Recursive search
  // @params: ply: search depth, player: Player, opponent: Player, low: Number, high: Number
  // @return: MoveEvaluation
  alphabeta(ply, player, opponent, low, high) {
    var s = this.state;
    //return positions with 0 or [] if terminal state
    var it = s.getNextValidMoves();
    if(ply === 0 || !it.length ) {
      return new MoveEvaluation(undefined, player.eval(s));
    }

    var best = new MoveEvaluation(undefined, low);
    while (it.length) {
       var mov = it.shift();
       s.executeMove(mov, player.val);
       var me  = this.alphabeta(ply-1, opponent, player, -high, -low);
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

// glue a move to a score
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
  constructor (val, opponent) {
      this.val = val;
      this.opponent = opponent;
  }

  // Evaluate if this current player wins, loses or what is current
  // score if game is going to a draw.
  // @params: gameState: GameState
  // @return: Number.MAX_SAFE_INTEGER if wins,
  //          Number.MIN_SAFE_INTEGER if loses,
  //          -9 ~ 9 in case of Draw.
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
}
