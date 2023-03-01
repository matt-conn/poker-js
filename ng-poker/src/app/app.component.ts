import { Component, OnChanges, Input } from '@angular/core';
import { Deck } from './deck';
import { Hand } from './hand';
import { HandComponent } from './hand/hand.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'ng-poker';
	playingDeck: Deck;
	numDecks: number = 0;
	numHands: number = 0;
	hands:Hand[] = [];
	winningIndex?: number | null;
	shuffled = false;

	constructor() {
		this.playingDeck = new Deck;
		this.onAddDeck();
		this.numHands = Math.floor(this.playingDeck.deck.length / 5);
		this.onShuffleDeck();
	}

	onAddDeck() {
		this.numDecks += 1;
		this.playingDeck.addDeck();
		this.numHands = Math.floor(this.playingDeck.deck.length / 5);
		this.shuffled = false;
	}

	onClearDeck() {
		this.numDecks = 0;
		this.shuffled = false;
		this.numHands = 0;
		this.playingDeck.clearDeck();
		this.onClearHands();
	}

	onShuffleDeck() {
		// shuffle deck three times
		for (let i = 0; i < 3; i++) {
			this.playingDeck.shuffleDeck();
		}

		this.shuffled = true;
	}

	onDealHand() {
		if (this.numHands > 0) {
			const hand = new Hand();

			for (let i = 0; i < 5; i++) {
				hand.addCard(this.playingDeck.dealCard());
			}

			this.hands.push(hand);

			this.numHands -= 1;
		}
	}

	onClearHands() {
		this.hands = [];
		this.winningIndex = null;
	}

	onScoreGame() {
		let maxIndex = 0;

		for (let hand of this.hands) {
			hand.score();
		}

		for (let i = 0; i < this.hands.length; i++) {
			if (this.hands[i].handScore > this.hands[maxIndex].handScore) {
				maxIndex = i;
			}
		}

		this.winningIndex = maxIndex;
	}
}
