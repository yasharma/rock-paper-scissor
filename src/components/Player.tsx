import React, { Fragment, useState } from 'react';
import { IGame, ALLOWED_VALUES } from '../interfaces/IGame';
import rock from '../assets/rock.png';

export const Player = ({ exit }: IGame) => {
  const [player, setPlayerScore] = useState({ score: 0, selection: '' });
  const [computer, setComputerScore] = useState({ score: 0, selection: '' });
  const playerSelection = (value: string) => {
    const _computerSelection = computerSelection();
    if (
      (value === 'paper' && _computerSelection === 'rock') ||
      (value === 'rock' && _computerSelection === 'scissor') ||
      (value === 'scissor' && _computerSelection === 'paper')
    ) {
      setPlayerScore({ score: player.score + 1, selection: value });
      setComputerScore({ ...computer, selection: _computerSelection });
      console.log('Player Won!');
    } else if (value === _computerSelection) {
      console.log('Draw');
    } else {
      setComputerScore({ score: computer.score + 1, selection: _computerSelection });
      setPlayerScore({ ...player, selection: value });
      console.log('Computer Won!');
    }
  }
  const computerSelection = () => {
    const allowed_values = Object.keys(ALLOWED_VALUES);
    const random = Math.floor(Math.random() * allowed_values.length);
    return allowed_values[random];
  }
  return (
    <Fragment>
      <button onClick={() => exit()}>Exit Game</button>
      <div className="score">
        <div className="player-score">
          <h2>Player</h2>
          <p>{player.score}</p>
        </div>
        <div className="computer-score">
          <h2>Computer</h2>
          <p>{player.score}</p>
        </div>
      </div>
      <div className="match fadeOut">
        <h2 className="winner">Choose an option</h2>
        <div className="hands">
          <img className="player-hand" src={rock} alt="" />
          <img className="computer-hand" src={rock} alt="" />
        </div>
        <div className="intro">
          <h1>Rock Paper and Scissors</h1>
        </div>
        <div className="options">
          {
            Object.keys(ALLOWED_VALUES).map(val =>
              (<button className={val} key={val} onClick={() => playerSelection(val)}>{ALLOWED_VALUES[val]}</button>))
          }
        </div>

      </div>

    </Fragment>
  );
} 