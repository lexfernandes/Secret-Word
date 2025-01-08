//REACT
import { useState, useCallback, useEffect } from "react";

//css
import "./App.css";

// importando banco de dados categoria e palavras
import { wordsList } from "./data/words";

//Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const Stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  // states do programa.
  const [gameStage, setGamestStage] = useState(Stages[0].name);
  //banco de dados /components/data
  const [words] = useState(wordsList);
  // palavra para adivinhar
  const [pickedWord, setPickedWord] = useState("");
  //categoria das palavras / dicas
  const [pickedCategory, setPickedCategory] = useState("");
  //recebe letras
  const [letters, setLetters] = useState([]);
  // palavras adivinhadas
  const [guessedLetters, setGuessedLetters] = useState([]);
  //letras erradas
  const [wrongLetters, setWrongLetters] = useState([]);
  // chances tentativas do usuário
  const [guesses, setGuesses] = useState(5);
  //pontuacão
  const [score, setScore] = useState(0);

  // ================== FUNÇÕES ===================
  //função para gerar uma categoria aleatoria = logica do jogo
  const pickWordAndCategory = () => {
    // pega as chaves do objeto de array
    const categories = Object.keys(words);
    // sortea a categoria com math e coloca na variavel category
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    // sortea uma palavra da category e coloca na variavel word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  };

  //starts circle words game
  const startGame = () => {
    //Limpa das letras
    clearLetterStates();
    // pega objeto retornado pela função pickWordAndCategory
    const { word, category } = pickWordAndCategory();
    // separar a palavra em letras c.a.s.a
    let wordLetters = word.split("");
    // Todas as letras da palavra ficam em caixa baixa.
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGamestStage(Stages[1].name);
  };

  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    // Verifica se a letra já foi utilizada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    // Letras acertadas são colocadas na variavel setGuessLetters
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
      // As que não foram acertadas são colocadas na variavel setWrongLetters
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      // função diminui as tentativas do usuário
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //useEffect monitoria a varialvel guesses se ela foi alterada ele executa a função
  // se utilizar as 3 tentivas finaliza o game
  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates();
      setGamestStage(Stages[2].name);
    }
  }, [guesses]);

  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    console.log(uniqueLetters);
    // Verifica se você ganhou o jogo, acertou todas as letras
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 10));
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  //restar game
  const retry = () => {
    setScore(0);
    setGuesses(5);
    setGamestStage(Stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
