import { createSignal, For, Show } from 'solid-js';
import './style.css';

function App() {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = createSignal(emptyBoard);
  const [isXTurn, setIsXTurn] = createSignal(true);
  const [isDraw, setIsDraw] = createSignal(false);
  const [winner, setWinner] = createSignal(null);

  const handleClick = (index) => {
    if (board()[index] || winner()) return;

    const newBoard = [...board()];
    newBoard[index] = isXTurn() ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn());

     if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
      return;
    }

    const win = checkWinner(newBoard);
    if (win) setWinner(win);
  };

  const checkWinner = (z) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (z[a] && z[a] === z[b] && z[a] === z[c]) {
        return z[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div class="container">
      <h1>Tic Tac Toe 🕹️</h1>
      <div class="board">
        <For each={board()}>
          {(cell, i) => (
            <div class="cell" onClick={() => handleClick(i())}>
              {cell}
            </div>
          )}
        </For>
      </div>
      <Show when={winner()}>
        <div class="status">🎉 Winner: {winner()}</div>
      </Show>
      <Show when={isDraw()}>
        <div class="status">It's a Draw</div>
      </Show>
      <Show when={!winner() && !isDraw}>
        <div class="status">Turn: {isXTurn() ? 'X' : 'O'}</div>
      </Show>
      
      <button onClick={resetGame}>🔄 Reset Game</button>
    </div>
  );
}

export default App;
