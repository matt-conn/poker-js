class Deck {
	constructor() {
		this.deck = [];
	}

	resetDeck() {
		let cards = [];
		const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

		for (let rank of ranks) {
			cards.push(new Card(rank, "Hearts"));
			cards.push(new Card(rank, "Diamonds"));
			cards.push(new Card(rank, "Spades"));
			cards.push(new Card(rank, "Clubs"));
		}

		this.deck = cards;
	}

	addDeck() {
		let cards = [];
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
		let tempDeck = [...this.deck];
		let shuffledDeck = [];

		while (tempDeck.length > 0) {
			let randomIndex = Math.floor(Math.random() * tempDeck.length);

			shuffledDeck.push(tempDeck.splice(randomIndex, 1)[0]);
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
	dealTestHand(c1, c2, c3, c4, c5) {
		const hand = new Hand();
		hand.addCard(new Card(c1[0], c1[1]));
		hand.addCard(new Card(c2[0], c2[1]));
		hand.addCard(new Card(c3[0], c3[1]));
		hand.addCard(new Card(c4[0], c4[1]));
		hand.addCard(new Card(c5[0], c5[1]));

		return hand;
	}

	dealRoyalFlush() {
		const hand = new Hand();
		hand.addCard(new Card("10", "Hearts"));
		hand.addCard(new Card("J", "Hearts"));
		hand.addCard(new Card("Q", "Hearts"));
		hand.addCard(new Card("K", "Hearts"));
		hand.addCard(new Card("A", "Hearts"));

		return hand;
	}

	dealStraightFlush() {
		const hand = new Hand();
		hand.addCard(new Card("9", "Diamonds"));
		hand.addCard(new Card("10", "Diamonds"));
		hand.addCard(new Card("J", "Diamonds"));
		hand.addCard(new Card("Q", "Diamonds"));
		hand.addCard(new Card("K", "Diamonds"));

		return hand;
	}

	dealFourOfAKind() {
		const hand = new Hand();
		hand.addCard(new Card("5", "Clubs"));
		hand.addCard(new Card("5", "Spades"));
		hand.addCard(new Card("5", "Clubs"));
		hand.addCard(new Card("5", "Diamonds"));
		hand.addCard(new Card("7", "Clubs"));

		return hand;
	}

	dealFullHouse() {
		const hand = new Hand();
		hand.addCard(new Card("8", "Clubs"));
		hand.addCard(new Card("2", "Spades"));
		hand.addCard(new Card("8", "Clubs"));
		hand.addCard(new Card("2", "Diamonds"));
		hand.addCard(new Card("8", "Clubs"));

		return hand;
	}

	dealFlush() {
		const hand = new Hand();
		hand.addCard(new Card("10", "Hearts"));
		hand.addCard(new Card("4", "Hearts"));
		hand.addCard(new Card("Q", "Hearts"));
		hand.addCard(new Card("K", "Hearts"));
		hand.addCard(new Card("7", "Hearts"));

		return hand;
	}

	dealStraight() {
		const hand = new Hand();
		hand.addCard(new Card("7", "Spades"));
		hand.addCard(new Card("8", "Hearts"));
		hand.addCard(new Card("9", "Diamonds"));
		hand.addCard(new Card("10", "Clubs"));
		hand.addCard(new Card("J", "Diamonds"));

		return hand;
	}

	dealWheel() {
		const hand = new Hand();
		hand.addCard(new Card("A", "Spades"));
		hand.addCard(new Card("3", "Hearts"));
		hand.addCard(new Card("2", "Diamonds"));
		hand.addCard(new Card("5", "Clubs"));
		hand.addCard(new Card("4", "Diamonds"));

		return hand;
	}

	dealThreeOfAKind() {
		const hand = new Hand();
		hand.addCard(new Card("4", "Clubs"));
		hand.addCard(new Card("9", "Spades"));
		hand.addCard(new Card("4", "Clubs"));
		hand.addCard(new Card("4", "Diamonds"));
		hand.addCard(new Card("7", "Clubs"));

		return hand;
	}

	dealTwoPair() {
		const hand = new Hand();
		hand.addCard(new Card("2", "Clubs"));
		hand.addCard(new Card("2", "Spades"));
		hand.addCard(new Card("7", "Clubs"));
		hand.addCard(new Card("7", "Diamonds"));
		hand.addCard(new Card("10", "Clubs"));

		return hand;
	}

	dealPair() {
		const hand = new Hand();
		hand.addCard(new Card("2", "Clubs"));
		hand.addCard(new Card("2", "Spades"));
		hand.addCard(new Card("8", "Clubs"));
		hand.addCard(new Card("Q", "Diamonds"));
		hand.addCard(new Card("10", "Clubs"));

		return hand;
	}

	dealHighCard() {
		const hand = new Hand();
		hand.addCard(new Card("K", "Clubs"));
		hand.addCard(new Card("2", "Spades"));
		hand.addCard(new Card("7", "Clubs"));
		hand.addCard(new Card("9", "Diamonds"));
		hand.addCard(new Card("4", "Clubs"));

		return hand;
	}
}

class Hand {
	constructor(cards) {
		this.cards = cards || [];
		this.ranks = [];
		this.handTitle = "";
		this.handScore = 0;
		this.suits = {
			Hearts: 0,
			Diamonds: 0,
			Clubs: 0,
			Spades: 0,
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
		let display = "";

		for (let card of this.cards) {
			display += `${card.rank}${card.suit[0]} `;
		}

		return display.trim();
	}

	score() {
		// determine the hand
		if (this.isFlush() && this.isStraight()) {
			if (this.ranks[0] === 10) {
				this.handTitle = "Royal Flush";
				this.handScore = valueOfHand(this.handTitle, this.ranks);
			} else {
				this.handTitle = "Straight Flush";
				this.handScore = valueOfHand(this.handTitle, this.ranks);
			}
		} else if (this.checkMatches(4)) {
			this.handTitle = "Four of a Kind";
			let match = [];
			let off = [];

			this.ranks.map((num) => {
				if (num === this.ranks[Math.floor(this.ranks.length / 2)]) {
					match.push(num);
				} else {
					off.push(num);
				}
			});

			this.handScore = valueOfHand(this.handTitle, match, off);
		} else if (this.checkMatches(3) && this.checkMatches(2)) {
			this.handTitle = "Full House";
			let match = [];
			let off = [];

			this.ranks.map((num) => {
				if (num === this.ranks[Math.floor(this.ranks.length / 2)]) {
					match.push(num);
				} else {
					off.push(num);
				}
			});

			this.handScore = valueOfHand(this.handTitle, match, off);
		} else if (this.isFlush()) {
			this.handTitle = "Flush";
			this.handScore = valueOfHand(this.handTitle, this.ranks);
		} else if (this.isStraight()) {
			this.handTitle = "Straight";
			this.handScore = valueOfHand(this.handTitle, this.ranks);
		} else if (this.checkMatches(3)) {
			this.handTitle = "Three of a Kind";
			let match = [];
			let off = [];

			this.ranks.map((num) => {
				if (num === this.ranks[Math.floor(this.ranks.length / 2)]) {
					match.push(num);
				} else {
					off.push(num);
				}
			});

			this.handScore = valueOfHand(this.handTitle, match, off);
		} else if (this.checkPairs()) {
			this.handTitle = "Two Pair";

			const match = this.ranks.reduce(function (acc, rank, index, arr) {
				if (arr.indexOf(rank) !== index && acc.indexOf(rank) < 0) {
					acc.push(rank);
					acc.push(rank);
				}
				return acc;
			}, []);

			const off = this.ranks.filter((rank) => {
				return !match.includes(rank);
			});

			this.handScore = valueOfHand(this.handTitle, match, off);
		} else if (this.checkMatches(2)) {
			this.handTitle = "Pair";
			const match = this.ranks.reduce(function (acc, rank, index, arr) {
				if (arr.indexOf(rank) !== index && acc.indexOf(rank) < 0) {
					acc.push(rank);
					acc.push(rank);
				}
				return acc;
			}, []);

			const off = this.ranks.filter((rank) => {
				return !match.includes(rank);
			});

			this.handScore = valueOfHand(this.handTitle, match, off);
		} else {
			this.handTitle = "High Card";
			this.handScore = valueOfHand(this.handTitle, this.ranks);
		}

		// score the hand
		function valueOfHand(hand, match = [], off = []) {
			const factor = {
				"Royal Flush": 10,
				"Straight Flush": 9,
				"Four of a Kind": 8,
				"Full House": 7,
				"Flush": 6,
				"Straight": 5,
				"Three of a Kind": 4,
				"Two Pair": 3,
				"Pair": 2,
				"High Card": 1,
			};

			let handString = "";

			for (const rank of match.sort((a, b) => b - a)) {
				handString += rank >= 10 ? rank : `0${rank}`;
			}

			for (const rank of off.sort((a, b) => b - a)) {
				handString += rank >= 10 ? rank : `0${rank}`;
			}

			return factor[hand] * 10000000000 + Number(handString);
		}

		// return results
		// this.handScore = factor[this.handTitle] * 10000000000 + valueOfHand(this.ranks);
		return `Hand: ${this.handTitle} Rank: ${this.ranks.join("-")} Score: ${this.handScore}`;
	}

	isFlush() {
		for (const suit in this.suits) {
			if (this.suits[suit] === 5) return true;
		}
		return false;
	}

	isStraight() {
		const straights = "1234567891011121314";
		const aceInHand = this.ranks.includes(14);

		if (aceInHand) {
			let isWheel = false;
			const rankCopy = [...this.ranks];
			rankCopy.splice(rankCopy.length - 1, 1, 1);
			rankCopy.sort((a, b) => a - b);
			isWheel = straights.includes(rankCopy.join(""));

			if (isWheel) {
				this.ranks = rankCopy;
				return true;
			} else {
				return straights.includes(this.ranks.join(""));
			}
		} else {
			return straights.includes(this.ranks.join(""));
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
			"2": 2,
			"3": 3,
			"4": 4,
			"5": 5,
			"6": 6,
			"7": 7,
			"8": 8,
			"9": 9,
			"10": 10,
			"J": 11,
			"Q": 12,
			"K": 13,
			"A": 14,
		};

		return ranks[this.rank];
	}
}

/*
 ** TEST DECK
 ** TEST DECK
 ** TEST DECK
 */
let testDeck = new TestDeck();
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

console.log(`ROYAL FLUSH (${handRoyalFlush.displayHand()}): \n${handRoyalFlush.score()}\n`);
console.log(`STRAIGHT FLUSH (${handStraightFlush.displayHand()}): \n${handStraightFlush.score()}\n`);
console.log(`4-KIND (${handFourOfAKind.displayHand()}): \n${handFourOfAKind.score()}\n`);
console.log(`FULL HOUSE (${handFullHouse.displayHand()}): \n${handFullHouse.score()}\n`);
console.log(`FLUSH (${handFlush.displayHand()}): \n${handFlush.score()}\n`);
console.log(`STRAIGHT (${handStraight.displayHand()}): \n${handStraight.score()}\n`);
console.log(`WHEEL (${handWheel.displayHand()}): \n${handWheel.score()}\n`);
console.log(`3-KIND (${handThreeOfAKind.displayHand()}): \n${handThreeOfAKind.score()}\n`);
console.log(`TWO PAIR (${handTwoPair.displayHand()}): \n${handTwoPair.score()}\n`);
console.log(`PAIR (${handPair.displayHand()}): \n${handPair.score()}\n`);
console.log(`HIGH CARD (${handHighCard.displayHand()}): \n${handHighCard.score()}\n`);

// // test full house
// const fullHouseOne = testDeck.dealTestHand(
// 	["5", "Hearts"],
// 	["5", "Diamonds"],
// 	["5", "Clubs"],
// 	["J", "Hearts"],
// 	["J", "Hearts"]
// );
// const fullHouseTwo = testDeck.dealTestHand(
// 	["2", "Hearts"],
// 	["2", "Diamonds"],
// 	["2", "Clubs"],
// 	["A", "Hearts"],
// 	["A", "Hearts"]
// );