// DO NOT MODIFY v
const faker = require('faker');
const crypto = require('crypto');
const ValidityChecker = require('./ValidityChecker');
// DO NOT MODIFY ^

/////////////////////////////////////////////////////////
// BLOCKCHAIN CLASS
// Your code goes here
class Blockchain extends ValidityChecker {
	constructor() {
		super();
		this.chain = [];
	}

	addBlock(blockData) {
		// Length of hash.
		let index = this.chain.length;
		// If the chain does not have length the previous hash will be 0, which defaults to false.
		// Think of this like a LinkedList.
		let prevHash = this.chain.length
			? this.chain[this.chain.length - 1].hash
			: 0;
		// Conditional that checks if the transaction is valid.
		// IF it is valid we add a block to the chain before returning the new block.
		// What property of the Block class is t? in checkValidTransaction.
		if (this.checkValidTransaction(blockData)) {
			const block = new Block(blockData, index, prevHash);
			// 'block' is an instance of the Block class therefore we have access to
			// the Block classe's properties and methods.
			this.chain.push(block);
			return block;
		}
		// ELSE we return an error.
		else {
			throw new Error('Transaction is Invalid');
		}
	}

	findTransaction(index) {
		return this.chain[index];
	}

	destroyChain() {
		this.chain = []; // Schneeb.
	}
}

/////////////////////////////////////////////////////////

class Block {
	// Declare our private identifiers so that our variables are immutable.
	// #data = null;
	// #index = null;
	// #prevHash = null;
	// #timeStamp = null;
	// #hash = null;
	/**
	 * @param data { sender:String, recipient:String, amount:Integer }
	 */
	constructor(data, index, prevHash) {
		this.data = data;
		this.index = index;
		this.prevHash = prevHash;
		this.timeStamp = Math.floor(Date.now() / 1000);
		this.hash = this.getHash();
	}

	getHash() {
		let string =
			JSON.stringify(this.data) + this.prevHash + this.index + this.timeStamp;
		let hash = crypto
			.createHmac('sha256', 'secret')
			.update(string)
			.digest('hex');
		return hash;
	}
}

///////////////////////////////////////////////////
// BLOCKCHAIN CLASS INSTANCES
// Your code goes here

const myBlockChain = new Blockchain()

// myBlockChain.addBlock({sender: 'NATO', recipient: 'Amsterdam', amount: 420})
// myBlockChain.addBlock({ sender: 'Ukraine', recipient: 'Russia', amount: 10000 });

// console.log(myBlockChain)

// console.log('Blockchain is valid: ', myBlockChain.checkChainValid(myBlockChain.chain))

// console.log(myBlockChain.chain[1])
// myBlockChain.chain[1].data.sender = 'Putin'
// console.log(myBlockChain.chain[1])

// console.log('Blockchain is valid: ', myBlockChain.checkChainValid(myBlockChain.chain))

// console.log(myBlockChain.findTransaction(0))

// adding lots of blocks this was the BONUS baby.

for (let i=0; i < 2000; i++) {
  const data = {}
  data.sender = faker.name.findName()
  data.recipient = faker.name.findName()
  data.amount = faker.datatype.number()

  myBlockChain.addBlock(data)
}

// console.log(myBlockChain)

console.log('Blockchain is valid: ', myBlockChain.checkChainValid(myBlockChain.chain))

myBlockChain.chain[420].data.sender = 'LilGreen AkaYoda'

console.log('Blockchain is valid: ', myBlockChain.checkChainValid(myBlockChain.chain))
///////////////////////////////////////////////////

// DO NOT MODIFY v
module.exports = {
	Blockchain,
	Block,
};
