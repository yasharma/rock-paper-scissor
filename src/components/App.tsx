import React, { useState } from 'react';
import { Player } from './Player';
import Storage from '../utils/Storage';
import { Computer } from './Computer';

interface IGame { player: string }

const App = () => {
  const [game, setGame] = useState<IGame | undefined>(Storage.get<IGame>('game'));
  const gameChoice = (value: string) => {
    setGame({ player: value });
    Storage.set<IGame>({ player: value }, 'game');
  }
  const exitGame = () => {
    setGame(undefined);
    Storage.clearAll();
  }
  return (
    <section className="game">
      {game && game.player === 'bot' && <Computer exit={exitGame} />}
      {game && game.player === 'player' && <Player exit={exitGame} />}
      {!game && (
        <div className="intro">
          <h1>Rock Paper and Scissor</h1>
          <button onClick={() => gameChoice('player')}>Player vs Computer</button>
          <button onClick={() => gameChoice('bot')}>Computer vs Computer</button>
        </div>
      )}
    </section>
  );
}

export default App;
