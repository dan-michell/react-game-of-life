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
  console.log(grid);
  return (
    <div className="App">
      <div>{/* Display initial grid using a map and divs */}</div>
    </div>
  );
}

export default App;
