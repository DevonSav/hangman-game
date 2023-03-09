import React from 'react';
import {
	State0, State1, State2, State3, State4, State5, State6, State7, State8, State9, State10, State11
} from '../assets/hangmandrawings';

/**
 * Returns an image of the hangman progress which changes based on the provided stage.
 * @param {*} props stage: An integer between 0 and 11 (both inclusive)
 */
export default class DisplayHangmanPicture extends React.Component {
	render() {
		const stage = this.props.stage;
		let image;

		switch (stage) {
			case 0:
				image = State0;
				break;
			case 1:
				image = State1;
				break;
			case 2:
				image = State2;
				break;
			case 3:
				image = State3;
				break;
			case 4:
				image = State4;
				break;
			case 5:
				image = State5;
				break;
			case 6:
				image = State6;
				break;
			case 7:
				image = State7;
				break;
			case 8:
				image = State8;
				break;
			case 9:
				image = State9;
				break;
			case 10:
				image = State10;
				break;
			case 11:
				image = State11;
				break;
			default:
				image = State0;
		}

		return (
			<img id="hangman-progress-img" src={image} alt="hangman progress"/>
		);
	}
}
