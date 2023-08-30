import { useState } from "react";
import "./App.css";
import Grid from "./Grid/grid";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Grid numberOfCards={9} />
    </>
  );
}

export default App;
