import { Component } from '@angular/core';
import { Deck } from './deck';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'ng-poker';
	deck: Deck
	decks = 0;
	shuffled = false;

	constructor() {
		this.deck = new Deck;
		this.onAddDeck();
		this.onShuffleDeck();
	}

	onAddDeck() {
		this.decks += 1;
		this.deck.addDeck();
		this.shuffled = false;
	}

	onClearDeck() {
		this.decks = 0;
		this.shuffled = false;
		this.deck.clearDeck();
	}

	onShuffleDeck() {
		this.deck.shuffleDeck();
		this.shuffled = true;
	}
}
