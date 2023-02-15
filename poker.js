class Deck {
	constructor() {
		this.deck = this.resetDeck();
	}

	// this method loads a standard deck, 2-A (one card per per suit).
	resetDeck() {
		let cards = [];
		const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

		for (let rank of ranks) {
			cards.push(new Card(rank, 'Hearts'));
			cards.push(new Card(rank, 'Diamonds'));
			cards.push(new Card(rank, 'Spades'));
			cards.push(new Card(rank, 'Clubs'));
		}

		return cards;
	}

	// This method shuffles the deck.
	shuffleDeck() {
		let tempDeck = [...this.deck];
		let shuffledDeck = [];

		while (tempDeck.length > 0) {
			let randomIndex = Math.floor(Math.random() * tempDeck.length);

			shuffledDeck.push(tempDeck.splice(randomIndex,1)[0]);
		}

		this.deck = shuffledDeck;
	}

	// This method deals one card from the "top" of the deck.
	dealCard() {
		return this.deck.pop();
	}

	// This method deals one card from the "bottom" of the deck.
	dealFromBottom() {
		return this.deck.shift();
	}
}

class Hand {
	constructor() {
		this.cards = [];
		this.ranks = [];
		this.suits = {
			'Hearts': 0,
			'Diamonds': 0,
			'Clubs': 0,
			'Spades': 0
		}
	}

	addCard(card) {
		// push Card to hand array
		this.cards.push(card);

		// iterate suit count
		this.suits[card.suit] += 1;

		// push rank to array, sort
		this.ranks.push(card.getRankValue());
		this.ranks.sort((a, b) => a - b);
	}
}

class Card {
	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
	}

	getRankValue() {
		let ranks = {
			'2': 2,
			'3': 3,
			'4': 4,
			'5': 5,
			'6': 6,
			'7': 7,
			'8': 8,
			'9': 9,
			'10': 10,
			'J': 11,
			'Q': 12,
			'K': 13,
			'A': 14
		}

		return ranks[this.rank];
	}
}

let deck = new Deck;
deck.shuffleDeck();

let hand = new Hand;
hand.addCard(deck.dealCard());
hand.addCard(deck.dealCard());
hand.addCard(deck.dealCard());
hand.addCard(deck.dealCard());
hand.addCard(deck.dealCard());
console.log(hand.cards)
console.log(hand.ranks);
console.log(hand.suits );

