import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [grid, setGrid] = useState(() => {
    const grid = [];
    for (let i = 0; i < 50; i++) {
      const row = [];
      for (let j = 0; j < 50; j++) {
        row.push(0);
      }
      grid.push(row);
    }
    return grid;
  });

  function addCell(e) {
    const newGrid = [...grid];
    const coords = e.target.id.split("-");
    newGrid[coords[0]][coords[1]] = 1;
    setGrid(newGrid);
  }

  return (
    <div className="App">
      <header>
        <h1>Game of Life</h1>
      </header>
      <button className="start-button">Start</button>
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
                style={{ backgroundColor: grid[y][x] ? "black" : "white" }}
              ></div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
