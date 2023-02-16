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

class TestDeck extends Deck {
	dealStraight() {
		const hand = new Hand;
		hand.addCard(new Card('10','Hearts'));
		hand.addCard(new Card('J','Hearts'));
		hand.addCard(new Card('Q','Diamonds'));
		hand.addCard(new Card('K','Spades'));
		hand.addCard(new Card('A','Clubs'));
		
		return hand;
	}
}

class Hand {
	constructor(cards) {
		this.cards = cards || [];
		this.ranks = [];
		this.suits = {
			'Hearts': 0,
			'Diamonds': 0,
			'Clubs': 0,
			'Spades': 0
		};
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

	isStraight() {
		for (let i = 0; i < this.ranks.length; i++) {
			if (this.ranks[i + 1] - this.ranks[i] !== 1) {
				return false;
			}
		}
		return true;
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

// test hand
console.log('HAND:')
console.log(hand.cards)
console.log('RANKS:')
console.log(hand.ranks);
console.log('SUITS:')
console.log(hand.suits);
console.log('Straight?')
console.log(hand.isStraight())

console.log(`\\\\\\\\\\\\\\\\\\\\\\\\`)
let testDeck = new TestDeck;
let handStraight = testDeck.dealStraight();
console.log(handStraight.cards);
console.log(handStraight.ranks);
console.log(`IS STRAIGHT: ${handStraight.isStraight()}`)