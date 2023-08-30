import logo from "./logo.svg";
import "./App.css";
import Avatar from "./Avatar";
import { useState } from "react";

function App() {
  const [todos] = useState(["todo1", "todo2"]);
  return (
    <>
      {todos.map((v, idx) => (
        <li key={idx}>{v}</li>
      ))}
    </>
  );
}

export default App;
