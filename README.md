# 🔠 Word Guess Game

**"Word Guess Game"** is a fast, keyboard-driven React mini-game inspired by Wordle.  
Guess a random word in just a handful of tries! Choose the word length, type your guesses, and use the tile colors to narrow it down — simple, addictive, and fun.

---

## 🔍 Preview

- Live – https://dipan46.github.io/Wordle-Game/

---

## ✨ Features

- 🎯 **Random Word Generation**  
  Fetches a random English word from the Random Word API based on your chosen length.

- 📏 **Custom Word Length**  
  Use the number input to choose how long the target word should be (e.g. 3–10 letters).  
  The app:
  - Updates the solution word to match the new length
  - Resets guesses and game state accordingly

- ⌨️ **Keyboard Controls** – Type directly using your keyboard:
  - Letter keys to build your guess
  - `Backspace` to delete the last letter
  - `Enter` to submit the guess (only when the guess length matches the word length)

- 🧩 **Limited Attempts**  
  You get **wordLength + 1** rows to crack the word (e.g. 6 attempts for 5-letter words).

- 🟩 **Visual Feedback** – Tile colors indicate how close your guess is:
  - **Green** – Correct letter in the correct position
  - **Yellow** – Letter exists but in a different position
  - **Gray** – Letter is not in the word

- 🚫 **Game Over State**  
  Once you guess the word correctly, the game stops accepting input.

- 🧱 **Simple Component Structure**  
  Easy-to-understand code, great for beginners learning React & game logic.

- 🌐 **API Integration**  
  Uses an external API for dynamic word generation:  
  ```text
  https://random-word-api.herokuapp.com/word?length={wordLength}

## 🛠️ Technologies Used

* **React** – UI rendering and state management
* **JavaScript (ES6+)** – Game logic and event handling
* **HTML & CSS** – Layout and styling
* **Random Word API** – Word data source

---

## 📸 Preview

*Example UI of the app in action:*

![Preview](./preview/word-guess.png)

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (which includes `npm`)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Dipan46/word-guess-game.git
   cd word-guess-game
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

   Or, if you're using Vite or another bundler, adjust accordingly:

   ```bash
   npm run dev
   ```

4. Open the app in your browser:

   ```text
   http://localhost:3000
   ```

   *(or whatever port your dev server uses)*

---

## 📂 Project Structure

```text
src/
├── App.css             # Main styles for tiles, layout, and game board
├── App.jsx             # Core game logic & UI (Word Guess Game)
└── main.jsx / index.js # React entry point
```

> The `Line` component is defined inside `App.jsx` and is responsible for rendering each guess row and its colored tiles based on the current `wordLength`.

---

## 🧠 Game Logic & Concepts Demonstrated

* 🧠 **State Management** with `useState`:

  * `wordLength` – current length of the target word (configurable via input)
  * `solution` – the current target word fetched from the API
  * `currentGuess` – the guess the user is typing
  * `guesses` – array of submitted guesses (size: `wordLength + 1`)
  * `isGameOver` – stops input when the user wins

* 🌐 **Side Effects** with `useEffect`:

  * Fetching a random word **whenever `wordLength` changes**
  * Setting up and cleaning up a `keydown` event listener on `window`

* 🧮 **Derived State**:

  * Detecting which guess row is currently active by finding the first `null` in `guesses`

* 🧩 **Conditional Rendering & Styling**:

  * Applying `.correct`, `.close`, and `.incorrect` classes based on comparison with `solution`
  * Rendering different numbers of tiles per row based on `wordLength`

* ⌨️ **Keyboard Event Handling**:

  * Handling `Enter`, `Backspace`, and letter keys
  * Preventing submission unless `currentGuess.length === wordLength`
  * Ignoring input once `isGameOver` is `true`

* 🧱 **Component Composition**:

  * Splitting UI into a top-level `App` component and a `Line` component used to render each guess row

---

## 🧩 Possible Improvements

* ✅ **Win/Loss Messages** – Show a message when the user wins or loses and reveal the solution.
* 🔁 **Restart Button** – Allow users to start a new game without refreshing.
* 📚 **Dictionary Validation** – Check if the guess is a valid word.
* ⌨️ **On-screen Keyboard** – Visual keyboard with color feedback.
* 💾 **Local Storage** – Store game stats like total games played, wins, and streaks.
* 📱 **Responsive Design Enhancements** – Improve UX on mobile devices.
* 🎨 **Animations** – Add flip / bounce animations on tile reveal.
* 🧪 **Difficulty Presets** – Quick buttons like “Easy (4 letters)”, “Medium (5 letters)”, “Hard (8+ letters)”.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ by [Dipan46](https://github.com/Dipan46)
