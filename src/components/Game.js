import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(16).fill(null) }
            ]
        
        }
    }

    handleClick =(i) => {
        const history = this.state.history
        const current = history[history.length -1]
        const squares = current.squares 

        const winner = calculateWinner(squares)

        if( winner || squares[i]){
            return 
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat({
                squares:squares
            }),
            xIsNext : !this.state.xIsNext,
            stepNumber: history.length

        })
    }
 
    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        let status 
        const winner = calculateWinner(current.squares)
        if(winner){
            status = 'winner is' + winner
        }else{
            status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board 
                    clickAction = {(i) => this.handleClick(i)} 
                    squares= {current.squares}
                    />
                </div>
                <div className='game-info'>
                  <b> {status} </b>  
                </div>
            </div>
        )

    }

}

function calculateWinner(squares) {
    const possibilities = [
        [0,1,2],
        [1,2,3],
        [4,5,6],
        [5,6,7],
        [8,9,10],
        [9,10,11],
        [12,13,14],
        [13,14,15],
        [0,4,8],
        [4,8,12],
        [1,5,9],
        [5,9,13],
        [2,6,10],
        [6,10,14],
        [3,7,11],
        [7,11,15],
        [0,5,10],
        [2,5,8],
        [5,10,15],
        [3,6,9],
        [6,9,12],
        [7,10,13],
        [4,9,14],
        [1,6,11],
    ]

    for(let i =0; i< possibilities.length; i++){
        const [a,b,c] = possibilities[i]
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return squares[a]
        }
    }
    return null
}