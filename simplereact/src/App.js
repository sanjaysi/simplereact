import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player_one_symbol: 'X',
      player_two_symbol: 'O',
      gamestatus: 'new game',
      winningCombos: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]],
      currentTurn: 'X',
      board: [
        null,null,null,null,null,null,null,null,null
      ]
    };
    this.handleClick = this.handleClick.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
  }

  handleClick(index) {
    if (this.state.board[index] === null) {
      let new_board = this.state.board;
      new_board[index] = this.state.currentTurn;
      let new_currentTurn = this.state.currentTurn === this.state.player_one_symbol ? this.state.player_two_symbol : this.state.player_one_symbol;

      this.setState({
        board: new_board,
        currentTurn: new_currentTurn
      })
      if (this.checkForWinner()) {
        this.setState({gamestatus: 'Game over'});
      }
    }
  }

  checkForWinner() {
    let board = this.state.board;

    return (this.state.winningCombos.find(combo => this.checkmate(combo, board)));
  }

  checkmate(combo, board) {
    let [x, y, z] = combo;

    if ((board[x] === null) || (board[y] === null) || (board[z] === null)) {
      return false;
    } else if ((board[x] === board[y]) && (board[y] === board[z])) {
      return true;
    }
  }

  onClickStart() {
    let new_board = this.state.board;
    new_board.fill(null);
    this.setState({board: new_board});
    this.setState({gamestatus: 'New game'});
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-default" onClick={this.onClickStart}>Start Game</button> 
        <div>{this.state.gamestatus}</div>
        <div className="board">
          {
            this.state.board.map((cell, index) => {
              return <div key={index} onClick={() => this.handleClick(index)} className="square">{cell}</div>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
