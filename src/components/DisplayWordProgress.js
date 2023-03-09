import React from 'react';

/**
 * Displays the word preview that gets updated as the player makes correct guesses.
 * @param {*} props isPlaying, wordProgress
 */
function DisplayWordProgress(props) {
	if (!props.isPlaying) {
		return (
			<p id="word-preview">Start game to begin!</p>
		);
	}

	return (
		<p id="word-preview">{props.wordProgress}</p>
	);
}

export default DisplayWordProgress;
