import React from "react";
import styles from "./GameOver.module.css";
import button from "./Button.module.css";

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>
        A sua pontuacão foi: <span>{score}</span>
      </h2>
      <button className={button.button} onClick={retry}>
        Começe novamente
      </button>
    </div>
  );
};

export default GameOver;
