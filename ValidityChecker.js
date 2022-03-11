module.exports = class ValidityCheck {
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
		for (let i = 0; i < chain.length; i++) {
			const t = chain[i];
			if (t.hash !== t.getHash()) {
				return false;
			}
			if (i > 0 && t.prevHash !== chain[i - 1].hash) {
				return false;
			}
			return true;
		}
	}
};
