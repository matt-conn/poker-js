import { Card } from "./card";

export class Deck {
	deck: Card[];

	constructor() {
		this.deck = [];
	}

	clearDeck() {
		this.deck = [];
	}

	// This method adds (1) deck to the pile.
	addDeck() {
		let cards: Card[] = [];
		const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

		for (let rank of ranks) {
			cards.push(new Card(rank, "Hearts"));
			cards.push(new Card(rank, "Diamonds"));
			cards.push(new Card(rank, "Spades"));
			cards.push(new Card(rank, "Clubs"));
		}

		this.deck = this.deck.concat(cards);
	}

	// This method shuffles the deck.
	shuffleDeck() {
		// let tempDeck = [...this.deck];
		// let shuffledDeck = [];

		// while (tempDeck.length > 0) {
		// 	let randomIndex = Math.floor(Math.random() * tempDeck.length);

		// 	shuffledDeck.push(tempDeck.splice(randomIndex, 1)[0]);
		// }

		// this.deck = shuffledDeck;

		// fisher-yates shuffle (in-place)
		// https://bost.ocks.org/mike/shuffle/
		let m = this.deck.length;
		let t, i;

		while (m) {
			// pick remaining element
			i = Math.floor(Math.random() * m--);

			// swap item
			t = this.deck[m];
			this.deck[m] = this.deck[i];
			this.deck[i] = t;
		}
	}

	// This method deals one card from the "top" of the deck.
	dealCard() {
		if (this.deck.length > 0) {
			return this.deck.pop();
		} else {
			return null;
		}
	}

	// This method deals one card from the "bottom" of the deck.
	dealFromBottom() {
		return this.deck.shift();
	}
}
