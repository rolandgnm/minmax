
class Minmax {
  constructor (ply) {
    this.ply = ply;

  }

  bestMove(s, player, opponent){
    this.original = new Player(player.val);
    this.opponent = new Player(opponent.val);
    this.state = new GameState(s.state);

    var me = this.minimax(this.state, this.ply, player, opponent);
    return me.move;
  }

  minimax(state, ply, player, opponent) {
    var s = new GameState(state.state);
    var best = new MoveEvaluation({move: null, score: null});

    if(ply === 0 || (!s.getNextValidMove() && s.getNextValidMove() !==0 ) ) {
      return new MoveEvaluation({move: null, score: this.original.eval(s)});
    }

    var m = s.getNextValidMove();
    while (m || m === 0) {
       s.executeMove(m, player.val);
       var me = this.minimax(s, ply-1, opponent, player);
       s.undoMove(m);

       if(player.val === this.original.val){
         if(me.score > best.score) best = new MoveEvaluation({
           move: m
          ,score: me.score});
       } else {
         if(me.score < best.score) best = new MoveEvaluation({
           move: m
          ,score: me.score});
       }
       return best;
    }

  }

}

// Trata o mapa do jogo como vetor linear
class MoveEvaluation {
  constructor (obj) {
    this.move = obj.move;
    this.score = obj.score;
  }
}

class GameState {
  constructor(gamearray){
    this.state = gamearray.slice(0);
  }

  getNextValidMove(){
    var next = this.state.findIndex((curr, idx) => {
      if(curr === 0) {
        return true;
      }});

    if (next !== -1) {
      return next;
    } else {
      return false;
    }
  }

  executeMove(movePosition, value) {
    this.state[movePosition] = value;
  }

  undoMove(movePosition){
    this.state[movePosition] = 0;
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

  eval(state) {
    if (
      (state[0] == this.val && state[1] == this.val && state[2] == this.val) ||
      (state[3] == this.val && state[4] == this.val && state[5] == this.val) ||
      (state[6] == this.val && state[7] == this.val && state[8] == this.val) ||
      (state[0] == this.val && state[3] == this.val && state[6] == this.val) ||
      (state[1] == this.val && state[4] == this.val && state[7] == this.val) ||
      (state[2] == this.val && state[5] == this.val && state[8] == this.val) ||
      (state[0] == this.val && state[4] == this.val && state[8] == this.val) ||
      (state[2] == this.val && state[4] == this.val && state[6] == this.val)
    ) {
      return 10;
    } else if (
      (state[0] == this.opponent && state[1] == this.opponent && state[2] == this.opponent) ||
      (state[3] == this.opponent && state[4] == this.opponent && state[5] == this.opponent) ||
      (state[6] == this.opponent && state[7] == this.opponent && state[8] == this.opponent) ||
      (state[0] == this.opponent && state[3] == this.opponent && state[6] == this.opponent) ||
      (state[1] == this.opponent && state[4] == this.opponent && state[7] == this.opponent) ||
      (state[2] == this.opponent && state[5] == this.opponent && state[8] == this.opponent) ||
      (state[0] == this.opponent && state[4] == this.opponent && state[8] == this.opponent) ||
      (state[2] == this.opponent && state[4] == this.opponent && state[6] == this.opponent)
    ) {
    return -10;
    } else {
      return 0;
    }
  }
}//eof


var human = new Player(1);
var comp = new Player(2);

var min = new Minmax(50000);

var vOri = [0,0,0,
            0,0,0,
            0,0,0];

var vDraw = [1,0,1,
             0,2,0,
             0,1,0];


var gameStateOri = new GameState([0,0,0,0,0,0,0,0,0]);
var gameStateAny = new GameState(vDraw);

var nextMove = min.bestMove(gameStateAny, comp, human);

