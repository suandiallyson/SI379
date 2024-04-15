import logo from "./logo.svg";
import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      <AttendanceTracker />
    </div>
  );
}

function AttendanceTracker() {
  const [name, setName] = React.useState("");
  const [present, setPresent] = React.useState([]);
  const [absent, setAbsent] = React.useState([]);
  const inputRef = React.useRef();

  function addToPresent() {
    const name = inputRef.current.value;
    setPresent(present.concat(name));
    inputRef.current.value = '';
  }
  function addToAbsent() {
    const name = inputRef.current.value;
    setAbsent(absent.concat(name));
    inputRef.current.value = '';
  }
  return (<div>
        <strong>Present:</strong>
        <ul>
          {present.map(name => <li key={name}>{name}</li>)}
        </ul>
        <strong>Absent:</strong>
        <ul>
          {absent.map(name => <li key={name}>{name}</li>)}
        </ul>
        <input ref={inputRef} type="text" />
        <button onClick={addToPresent}>Add to present</button>
        <button onClick={addToAbsent}>Add to absent</button>
      </div>);
    }    

export default App;
