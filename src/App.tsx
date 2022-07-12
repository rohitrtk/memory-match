import { useState, useEffect, useRef } from "react";
import Card, {
  ICard,
  Images as cardImages,
  Audio as cardAudio
} from "./components/Card/Card";
import { motion } from "framer-motion";
import Button from "./components/Button/Button";

import "./App.css";

/**
 * Helper function to choose a specified number of indices
 * from a given array.
 */
const choose = (possibilities: ICard[], numSelections: number = 6): ICard[] => {
  const _possibilities = [...possibilities];
  let chosen: ICard[] = [];

  for (let i = 0; i < numSelections; i++) {
    const index = Math.floor(Math.random() * _possibilities.length);
    chosen.push(_possibilities.splice(index, 1)[0]);
  }

  return chosen;
};

/**
 * Main app component. Renders the application.
 */
const App = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [turn, setTurn] = useState<number>(0);

  // Should the user be able to click on a card?
  const [disabled, setDisabled] = useState<boolean>(false);

  // Has the game started?
  const [started, setStarted] = useState<boolean>(false);

  const [streak, setStreak] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const audioSource = useRef<string>("");
  const matches = useRef<number>(0);

  const [firstChoice, setFirstChoice] = useState<ICard | null>(null);
  const [secondChoice, setSecondChoice] = useState<ICard | null>(null);

  const shuffleCards = () => {
    setStarted(true);

    const selectedCards = choose(Object.values(cardImages));

    const shuffledCards: Array<ICard> = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: parseInt(Math.random().toString().slice(2))
      }));

    setFirstChoice(null);
    setSecondChoice(null);
    setTurn(0);
    setStreak(0);
    setScore(0);
    setCards(shuffledCards);

    audioSource.current = cardAudio.loaded;
    playAudio();

    matches.current = 0;
  };

  const handleChoice = (card: ICard) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  const resetChoices = () => {
    setFirstChoice(null);
    setSecondChoice(null);

    setTurn((turns) => turns + 1);
    setDisabled(false);
  };

  const playAudio = async () => {
    const audio = new Audio(audioSource.current);
    audio.volume = 0.5;

    try {
      await audio.play();
    } catch (e) {}

    audioSource.current = "";
  };

  const setAudioEffect = (prevMatches: number) => {
    const { incorrect, correct, complete } = cardAudio;

    if (prevMatches === matches.current) {
      audioSource.current = incorrect;
    } else if (matches.current === cards.length / 2) {
      audioSource.current = complete;
    } else {
      audioSource.current = correct;
    }
  };

  useEffect(() => {
    if (!firstChoice || !secondChoice) return;

    setDisabled(true);

    let prevMatches = matches.current;
    if (firstChoice.src === secondChoice.src) {
      setStreak((streak) => streak + 1);
      matches.current++;

      setCards((prevCards) => {
        return prevCards.map((card) => {
          if (card.src === firstChoice.src) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
      });

      resetChoices();
    } else {
      setStreak(0);
      setTimeout(() => resetChoices(), 1000);
    }

    setAudioEffect(prevMatches);
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    setScore((score) => {
      return score + 100 * streak;
    });
  }, [streak]);

  return (
    <div className="App">
      <h1>Memory Match</h1>
      <Button text="New Game" onClick={shuffleCards} started={started} />

      {started && (
        <>
          <motion.div className="card-grid" initial={{ scale: 0.8 }}>
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === firstChoice || card === secondChoice || card.matched
                }
                disabled={disabled}
                playAudio={playAudio}
              />
            ))}
          </motion.div>
          <p>
            Turns: {turn} Score: {score} Streak: {streak}
          </p>
        </>
      )}
    </div>
  );
};

export default App;
