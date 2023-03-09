import React from 'react';

/**
 * Creates a button that shows some help information when clicked.
 */
export default class DisplayHelpWindow extends React.Component {
	toggleHelp() {
		var elem = document.getElementById("help-desc");
		if (elem.style.display == "none") {
			elem.style.display = "contents";
		} else {
			elem.style.display = "none";
		}
	}

	render() {
		return (
			<div className="help-guide">
				<button id="help-guide-btn" onClick={() => this.toggleHelp()}>Show Help</button>
				<div className="help-description" id="help-desc">
					<p>After clicking <span style={{color: '#a7ff4e'}}>Start Game</span> a random secret word will be chosen.</p>
					<p>Your goal is to find the correct word by guessing what letters are in it.</p>
					<p>Click the letter buttons you think are in the word.</p>
					<p><span style={{color: '#00ffc3'}}>Correct</span> guesses will reveal <span style={{fontStyle: 'italic'}}>all</span> occurences of the letter within the word.</p>
					<p><span style={{color: '#ff4e4e'}}>Incorrect</span> guesses will reduce your remaining moves.</p>
					<p>You lose when the hangman is fully drawn (10 wrong guesses).</p>
					<p className="spacer"> </p>
				</div>
			</div>
		);
	}
}
