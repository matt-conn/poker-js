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

class TestDeck {
	dealRoyalFlush() {
		const hand = new Hand;
		hand.addCard(new Card('10','Hearts'));
		hand.addCard(new Card('J','Hearts'));
		hand.addCard(new Card('Q','Hearts'));
		hand.addCard(new Card('K','Hearts'));
		hand.addCard(new Card('A','Hearts'));
		
		return hand;
	}

	dealStraightFlush() {
		const hand = new Hand;
		hand.addCard(new Card('9','Diamonds'));
		hand.addCard(new Card('10','Diamonds'));
		hand.addCard(new Card('J','Diamonds'));
		hand.addCard(new Card('Q','Diamonds'));
		hand.addCard(new Card('K','Diamonds'));
		
		return hand;
	}

	dealFourOfAKind() {
		const hand = new Hand;
		hand.addCard(new Card('5','Clubs'));
		hand.addCard(new Card('5','Spades'));
		hand.addCard(new Card('5','Clubs'));
		hand.addCard(new Card('5','Diamonds'));
		hand.addCard(new Card('7','Clubs'));
		
		return hand;
	}

	dealFullHouse() {
		const hand = new Hand;
		hand.addCard(new Card('8','Clubs'));
		hand.addCard(new Card('2','Spades'));
		hand.addCard(new Card('8','Clubs'));
		hand.addCard(new Card('2','Diamonds'));
		hand.addCard(new Card('8','Clubs'));
		
		return hand;
	}

	dealFlush() {
		const hand = new Hand;
		hand.addCard(new Card('10','Hearts'));
		hand.addCard(new Card('4','Hearts'));
		hand.addCard(new Card('Q','Hearts'));
		hand.addCard(new Card('K','Hearts'));
		hand.addCard(new Card('7','Hearts'));
		
		return hand;
	}

	dealStraight() {
		const hand = new Hand;
		hand.addCard(new Card('7','Spades'));
		hand.addCard(new Card('8','Hearts'));
		hand.addCard(new Card('9','Diamonds'));
		hand.addCard(new Card('10','Clubs'));
		hand.addCard(new Card('J','Diamonds'));
		
		return hand;
	}

	dealWheel() {
		const hand = new Hand;
		hand.addCard(new Card('A','Spades'));
		hand.addCard(new Card('3','Hearts'));
		hand.addCard(new Card('2','Diamonds'));
		hand.addCard(new Card('5','Clubs'));
		hand.addCard(new Card('4','Diamonds'));
		
		return hand;
	}

	dealThreeOfAKind() {
		const hand = new Hand;
		hand.addCard(new Card('4','Clubs'));
		hand.addCard(new Card('9','Spades'));
		hand.addCard(new Card('4','Clubs'));
		hand.addCard(new Card('4','Diamonds'));
		hand.addCard(new Card('7','Clubs'));
		
		return hand;
	}

	dealTwoPair() {
		const hand = new Hand;
		hand.addCard(new Card('2','Clubs'));
		hand.addCard(new Card('2','Spades'));
		hand.addCard(new Card('7','Clubs'));
		hand.addCard(new Card('7','Diamonds'));
		hand.addCard(new Card('10','Clubs'));
		
		return hand;
	}

	dealPair() {
		const hand = new Hand;
		hand.addCard(new Card('2','Clubs'));
		hand.addCard(new Card('2','Spades'));
		hand.addCard(new Card('8','Clubs'));
		hand.addCard(new Card('Q','Diamonds'));
		hand.addCard(new Card('10','Clubs'));
		
		return hand;
	}

	dealHighCard() {
		const hand = new Hand;
		hand.addCard(new Card('K','Clubs'));
		hand.addCard(new Card('2','Spades'));
		hand.addCard(new Card('7','Clubs'));
		hand.addCard(new Card('9','Diamonds'));
		hand.addCard(new Card('4','Clubs'));
		
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

	score() {

	}

	isFlush() {
		for (const suit in this.suits) {
			if (this.suits[suit] === 5)
				return true;
		}
		return false;
	}

	isStraight() {
		for (let i = 0; i < this.ranks.length - 1; i++) {
			if (this.ranks[i + 1] - this.ranks[i] !== 1) {
				return false;
			}
		}
		return true;
	}

	checkMatches(num) {
		// list of cards
		let matches = {};

		for (const rank of this.ranks) {
			matches[rank] = matches[rank] + 1 || 1;
		}

		for (const match in matches) {
			if (matches[match] === num) {
				return true;
			}
		}
	}

	checkPairs() {

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

let testDeck = new TestDeck;

const handRoyalFlush = testDeck.dealRoyalFlush();
const handStraightFlush = testDeck.dealStraightFlush();
const handFourOfAKind = testDeck.dealFourOfAKind();
const handFullHouse = testDeck.dealFullHouse();
const handFlush = testDeck.dealFlush();
const handStraight = testDeck.dealStraight();
const handWheel = testDeck.dealWheel();
const handThreeOfAKind = testDeck.dealThreeOfAKind();
const handTwoPair = testDeck.dealTwoPair();
const handPair = testDeck.dealPair();
const handHighCard = testDeck.dealHighCard();