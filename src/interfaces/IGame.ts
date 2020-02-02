export interface IGame {
  exit: () => void
}

export const ALLOWED_VALUES: { [key: string]: string } = {
  rock: 'Rock',
  paper: 'Paper',
  scissor: 'Scissor'
};