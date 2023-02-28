import { Card } from "../card";

class Hand {
	cards: Card[];
	ranks: number[];
	handTitle: string;
	handScore: number;
	suits: any;

	constructor(cards: Card[]) {
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

	addCard(card: Card) {
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
			let match: number[] = [];
			let off: number[] = [];

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
			let match: number[] = [];
			let off: number[] = [];

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
			let match: number[] = [];
			let off: number[] = [];

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

			const match: number[] = this.ranks.reduce(function (acc: number[], rank, index, arr) {
				if (arr.indexOf(rank) !== index && acc.indexOf(rank) < 0) {
					acc.push(rank);
					acc.push(rank);
				}
				return acc;
			}, []);

			const off: number[] = this.ranks.filter((rank) => {
				return !match.includes(rank);
			});

			this.handScore = valueOfHand(this.handTitle, match, off);
		} else if (this.checkMatches(2)) {
			this.handTitle = "Pair";
			const match: number[] = this.ranks.reduce(function (acc: number[], rank, index, arr) {
				if (arr.indexOf(rank) !== index && acc.indexOf(rank) < 0) {
					acc.push(rank);
					acc.push(rank);
				}
				return acc;
			}, []);

			const off: number[] = this.ranks.filter((rank) => {
				return !match.includes(rank);
			});

			this.handScore = valueOfHand(this.handTitle, match, off);
		} else {
			this.handTitle = "High Card";
			this.handScore = valueOfHand(this.handTitle, this.ranks);
		}

		// score the hand
		function valueOfHand(hand: string, match: number[] = [], off: number[] = []) {
			const factor: any = {
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

	checkMatches(numCards: number) {
		let matches: any = {};

		for (const rank of this.ranks) {
			matches[rank] = matches[rank] + 1 || 1;
		}

		for (const match in matches) {
			if (matches[match] === numCards) {
				return true;
			}
		}

		return false;
	}

	checkPairs() {
		let matches: any = {};
		let numPairs: number = 0;

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
