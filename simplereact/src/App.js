import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player_one_symbol: 'X',
      player_two_symbol: 'O',
      winningCombos: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]],
      currentTurn: 'X',
      board: [
        "","","","","","","","",""
      ]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    if (this.state.board[index] === "") {
      let new_board = this.state.board;
      new_board[index] = this.state.currentTurn;
      let new_currentTurn = this.state.currentTurn === this.state.player_one_symbol ? this.state.player_two_symbol : this.state.player_one_symbol;

      this.setState({
        board: new_board,
        currentTurn: new_currentTurn
      })
      if (this.checkForWinner()) {
        alert('WON!!!');
      }
    }
  }

  checkForWinner() {
    let board = this.state.board;

    return this.state.winningCombos.find(function(combo) {
      if (board[combo[0]] === board[combo[1]] &&
            board[combo[1]] === board[combo[2]]) {
              return board[combo[0]];
          } else {
            return false;
          }
    })
  }

  render() {
    return (
      <div className="board">
        {
          this.state.board.map((cell, index) => {
            return <div key={index} onClick={() => this.handleClick(index)} className="square">{cell}</div>
          })
        }
      </div>
    );
  }
}

export default App;
