import React, {useEffect, useState} from 'react'
import {data} from './data'

const Board = ({startGame, scoreChange}) => {

    const [board, setBoard] = useState({})
    const [score, setScore] = useState(0)
    const [hidden, setHidden] = useState({
        row:0,
        col:0,
        mainLetter:'',
        hiddenLetter:''
    })
    const [init, setInit] = useState(true)    
    const [newGame, setNewGame] = useState(false)

    useEffect(() => {
        const createboard = () => {
            const bRows = 5 + Math.round(Math.random() * 15);
            const bCols = 5 + Math.round(Math.random() * 15);

            console.log(`Rows: ${bRows} Cols: ${bCols}`)

            var randomData = Math.abs(Math.round(Math.random()*data.length)-1)
            console.log(randomData)            
            const lettersPair = data[randomData]            
            let boardArray = [];    
            let boardRow = [];


            const hiddenPosRow =Math.abs(Math.round(Math.random() * bRows) - 1)
            const hiddenPosCol = Math.abs(Math.round(Math.random() * bCols) - 1)
    
            try{
                for(let col = 0; col < bCols; col++){
                boardRow = []
                for(let row = 0; row < bRows; row++){
                    if(col === hiddenPosCol && row === hiddenPosRow){
                        boardRow.push(lettersPair.hidden);
                        console.log(row, hiddenPosRow, col,hiddenPosCol)
                    }                       
                    else
                        boardRow.push(lettersPair.main);
                }
                boardArray.push(boardRow)
                }
            } catch(ex) {
                console.log(ex)
                console.log(lettersPair)
            }
            

            const boardObj = {
                data:boardArray,
                letters:{
                    main:lettersPair.main,
                    hidden:lettersPair.hidden
                },
                hiddenPos:{
                    row:hiddenPosRow,
                    col:hiddenPosCol
                }
            }

            return boardObj;
        }
        if(init) setBoard(createboard());
        setInit(false)
        console.log(board)        
    }, [init, newGame])

    const handleClick  = (e) => {
        const posRow = e.target.getAttribute('data-row')
        const posCol = e.target.getAttribute('data-col')
        console.log(board.hiddenPos)
        console.log(posRow, posCol)
        if(parseInt(posRow) === board.hiddenPos.row && parseInt(posCol) === board.hiddenPos.col){
            alert('You found it!!')
            var newScore = score + 1
            setScore(newScore)
            scoreChange(newScore)
            console.log("SCORE: ", score)
            setInit(true)
        }
            

    }
    
  return (
    board.data && (
       <div className='boardContainer'>                    
        {board.data.map((row, colIdx) => (
            <div key={colIdx}>
            {row.map((item, rowIdx) => (
                <div data-row={rowIdx} data-col={colIdx} key={rowIdx} className='letterDiv' onClick={handleClick}>
                {item}  
             </div>
            ))}
            </div>
        ))}
    </div> 
    )    
  )
}

export default Board