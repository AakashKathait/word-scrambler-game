import "../styles/Game.css";
import Letter from "./Letter";
import { useEffect, useState } from "react";
import { spread } from "../utils";

function GameKeyBoard({ addToScore, sentence }) {
  const [gameState, setGameState] = useState([]);
  const [nextButton, setNextButton] = useState(false);
  useEffect(() => {
    let stateArr = [];
    sentence.forEach((word) => {
      stateArr.push({ column: spread(word) });
    });
    setNextButton(false);
    setGameState(stateArr);
  }, [sentence]);

  let trackGreenArr = [];
  const showGreen = (value, id, isGreen) => {
    if (trackGreenArr.length >= 0) {
      trackGreenArr.push({ value, id, isGreen });
    }
  };
  const trackGreen = (id, isGreen) => {
    trackGreenArr = trackGreenArr.map((element) => {
      return element.id === id ? { ...element, isGreen } : element;
    });
    for (const element of trackGreenArr) {
      if (element.isGreen === false) {
        setNextButton(false);
        break;
      } else {
        setNextButton(true);
      }
    }
  };

  return (
    <form
      className="keyboard-inputs"
      onSubmit={(e) => {
        e.preventDefault();
        if (nextButton === true) {
          addToScore();
        }
      }}
    >
      {gameState.map((column, index) => {
        return (
          <div key={index} className="input-column">
            {column.column.map((word) => {
              return (
                <Letter
                  nextButton={nextButton}
                  key={word.id}
                  id={word.id}
                  value={word.value}
                  trackGreen={trackGreen}
                  showGreen={showGreen}
                />
              );
            })}
          </div>
        );
      })}
      <button
        style={{ display: !nextButton ? "none" : "initial" }}
        className="next"
      >
        Next
      </button>
    </form>
  );
}

export default GameKeyBoard;
