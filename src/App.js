import { useEffect, useState } from 'react';
import './App.css';
import Board from './Board'
import Countdown from 'react-countdown'

function App() {
  const [score, setScore] = useState(0)
  // const [leftTime, setLeftTime] = useState(null)
  

  // useEffect(() => {
  //  const updateTime = () => {
  //   setLeftTime(new Date())
  //  }

  // //  updateTime()
  // }, [])

  const Completionist = () => {
    return(
      <div style={{display:'flex', flexDirection:'row', gap:'10px'}}>
        <span>Game Over</span>
        <button 
          className='restart' 
          onClick={handleRestart}
          style={
            {
              backgroundColor:'black',
              fontFamily:'Lobster',
              color:'wheat',
              border:'none',
              fontSize:'xx-large',
              cursor:'pointer'              
            }
          }
          >Restart</button>
      </div>
    )
  }

  const handleRestart = () => {
    setScore(0)
  }


  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  
  return (
    <div className='mainContainer'>
      <div className='header'>
        <div className='leftTime'>
          <p>Remaining Time: </p>
          <span><Countdown date={Date.now() + 5*1000} renderer={renderer} /></span>
        </div>
        <div className='user'><p>Rafa</p></div>
      </div>
      <div className='game'>
        <h1>Find the letter</h1>
        {score && (<h3>Score: {score}</h3>)}
        <div className='board'>
          <Board scoreChange={(newScore) => setScore(newScore)} />
        </div>
      </div>
    </div>
  );
}

export default App;
