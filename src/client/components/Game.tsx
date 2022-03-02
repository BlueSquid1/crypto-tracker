import * as React from "react";
import * as board from "./Board";
import * as square from "./Square";
import * as moveHistory from "./MoveHistory";

export interface Position {
    col : number,
    row : number
}

interface GameState {
    history : moveHistory.History[];
    xIsNext : boolean;
    stepNumber : number;
}

export class Game extends React.Component <any, GameState, {}> {
    constructor(props : any)
    {
        super(props)

        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0
        }
    }

    handleClick(i : number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(squares[i] || calculateWinner(squares)) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    jumpTo(move : number) {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) == 0
        })
    }

    override render() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Current player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <React.Fragment>
                <div className="header">{status}</div>
                <div className="game">
                    <div className="game-board">
                        <board.Board
                            squares={current.squares}
                            onClick={(i: number) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <moveHistory.MoveHistory
                            history={history}
                            onClick={(i: number) => this.jumpTo(i)}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function calculateWinner(squares : square.MarkUnion[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
  }