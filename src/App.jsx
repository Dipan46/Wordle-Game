import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
    const [wordLength, setWordLength] = useState(5);
    const [solution, setSolution] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState(
        () => Array(5 + 1).fill(null) // initial based on default word length
    );

    // Keyboard handling
    useEffect(() => {
        const handleType = (e) => {
            const key = e.key;

            if (isGameOver) return;

            if (key === "Enter") {
                if (currentGuess.length !== wordLength) return;

                const newGuesses = [...guesses];
                const isCorrect = solution === currentGuess;

                newGuesses[guesses.findIndex((val) => val == null)] =
                    currentGuess;
                setGuesses(newGuesses);
                setCurrentGuess("");

                if (isCorrect) setIsGameOver(true);
                return;
            }

            if (key === "Backspace") {
                setCurrentGuess((prev) => prev.slice(0, -1));
                return;
            }

            if (/^[a-zA-Z]$/.test(key) && currentGuess.length < wordLength) {
                setCurrentGuess((prev) => prev + key.toUpperCase());
                return;
            }
        };

        window.addEventListener("keydown", handleType);
        return () => window.removeEventListener("keydown", handleType);
    }, [currentGuess, isGameOver, solution, guesses, wordLength]);

    // Fetch word whenever wordLength changes
    useEffect(() => {
        const fetchWord = async () => {
            try {
                const API = `https://random-word-api.herokuapp.com/word?length=${wordLength}`;
                const response = await fetch(API);
                const data = await response.json();
                setSolution(data[0].toUpperCase());
            } catch (error) {
                console.error("Error fetching word:", error);
            }
        };

        fetchWord();
    }, [wordLength]);

    // Handle input change
    const handleWordLength = (e) => {
        const value = Number(e.target.value);
        if (!value || value <= 0) return;

        setWordLength(value);
        setGuesses(Array(value + 1).fill(null));
        setCurrentGuess("");
        setIsGameOver(false);
    };

    console.log(solution);

    return (
        <div className="App">
            <label>
                Word length:{" "}
                <input
                    type="number"
                    min="3"
                    max="10"
                    value={wordLength}
                    onChange={handleWordLength}
                />
            </label>

            {guesses.map((guess, i) => {
                const firstEmpty = guesses.findIndex((val) => val == null);
                const isCurrentGuess = i === firstEmpty;

                return (
                    <Line
                        key={i}
                        guess={isCurrentGuess ? currentGuess : guess ?? ""}
                        isFinal={!isCurrentGuess && guess != null}
                        solution={solution}
                        wordLength={wordLength}
                    />
                );
            })}
        </div>
    );
}

function Line({ guess, isFinal, solution, wordLength }) {
    const tiles = [];

    for (let i = 0; i < wordLength; i++) {
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
