import React from 'react';
import DisplayHangmanPicture from './DisplayHangmanPicture';
import DisplayWordProgress from './DisplayWordProgress';
import LetterButtonList from './LetterButtonList';
import DisplayHelpWindow from './DisplayHelpWindow';

import rawWordFile from '../assets/dictionary.txt';


/**
 * Displays a game of hangman.
 */
export default class HangmanGame extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isPlaying: false,
			gameStage: 0,
			word: "NONE",
			wordProgress: "_",
			validGuesses: [""],
			invalidGuesses: [""]
		};

		this.handleGameProgram = this.gameProgram.bind(this);
		this.handleStartProgram = this.startProgram.bind(this);
		this.handleStopProgram = this.stopProgram.bind(this);
		this.handleUpdateWordProgress = this.updateWordProgress.bind(this);
	}

	/**
	 * Reads the dictionary file and initializes the game states.
	 * @param {*} btnTargetElement
	 */
	startProgram(btnTargetElement) {
		// Start playing
		if (this.state.isPlaying == false) {
			// Update state
			this.setState({isPlaying: true, gameStage: 1});
			btnTargetElement.innerHTML = "Stop Game";
			btnTargetElement.classList.add('reset-btn');

			// Read the word file and get a random word
			fetch(rawWordFile).then(r => r.text()).then(text => {
				// Split at the start of the dictionary and only keep the words
				const temp = text.split("START")[1];

				// Split by newlines and filter out empty space
				const wordArray = temp.split(/\r?\n/).filter(Boolean);
				const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];

				// Save it to state
				this.setState({word: randomWord});

				console.log(randomWord); // FIXME: debugging

				let hiddenWord = "";
				// For each char in word
				for (let i = 0; i < randomWord.length; i++) {
					// Check for separators
					if (randomWord[i] == "-") {
						hiddenWord += randomWord[i];
					} else {
						// Add missing character
						hiddenWord += "_";
					}
				}

				// Update state of word preview
				this.setState({wordProgress: hiddenWord});
			});
		}
		// Stop playing
		else {
			this.stopProgram();
		}
	}

	/**
	 * Resets states to default and clears element styling.
	 */
	stopProgram() {
		// Update state
		this.setState({
			isPlaying: false,
			gameStage: 0,
			word: "NONE",
			wordProgress: "_",
			validGuesses: [""],
			invalidGuesses: [""]
		});

		// Update the stop/start button appearance
		const btnTargetElement = document.getElementById("stop-start-btn");
		btnTargetElement.innerHTML = "Start Game";
		btnTargetElement.classList.remove('reset-btn');

		const alphabet = [
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
			'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
			's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
		];

		alphabet.forEach(letter => {
			// Update the input button appearance
			const letterButton = document.getElementById("btn-" + letter);
			letterButton.classList.remove('btn-valid');
			letterButton.classList.remove('btn-invalid');
		});
	}

	/**
	 * Updates the word preview. And checks for the win state.
	 */
	updateWordProgress() {
		let wordToGuess = this.state.word;
		let hiddenWord = "";
		// For each char in the word
		for (let i = 0; i < wordToGuess.length; i++) {
			// If it is in guesses or it is a separator
			if (this.state.validGuesses.includes(wordToGuess[i]) || this.state.validGuesses.includes(wordToGuess[i].toLowerCase()) || wordToGuess[i] == "-") {
				// Add the letter
				hiddenWord += wordToGuess[i];
			} else {
				// Add missing character
				hiddenWord += "_";
			}
		}

		// Update props in the main program
		this.setState({wordProgress: hiddenWord});

		if (hiddenWord == this.state.word) {
			// END THE GAME WITH A WIN
			setTimeout(() => {
				// Timeout avoids alert being shown before visuals update
				alert("You WON! The correct word was '" + this.state.word + "'!");
			}, 100);
			setTimeout(() => {
				this.stopProgram();
			}, 110);
		}
	}

	/**
	 * Used when pressing a letter to enter.
	 * @param {*} parent A reference to the main program parent class.
	 * @param {*} value The letter on the pressed button.
	 */
	gameProgram(parent, value) {
		if (parent.state.isPlaying == false)
		{
			// Not actually playing
			return;
		}

		// Case insensitive contains check
		let withinValidGuesses = (parent.state.validGuesses).includes(value) || (parent.state.validGuesses).includes(value.toUpperCase());
		let withinInvalidGuesses = (parent.state.invalidGuesses).includes(value) || (parent.state.invalidGuesses).includes(value.toUpperCase());

		let wordToGuess = parent.state.word;

		// If it is not already in valid/invalid list
		if (!withinValidGuesses && !withinInvalidGuesses) {
			// Guessed CORRECTLY
			if (wordToGuess.includes(value) || wordToGuess.includes(value.toUpperCase())) {
				let newArr = parent.state.validGuesses;
				newArr.push(value);
				parent.setState({validGuesses: newArr});

				// Update the button appearance
				const letterButton = document.getElementById("btn-" + value);
				letterButton.classList.add('btn-valid');

				parent.updateWordProgress();

			} else {
				// Guessed INCORRECTLY
				let newArr = parent.state.invalidGuesses;
				newArr.push(value);
				parent.setState({invalidGuesses: newArr});

				parent.updateWordProgress();

				// Update stage state
				let newStage = parent.state.gameStage + 1;
				parent.setState({gameStage: newStage});

				// Update the button appearance
				const letterButton = document.getElementById("btn-" + value);
				letterButton.classList.add('btn-invalid');

				if (newStage >= 11) {
					// END THE GAME WITH A LOSS
					setTimeout(() => {
						// Timeout avoids alert being shown before visuals update
						alert("You LOST. The correct word was '" + parent.state.word + "'!");
					}, 100);
					setTimeout(() => {
						parent.stopProgram();
					}, 110);
				}
			}
		}
	}

	render() {
		// Display the remaining moves correctly before playing
		const moveCount = this.state.isPlaying ? (11 - this.state.gameStage) : 10;
		return (
			<div className="hangman-game">
				<h3 id="main-heading">Hangman Game</h3>
				<button id="stop-start-btn" className="start-btn" value={"start btn"} onClick={(e) => this.startProgram(e.target)}>Start Game</button>
				<p id="move-counter">Remaining moves: {moveCount}</p>
				<DisplayHangmanPicture stage={this.state.gameStage}/>
				<DisplayWordProgress isPlaying={this.state.isPlaying} wordProgress={this.state.wordProgress}/>

				<LetterButtonList parent={this} btnClickMethod={this.gameProgram} validGuesses={this.state.validGuesses} invalidGuesses={this.state.invalidGuesses}/>

				<DisplayHelpWindow />
			</div>
		);
	}
}

/** REFERENCES
 * https://bobbyhadz.com/blog/javascript-split-string-by-newline
 */
