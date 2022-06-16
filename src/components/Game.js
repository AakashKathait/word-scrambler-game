import { useState, useEffect } from "react";
import { orgSentence, scrambler } from "../utils";
import axios from "axios";
import "../styles/Game.css";
import GameKeyBoard from "./GameKeyBoard";

function Game() {
  const [score, setScore] = useState(1);
  let [sentence, setSentence] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.hatchways.io/assessment/sentences/${score}`)
      .then((res) => {
        setSentence(res.data.data.sentence);
      });
  }, [score]);

  const addToScore = () => {
    setScore(score + 1);
  };

  const scrambledSentence = scrambler(sentence);
  const correctSentence = orgSentence(sentence);
  if (score < 10) {
    return (
      <div className="container">
        <div className="sentence-container">
          <h1 className="sentence">{scrambledSentence}</h1>
          <h3>Guess the sentence! Start typing</h3>
          <h3>the yellow blocks are meant for spaces</h3>
          <h1 className="score">Score: {score}</h1>
        </div>
        <div className="keyboard-container">
          <GameKeyBoard
            addToScore={addToScore}
            sentence={[...correctSentence]}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="game-won">
        <h1>You Win!</h1>
      </div>
    );
  }
}

export default Game;
