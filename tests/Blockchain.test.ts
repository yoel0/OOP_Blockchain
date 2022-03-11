const { Block, Blockchain } = require('../solution');

describe('Blockchain ', () => {
	interface block {
		sender?: String;
		recipient?: String;
		amount?: Number;
	}
	let index: number = 0;
	const bChain: typeof Blockchain = new Blockchain();
	let param: block = { sender: 'Name', recipient: 'Name', amount: 32 };
	let testBlock: typeof Block = new Block(param, 0, 0);

	test('It should extend ValidityChecker => Can access checkChainValid', () => {
		expect(bChain.checkChainValid).toBeDefined();
	});

	test('It should extend ValidityChecker => Can access checkValidTransaction', () => {
		expect(bChain.checkChainValid).toBeDefined();
	});

	test('Has a function called addBlock', () => {
		expect(bChain.addBlock).toBeDefined();
	});

	test('Has a function called findTransaction', () => {
		expect(bChain.findTransaction).toBeDefined();
	});

	test('addBlock should take a parameter called block and return a new block', () => {
		expect(bChain.addBlock(param)).toEqual(testBlock);
	});

	test('addBlock should add the new block to the chain', () => {
		expect(bChain.chain.length).toEqual(1);
	});

	test('findTransaction should take a parameter called index and return that block', () => {
		expect(bChain.findTransaction(index)).toEqual(testBlock);
	});
	test('destroyBlock should wipe the chain', () => {
		expect(bChain.destroyChain).toBeDefined();
		bChain.destroyChain();
		expect(bChain.chain.length).toEqual(0);
	});
});
