import React from 'react';

/**
 * Takes a letter and converts it to upper case if required.
 */
function getCase(useUpperCase, letter) {
	if (useUpperCase == true) {
		return letter.toString().toUpperCase();
	} else {
		return letter.toString();
	}
}

/* NOTE: takes reference to whole parent class to sync states. Might be bad practice but after a
 * day of troubleshooting this is the only method that worked reliably.
 */
/**
 * Displays a button for every letter in the alphabet for taking game input.
 * @param {*} props parent, btnClickMethod(), validGuesses[], invalidGuesses[]
 * @returns List of letter buttons.
 */
function LetterButtonList(props) {
	const alphabet = [
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
		'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
		's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	];
	const useUpperCase = false;

	const listItems = alphabet.map((letter) =>
		<li key={letter.toString()}>
			<button id={"btn-" + letter} className="letter-btn" value={letter} onClick={() => props.btnClickMethod(props.parent, letter)}>{getCase(useUpperCase, letter)}</button>
		</li>
	);

	return (
		<ul className='letter-btn-list'>
			{listItems}
		</ul>
	);
}

export default LetterButtonList;
