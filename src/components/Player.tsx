import React, { Fragment, useState, useEffect } from 'react';
import { IGame, ALLOWED_VALUES } from '../interfaces/IGame';
import Storage from '../utils/Storage';
import { IPlayer } from '../interfaces/IPlayer';

const defaultValue = { score: 0, selection: '', status: '' }
export const Player = ({ exit }: IGame) => {
  /**
   * Redux could be used here
   */
  const playerFromStorage = Storage.get<IPlayer>('player');
  const botFromStorage = Storage.get<IPlayer>('bot');

  const [player, setPlayerScore] = useState<IPlayer>(playerFromStorage || defaultValue);
  const [bot, setbotScore] = useState<IPlayer>(botFromStorage || defaultValue);

  useEffect(() => {
    Storage.set(player, 'player');
    Storage.set(bot, 'bot');
  }, [player, bot])

  const playerSelection = (value: string) => {
    const _botSelection = botSelection();
    if (
      (value === 'paper' && _botSelection === 'rock') ||
      (value === 'rock' && _botSelection === 'scissor') ||
      (value === 'scissor' && _botSelection === 'paper')
    ) {
      setPlayerScore({ score: player.score + 1, selection: value, status: 'won' });
      setbotScore({ ...bot, selection: _botSelection, status: 'lose' });
    } else if (value === _botSelection) {
      setPlayerScore({ ...player, selection: value, status: 'draw' });
      setbotScore({ ...bot, selection: _botSelection, status: 'draw' });
    } else {
      setbotScore({ score: bot.score + 1, selection: _botSelection, status: 'won' });
      setPlayerScore({ ...player, selection: value, status: 'lose' });
    }
    
  }
  const botSelection = () => {
    const allowed_values = Object.keys(ALLOWED_VALUES);
    const random = Math.floor(Math.random() * allowed_values.length);
    return allowed_values[random];
  }
  return (
    <Fragment>
      <button className="exit" onClick={() => exit()}>Exit Game</button>
      <div className="score">
        <div className="player-score">
          <h2>You</h2>
          <p>{player.score}</p>
        </div>
        <div className="bot-score">
          <h2>bot</h2>
          <p>{bot.score}</p>
        </div>
      </div>
      <div className="match">

        <div className="hands">
          <img className="player-hand" src={`/assets/${player.selection}.png`} alt={player.selection} />
          <img className="bot-hand" src={`/assets/${bot.selection}.png`} alt={bot.selection} />
        </div>

        <div className="options">
          {
            Object.keys(ALLOWED_VALUES).map(val =>
              (<button className={val} key={val} onClick={() => playerSelection(val)}>{ALLOWED_VALUES[val]}</button>))
          }
        </div>

      </div>
      <h2 className="result">{(player.status === 'won' && 'You Won!') || (bot.status === 'won' && 'bot Won!') || (player.status === 'draw' && 'It\'s Draw!')}</h2>

    </Fragment>
  );
} 