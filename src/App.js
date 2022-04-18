import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [grid, setGrid] = useState(() => {
    const grid = [];
    for (let i = 0; i < 30; i++) {
      const row = [];
      for (let j = 0; j < 50; j++) {
        row.push(0);
      }
      grid.push(row);
    }
    return grid;
  });
  const [running, setRunning] = useState(false);

  useEffect(() => {
    simulateGame();
  }, [grid, running]);

  function addCell(e) {
    const newGrid = [...grid];
    const coords = e.target.id.split("-");
    if (newGrid[coords[0]][coords[1]]) {
      newGrid[coords[0]][coords[1]] = 0;
    } else {
      newGrid[coords[0]][coords[1]] = 1;
    }
    setGrid(newGrid);
  }

  async function simulateGame() {
    const directions = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];

    if (running) {
      let newCellGrid = JSON.parse(JSON.stringify(grid));
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          let numOfAlive = 0;
          directions.forEach(([x, y]) => {
            const newX = j + x;
            const newY = i + y;

            if (newX >= 0 && newY >= 0 && newX < grid[i].length && newY < grid.length) {
              if (grid[newY][newX] === 1) numOfAlive += 1;
            }
          });
          if (grid[i][j] === 1) {
            if (numOfAlive < 2 || numOfAlive > 3) {
              newCellGrid[i][j] = 0;
            }
          } else if (grid[i][j] === 0) {
            if (numOfAlive === 3) {
              newCellGrid[i][j] = 1;
            }
          }
        }
      }
      await timer(250);
      setGrid(newCellGrid);
    }
  }

  function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  return (
    <div className="App">
      <header>
        <h1>Game of Life</h1>
      </header>
      <button
        className="start-button"
        onClick={(e) => {
          setRunning(!running);
        }}
      >
        {running ? "Stop" : "Run"}
      </button>
      <div className="grid-wrapper">
        {grid.map((row, y) =>
          row.map((cell, x) => {
            return (
              <div
                key={`${y}-${x}`}
                id={`${y}-${x}`}
                onClick={(e) => {
                  addCell(e);
                }}
                className="cell"
                style={{ backgroundColor: grid[y][x] ? "#1cdd1a" : "white" }}
              ></div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
