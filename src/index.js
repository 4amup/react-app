import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
    className = "square"
    style = {{backgroundColor:( props.lightFlag ? 'yellow' : '' )}}
    onClick = {props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      key = {i}
      value={this.props.squares[i]}
      lightFlag = {this.props.causewin.indexOf(i) !== -1 ? true : false}
      onClick={() => this.props.onClick(i)}
    />;
  }
  
  render() {
    const boardRows = [];
    for (let x = 0; x < 3; x++) {
      const squares = [];
      for (let y = 0; y < 3; y++) {
        squares.push(this.renderSquare(x*3+y));//实现累加
      }
      boardRows.push(<div key={x} className="board-row">{squares}</div>)
    }
    return (
      <div>
        {boardRows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        location: null,
        winner: null,
        causewin: Array(3).fill(null),
      }],
      winner: {
        who: null,
        causewin: Array(3).fill(null),
      },
      xIsNext: true,
      stepNumber: 0,
      ascending: true,
    }
  }
  // 监听方法
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const location = [ i % 3 + 1, Math.floor(i / 3) + 1];//点选格子的坐标(col,row)
    
    // 判断赢家
    if (calculateWinner(squares).who || squares[i]) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        location: location,
        winner: calculateWinner(squares).who,
        causewin: calculateWinner(squares).causewin,
      }]),
      winner: calculateWinner(squares),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  sortMoveList() {
    this.setState({
      ascending: this.state.ascending ? false : true,
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = current.winner;
    const causewin = current.causewin;

    const moves = history.map((step, move) => {//参数意义：当前元素、当前元素的索引、数组本身
      const desc = move ?
        'Go to move #' + move + ',Location:(' + step.location[0] + ',' + step.location[1] + ')':
        'Go to game start';
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            // 02 使用style直接表示，判断是否是当前点击的步骤
            style = {{fontWeight:(move === this.state.stepNumber) ? "bolder" : "normal"}}
          >{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = `winner:${winner}, cause win is ${causewin}`;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            causewin={current.causewin}
          />
        </div>
        <div className="game-info">
          <label>排序切换：</label>
          <button
            onClick = {() => this.sortMoveList()}
          >toggle to {this.state.ascending ? 'ascending' : 'descending'}
          </button>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    // 同行
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // 同列
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // 对角
    [0, 4, 8],
    [2, 4, 6],
  ];
  // 算法：比较
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // return squares[a];//返回的就是winner
      return {
        who: squares[a],
        causewin: [a, b, c],
      }
    }
  }
  return {
    who: null,
    causewin: Array(3).fill(null),
  };
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);