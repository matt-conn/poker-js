export class Card {
	rank: string;
	suit: string;

	constructor(rank: string, suit: string) {
		this.rank = rank;
		this.suit = suit;
	}

	getRankValue() {
		type test = {
			[key: string]: number;
		}
		let ranks: test = {
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
			'A': 14,
		};

		return ranks[this.rank];
	}
}
