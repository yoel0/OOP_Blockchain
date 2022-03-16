// DO NOT MODIFY v
const faker = require('faker');
const crypto = require('crypto');
const ValidityChecker = require('./ValidityChecker');
// DO NOT MODIFY ^

/////////////////////////////////////////////////////////
// BLOCKCHAIN CLASS
// Your code goes here
class Blockchain {
	constructor() {
		this.chain = [];
	}
}

/////////////////////////////////////////////////////////

class Block {
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

///////////////////////////////////////////////////

// DO NOT MODIFY v
module.exports = {
	Blockchain,
	Block,
};
