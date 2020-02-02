import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { IGame, ALLOWED_VALUES } from '../interfaces/IGame';

export const Computer = ({ exit }: IGame) => {
  const [bot, setBotScore] = useState({
    first: { score: 0, selection: '' },
    second: { score: 0, selection: '' }
  });

  const computeScore = useCallback(() => {
    const botSelection_1 = computerSelection();
    const botSelection_2 = computerSelection();
    if (
      (botSelection_1 === 'paper' && botSelection_2 === 'rock') ||
      (botSelection_1 === 'rock' && botSelection_2 === 'scissor') ||
      (botSelection_1 === 'scissor' && botSelection_2 === 'paper')
    ) {
      setBotScore({ ...bot, first: { score: bot.first.score + 1, selection: botSelection_1 } })
    } else if (botSelection_1 === botSelection_2) {
      setBotScore({ ...bot });
    } else {
      setBotScore({ ...bot, second: { score: bot.second.score + 1, selection: botSelection_2 } })
    }
  }, [bot]);

  useEffect(() => {
    let timer = setTimeout(() => computeScore(), 1000);
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
      <button onClick={() => exit()}>Exit Game</button>
      <h3>Bot First Score: {bot.first.score}</h3>
      <h3>Bot Second Score: {bot.second.score}</h3>
      <h4>Bot First Selection: {bot.first.selection}</h4>
      <h4>Bot Second Selection: {bot.second.selection}</h4>
    </Fragment>
  );
} 