import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { IGame, ALLOWED_VALUES } from '../interfaces/IGame';
import { IPlayer } from '../interfaces/IPlayer';
import Storage from '../utils/Storage';

interface IBot {
  first: IPlayer;
  second: IPlayer;
}
const defaultValue = { score: 0, selection: '', status: '' }

export const Computer = ({ exit }: IGame) => {
  const [bot, setBotScore] = useState<IBot>(Storage.get('bot') || {
    first: defaultValue,
    second: defaultValue
  });

  const computeScore = useCallback(() => {
    const botSelection_1 = computerSelection();
    const botSelection_2 = computerSelection();
    if (
      (botSelection_1 === 'paper' && botSelection_2 === 'rock') ||
      (botSelection_1 === 'rock' && botSelection_2 === 'scissor') ||
      (botSelection_1 === 'scissor' && botSelection_2 === 'paper')
    ) {
      setBotScore({ ...bot, first: { score: bot.first.score + 1, selection: botSelection_1, status: 'won' } })
    } else if (botSelection_1 === botSelection_2) {
      setBotScore({
        first: { score: bot.first.score, selection: botSelection_1, status: 'draw' },
        second: { score: bot.second.score, selection: botSelection_2, status: 'draw' }
      });
    } else {
      setBotScore({ ...bot, second: { score: bot.second.score + 1, selection: botSelection_2, status: 'won' } })
    }
  }, [bot]);

  useEffect(() => {
    let timer = setTimeout(() => computeScore(), 2000);
    Storage.set(bot, 'bot');
    return () => {
      clearTimeout(timer)
    }
  }, [bot, computeScore]);

  const computerSelection = () => {
    const allowed_values = Object.keys(ALLOWED_VALUES);
    const random = Math.floor(Math.random() * allowed_values.length);
    return allowed_values[random];
  }

  return (
    <Fragment>
      <button className="exit" onClick={() => exit()}>Exit Game</button>
      <div className="score">
        <div className="player-score">
          <h2>Player 1</h2>
          <p>{bot.first.score}</p>
        </div>
        <div className="computer-score">
          <h2>Player 2</h2>
          <p>{bot.second.score}</p>
        </div>
      </div>
      <div className="match">
        <div className="hands">
          <img className="player-hand" src={`/assets/${bot.first.selection}.png`} alt={bot.first.selection} />
          <img className="computer-hand" src={`/assets/${bot.second.selection}.png`} alt={bot.second.selection} />
        </div>
      </div>
      <h2 className="result">{(bot.first.status === 'won' && 'Player 1 Won!') || (bot.second.status === 'won' && 'Player 2 Won!') || (bot.first.status === 'draw' && 'It\'s Draw!')}</h2>
    </Fragment>
  );
} 