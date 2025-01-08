import React from "react";
import styles from "./StartScreen.module.css";
import button from "./Button.module.css";

const StartScreen = ({ startGame }) => {
  return (
    <div className={styles.start}>
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button className={button.button} onClick={startGame}>
        Começar o jogo
      </button>
    </div>
  );
};

export default StartScreen;
