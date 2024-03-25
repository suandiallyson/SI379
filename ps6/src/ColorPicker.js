import "./ColorPicker.css";
import Slider from "./Slider";
import React from "react";

const MIN = 0;
const MAX = 255;

function App() {
  const [red, setRed] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [blue, setBlue] = React.useState(getRandomIntegerBetween(MIN, MAX));

  const [guessRed, setGuessRed] = React.useState(MIN);
  const [guessGreen, setGuessGreen] = React.useState(MIN);
  const [guessBlue, setGuessBlue] = React.useState(MIN);
  const [cheatingMode, setCheatingMode] = React.useState(false);
  const [showingFeedback, setShowingFeedback] = React.useState(false);

  const onChangeCheatingMode = React.useCallback((e) => {
    setCheatingMode(e.target.checked);
  }, []);

  const doGuess = React.useCallback(() => {
    setShowingFeedback(true);
  }, []);

  const doAdvance = React.useCallback(() => {
    setRed(getRandomIntegerBetween(MIN, MAX));
    setGreen(getRandomIntegerBetween(MIN, MAX));
    setBlue(getRandomIntegerBetween(MIN, MAX));
    setShowingFeedback(false);
  }, []);

  const onKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter") {
        doGuess();
      }
    },
    [doGuess]
  );

  return (
    <div className="App">
      <label id="cheating-mode">
        Cheating mode{" "}
        <input
          type="checkbox"
          value={cheatingMode}
          onChange={onChangeCheatingMode}
        />
      </label>
      <div
        id="color-preview"
        style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
      />
      {cheatingMode && (
        <div
          id="matching-rect"
          style={{
            backgroundColor: `rgb(${guessRed}, ${guessGreen}, ${guessBlue})`,
          }}
        />
      )}
      <p>Guess the color of the rectangle</p>
      <div id="color-picker">
        <div className="row">
          <span
            className="component-color-preview"
            style={{ backgroundColor: `rgb(255, 0, 0, ${guessRed / MAX})` }}
          >
            Red:
          </span>
          <Slider
            min={MIN}
            max={MAX}
            startingValue={guessRed}
            onChange={(r) => setGuessRed(r)}
          />
        </div>
        <div className="row">
          <span
            className="component-color-preview"
            style={{ backgroundColor: `rgb(0, 255, 0, ${guessGreen / MAX})` }}
          >
            Green:
          </span>
          <Slider
            min={MIN}
            max={MAX}
            startingValue={guessGreen}
            onChange={(g) => setGuessGreen(g)}
          />
        </div>
        <div className="row">
          <span
            className="component-color-preview"
            style={{ backgroundColor: `rgb(0, 0, 255, ${guessBlue / MAX})` }}
          >
            Blue:
          </span>
          <Slider
            min={MIN}
            max={MAX}
            startingValue={guessBlue}
            onChange={(b) => setGuessBlue(b)}
          />
        </div>
      </div>
      {!showingFeedback && <button onClick={doGuess}>Guess</button>}
      {showingFeedback && (
        <>
          <div>
            Your guess: rgb({guessRed}, {guessGreen}, {guessBlue}) <br />
            Actual: rgb({red}, {green}, {blue})
          </div>
          <button onClick={doAdvance}>Next</button>
        </>
      )}
    </div>
  );
}

export default App;

function getRandomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
