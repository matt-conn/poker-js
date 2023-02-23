// Code Challenge
// How's you poker face? | Poker Hand

// Challenge: Create a function that returns back the results of a 5-card stud poker hand.

// Parameters: each card passed into function as a string with no spaces (e.g. seven of hearts = 7H)
// Cards: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 (J, Q, K, A represented by numbers)
// Suits: H (hearts), D (diamonds), C (clubs), S (spades)
// pokerHand(['10D','11D','12D','13D','14D'])

function pokerHand(hand) {
	let cards = [];
	let suits = [];
	let sets = {};
	let flush = false;
	let straight = false;
	let four = false;
	let three = false;
	let pair = false;
	let numPairs = 0;

	let rank = "234567891011121314";
	let wheel = "234514";

	// break cards into numbers and suits
	for (let card of hand) {
		cards.push(Number(card.slice(0, -1)));
		suits.push(card.slice(-1));
	}

	// check for flush
	flush = suits.every((suit) => suit === suits[0]);

	// check for straight
	cards.sort((a, b) => a - b);
	straight = rank.includes(cards.join(""));
	wheel = wheel.includes(cards.join(""));

	// create sets
	for (const card of cards) {
		sets[card] = sets[card] + 1 || 1;
	}

	for (const x in sets) {
		if (sets[x] === 4) {
			four = true;
		} else if (sets[x] === 3) {
			three = true;
		} else if (sets[x] === 2) {
			numPairs += 1;
			pair = true;
		}
	}

	// poker hands
	if (straight && flush) {
		return cards[0] === 10 ? "royal flush" : "straight flush";
	} else if (four) {
		return "four-of-a-kind";
	} else if (three && pair) {
		return "full house";
	} else if (flush) {
		return "flush";
	} else if (straight) {
		return "straight";
	} else if (wheel) {
		return "wheel";
	} else if (three) {
		return "three-of-a-kind";
	} else if (pair) {
		return numPairs === 2 ? "two pair" : "pair";
	} else {
		return "high card";
	}
}

// poker hand tests
// console.log(`ROYAL FLUSH: ${pokerHand(['10D','11D','12D','13D','14D'])}`); // royal flush
// console.log(`STRAIGHT FLUSH: ${pokerHand(['8H','9H','10H','11H','12H'])}`); // straight flush
// console.log(`FOUR-OF-A-KIND: ${pokerHand(['8H','8D','8S','8D','2C'])}`); // four-of-a-kind
// console.log(`FULL HOUSE: ${pokerHand(['8H','8D','8S','2D','2C'])}`); // full house
// console.log(`FLUSH: ${pokerHand(['8C','7C','2C','2C','11C'])}`); // flush
// console.log(`STRAIGHT: ${pokerHand(['5H','6D','7S','8D','9C'])}`); // straight
// console.log(`STRAIGHT (ACE HIGH): ${pokerHand(['10H','11D','12S','13D','14C'])}`); // straight, ace high
// console.log(`STRAIGHT (ACE LOW): ${pokerHand(['14H','2D','3S','4D','5C'])}`); // wheel, ace low
// console.log(`THREE-OF-A-KIND: ${pokerHand(['11H','11D','11S','2D','7C'])}`); // three-of-a-kind
// console.log(`TWO PAIR: ${pokerHand(['4H','5D','10S','10D','4C'])}`); // two pair
// console.log(`PAIR: ${pokerHand(['4H','5D','10S','7D','4C'])}`); // pair
// console.log(`HIGH CARD: ${pokerHand(['4H','5D','6S','7D','12C'])}`); // high card

function pokerScore(hand) {
	const baseScores = {
		"royal flush": 1000,
		"straight flush": 900,
		"four-of-a-kind": 800,
		"full house": 700,
		straight: 600,
		wheel: 500,
		"three-of-a-kind": 400,
		"two pair": 300,
		pair: 200,
		"high card": 100,
	};

	// base score + score of cards
	//! would work for all hands besides full house
	//! 66622 would lose to a 555JJ
}
