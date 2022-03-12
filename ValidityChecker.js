module.exports = class ValidityCheck {
	// Think of transaction / 't' as the block's data.
	checkValidTransaction(t) {
		let transactionValid;
		if (t.sender && t.amount && t.recipient) {
			transactionValid = true;
		} else {
			transactionValid = false;
		}
		return transactionValid;
	}

	checkChainValid(chain) {
		// We are iterating through an array (chain) of items (blocks).
		for (let i = 0; i < chain.length; i++) {
			const t = chain[i];
			// We are comparing hashes to determine if the chain is valid.
			// if the recorded hash is not equal to the generated hash.
			if (t.hash !== t.getHash()) {
				return false;
			}
			// if the chain has a length greather than 1,
			// AND the blocks previous hash does not equal
			// the hash of the block at the previous index.
			// We know that the chain is invalid.
			if (i > 0 && t.prevHash !== chain[i - 1].hash) {
				return false;
			}
		}
		// Otherwise the chain is valid.
		return true;
	}
};
