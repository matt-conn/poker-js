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

	displayHand() {
		let display = '';

		for (let card of this.cards) {
			display += `${card.rank}${card.suit[0]} `;
		}

		return display.trim();
	}

	score() {
		if (this.isFlush() && this.isStraight()) {
			return this.ranks[0] === 10 ? `Royal Flush` : `Straight Flush`;
		} else if (this.checkMatches(4)) {
			return `Four of a Kind`;
		} else if (this.checkMatches(3) && this.checkMatches(2)) {
			return `Full House`;
		} else if (this.isFlush()) {
			return `Flush`;
		} else if (this.isStraight()) {
			return `Straight`;
		} else if (this.checkMatches(3)) {
			return `Three of a Kind`
		} else if (this.checkPairs()) {
			return `Two Pair`;
		} else if (this.checkMatches(2)) {
			return `Pair`;
		} else {
			return `High Card`;
		}
	}

	isFlush() {
		for (const suit in this.suits) {
			if (this.suits[suit] === 5)
				return true;
		}
		return false;
	}

	isStraight() {
		const straights = '1234567891011121314';
		const aceInHand = this.ranks.includes(14);

		if (aceInHand) {
			const aceLow = [...this.ranks];
			aceLow.splice(aceLow.length - 1, 1, 1);
			aceLow.sort((a,b) => a - b);
			
			// check for wheel (ace low) and ace high
			return straights.includes(aceLow.join('')) || straights.includes(this.ranks.join(''));
		} else {
			return straights.includes(this.ranks.join(''));
		}
	}

	checkMatches(numCards) {
		let matches = {};

		for (const rank of this.ranks) {
			matches[rank] = matches[rank] + 1 || 1;
		}

		for (const match in matches) {
			if (matches[match] === numCards) {
				return true;
			}
		}
	}

	checkPairs() {
		let matches = {};
		let numPairs = 0;

		for (const rank of this.ranks) {
			matches[rank] = matches[rank] + 1 || 1;
		}

		for (const match in matches) {
			if (matches[match] === 2) {
				numPairs += 1;
			}
		}

		return numPairs === 2 ? true : false;
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

/*
** TEST DECK
** TEST DECK
** TEST DECK
*/
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

console.log(`ROYAL FLUSH \n(${handRoyalFlush.displayHand()}): ${handRoyalFlush.score()}\n`);
console.log(`STRAIGHT FLUSH \n(${handStraightFlush.displayHand()}): ${handStraightFlush.score()}\n`);
console.log(`4-KIND \n(${handFourOfAKind.displayHand()}): ${handFourOfAKind.score()}\n`);
console.log(`FULL HOUSE \n(${handFullHouse.displayHand()}): ${handFullHouse.score()}\n`);
console.log(`FLUSH \n(${handFlush.displayHand()}): ${handFlush.score()}\n`);
console.log(`STRAIGHT \n(${handStraight.displayHand()}): ${handStraight.score()}\n`);
console.log(`WHEEL \n(${handWheel.displayHand()}): ${handWheel.score()}\n`);
console.log(`3-KIND \n(${handThreeOfAKind.displayHand()}): ${handThreeOfAKind.score()}\n`);
console.log(`TWO PAIR \n(${handTwoPair.displayHand()}): ${handTwoPair.score()}\n`);
console.log(`PAIR \n(${handPair.displayHand()}): ${handPair.score()}\n`);
console.log(`HIGH CARD \n(${handHighCard.displayHand()}): ${handHighCard.score()}\n`);