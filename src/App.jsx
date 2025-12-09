import "./App.css";
import { useEffect, useState } from "react";

const WORD_LENGTH = 5;
const API = `https://random-word-api.herokuapp.com/word?length=${WORD_LENGTH}`;

export default function App() {
    const [solution, setSolution] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState(Array(6).fill(null));

    useEffect(() => {
        const handleType = (e) => {
            const key = e.key;

            if (isGameOver) return;

            if (key === "Enter") {
                if (currentGuess.length !== WORD_LENGTH) return;
                const newGuesses = [...guesses];
                const isCorrect = solution === currentGuess;

                newGuesses[guesses.findIndex((val) => val == null)] =
                    currentGuess;
                setGuesses(newGuesses);
                setCurrentGuess("");

                if (isCorrect) setIsGameOver(true);
            }

            if (key === "Backspace") {
                setCurrentGuess((prev) => prev.slice(0, -1));
                return;
            }

            if (/^[a-zA-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
                setCurrentGuess((prev) => prev + key.toUpperCase());
                return;
            }
        };

        window.addEventListener("keydown", handleType);

        return () => window.removeEventListener("keydown", handleType);
    }, [currentGuess, isGameOver, solution, guesses]);

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const response = await fetch(API);
                const data = await response.json();
                setSolution(data[0].toUpperCase());
            } catch (error) {
                console.error("Error fetching word:", error);
            }
        };

        fetchWord();
    }, []);

    console.log(solution);

    return (
        <div className="App">
            {guesses.map((guess, i) => {
                const firstEmpty = guesses.findIndex((val) => val == null);
                const isCurrentGuess = i === firstEmpty;

                return (
                    <Line
                        key={i}
                        guess={isCurrentGuess ? currentGuess : guess ?? ""}
                        isFinal={!isCurrentGuess && guess != null}
                        solution={solution}
                    />
                );
            })}
        </div>
    );
}

function Line({ guess, isFinal, solution }) {
    const tiles = [];

    for (let i = 0; i < WORD_LENGTH; i++) {
        const char = guess[i] || "";
        let className = "tile";

        if (isFinal) {
            if (char === solution[i]) className += " correct";
            else if (solution.includes(char)) className += " close";
            else className += " incorrect";
        }

        tiles.push(
            <div key={i} className={className}>
                {char}
            </div>
        );
    }

    return <div className="line">{tiles}</div>;
}
