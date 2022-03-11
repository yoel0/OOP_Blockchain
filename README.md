# Building A Blockchain With Object Oriented Programming
<div>
<img src="https://coincentral.com/wp-content/uploads/2017/11/blockchain.png" alt="blockchain" />
</div>

## What is Blockchain and why do we care?

From [builtin.com](https://builtin.com/blockchain)

 Blockchain, sometimes referred to as Distributed Ledger Technology (DLT), makes the history of any digital asset unalterable and transparent through the use of decentralization and cryptographic hashing.
<br>
A simple analogy for understanding blockchain technology is a Google Doc. When we create a document and share it with a group of people, the document is distributed instead of copied or transferred. This creates a decentralized distribution chain that gives everyone access to the document at the same time. No one is locked out awaiting changes from another party, while all modifications to the doc are being recorded in real-time, making changes completely transparent.
<br>
Of course, blockchain is more complicated than a Google Doc, but the analogy is apt because it illustrates three critical ideas of the technology:
<br>
 - Digital assets are distributed instead of copied or transferred.
 - The asset is decentralized, allowing full real-time access.
 - A transparent ledger of changes preserves integrity of the document, which creates trust in the asset.
 
## Building Our Own Blockchain
In this exercise, you will be creating a blockchain that can add its own verified blocks of data for distributed ledgers. This visual may help in understanding what is going on here.
<div>
 <img src="https://blog.sagipl.com/wp-content/uploads/2017/10/Building-Your-Own-Blockchain.gif" alt="moblocks" />
</div>

### Getting Started

- `Fork` and `Clone` this repository
- `cd` into the directory
- `npm install`
- `npm run test` (to check that everything was installed correctly)

Starter code has been provided. You will only be modifiying code for the `Blockchain` class and in the area marked for `Blockchain class instances`.

**DO NOT MODIFY ANY CODE AT THE TOP OF solution.js**

### Step One

Take a look at the file called `ValidityChecker.js`, do not modify this file in any way but notice what is going on in its 2 methods `checkValidTransaction` and `checkChainValid`.

We need to leverage these methods in order to build our blockchain. The file is already made available to you in `solution.js` via the `require()` at the top of `solution.js`. So to use it `solution.js`, all you will need to do is call `ValidityChecker`.

Our `Blockchain` class needs to be able to access the methods inside of `ValidityChecker`.

Inheret the methods into the `BlockChain` class. A couple key words to consider here with JavaScript class inheritance are `extends` and `super`.

Run `npm run test` to check your work. At this point, you should have 2 tests passing:
```
 ✓ It should extend ValidityChecker => Can access checkChainValid
 ✓ It should extend ValidityChecker => Can access checkValidTransaction
```

### Step Two

We need to add a couple of methods in order to build our blockchain. Start by creating a function in the `BlockChain` class, beneath its constructor class, called `addBlock`. Pay attention to naming here, the test will fail if the function is misspelled.

This `addBlock` function should accept one parameter. This parameter will be named `block`.

Add this code inside the `addBlock` method. Make sure to keep it at the top of the method.

```js
let index = this.chain.length
let prevHash = this.chain.length ? this.chain[this.chain.length - 1].hash : 0
```

Run `npm run test` to check your work. You should now have 3 tests passing:
```
 ✓ It should extend ValidityChecker => Can access checkChainValid (1 ms)
 ✓ It should extend ValidityChecker => Can access checkValidTransaction
 ✓ Has a function called addBlock
```

### Step Three

Since our `addBlock` function is accepting the parameter `block`, it should DO something with block inside the method. But first, let's take a look at what else we might need to ensure that a transaction is valid before adding a block.

Before we add a new block to our blockchain, we need to ensure that it has a valid transaction.
- First, look at what `checkValidTransaction` is checking for in `ValidityChecker.js`. What 3 things is `checkValidTransaction` checking for?
- What does `checkValidTransaction` return in each case?
- Now, take a good look at the `Block` class in `solution.js`. What 3 parameters does it require? 


Let's put it all together.
<br>
Write a conditional inside of `addBlock` that checks to see if an _instance_ of `checkValidTransaction` (inherited from ValidityChecker) is valid. If the transaction is valid we need to create a `new` instance of the `Block` class and `add` it to our chain before returning the new instance.  The `Block` class accepts some sort of data, an index and a previousHash. You'll have to figure out what data should be sent inside the parameters of the `new Block` class instance. A couple things to note:
- `checkValidTransaction` requires one parameter. How is this parameter related to the `Block` class?
- `addBlock` accepts `block` as a parameter. How does `block` relate to `checkValidTransaction`?

If the transaction is invalid we need to return an error.
We can do that by utilizing javascipts error class.

```js
throw new Error('Transaction is Invalid')
```

- **[More on the `Error` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)**

- **[What is `throw`?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)**

Run `npm run test` to check your work. At this point you should have 5 tests passing:
```
  ✓ It should extend ValidityChecker => Can access checkChainValid 
  ✓ It should extend ValidityChecker => Can access checkValidTransaction
  ✓ Has a function called addBlock 
  ✓ addBlock should take a parameter called block and return a new block (1 ms)
  ✓ addBlock should add the new block to the chain
```

### Step Four

Let's test out our new `addBlock` method.

At the bottom of the file, above the `module.exports`, create a `new` instance of the `BlockChain` class.

We should now be able to access the `addBlock` method. To access the `addBlock` method of this new instance of the `BlockChain` class, you will need to use an instance method below your declaration of the new instance, like so:

```js
myInstancesName.addBlock()
```


**Inside the parameter** of this instance's `addBlock` method, create a new block object to add to our blockchain. This object will have 3 key value pairs: a sender, a recipient and an amount.

Ex:

```js
{
    sender: String,
    recipient: String,
    amount: Number
}
```

If every step so far was done correctly, the new transaction should be in our blockchain.
Console.log the instance of the `BlockChain` class you've created to verify your work. It should look something like this in your console.log:

```js
    [
      Block {
        data: { sender: 'Some Person', recipient: 'Some Other Person', amount: 1500 },
        index: 0,
        prevHash: 0,
        timeStamp: 1602117806,
        hash: '70ba80adb24ba4c476c9567a8026e5d8ffc90880c0ca6efa78f95f4eb393d2ed'
      }
    ]
 ```

**Congratulations** you've successfully added our first transaction to our blockchain!

### Step Five

Now that you've added your first transaction, we need to ensure that every transaction is **tamper proof**.

The `checkChainValid` method has been provided within the `ValidityChecker` class to allow you to do this.

Console.log the result of the `checkChainValid` on the instance of your new `Blockchain` class to your console to see if the chain is valid or not. Remember we should only access this method from our created instance of the `Blockchain` class, like so:

```js
myNewBlockChain.checkChainValid(someValueFromMyNewBlockChain)
```



<details>
<summary>Helpful tip</summary>
Tag your console.log for easier viewing in the terminal.

Ex:

```js
console.log('My Tag: ', someValue)
```

</details>

If the result comes back true then our blockchain is good to go!

### Step 6

We need a way to get specific transactions for viewing.

Create a `findTransaction` method in our `BlockChain` class below the `addBlock` method. This method should accept one parameter `index` and should `return` a transaction at the index. 
- What data type the `chain` in our `Blockchain` class?
- How might we access the a value from the chain with the `index` parameter?

Console.log this transaction to the console by accessing it underneath where you added a new block to your instance of the `Blockchain` class. To do this, you will need to enter the index of the block you previously added.

```js
console.log(chainInstance.findTransaction(someIndexValue)
```

Run `npm run test` to check your work. Your console should return the `Block` in your chain whose `index` you specifed. It should look something like this.
```js
   Block {
      data: { sender: 'Some Person', recipient: 'Some Other Person', amount: 1500 },
      index: 0,
      prevHash: 0,
      timeStamp: 1602118933,
      hash: 'e6b2fc359c1371d37037e53e478e08eaed5bc410a094dfb3a6b39cb4e6ba2eba'
    }
```

You should also now have these 7 tests passing:
```
    ✓ It should extend ValidityChecker => Can access checkChainValid 
    ✓ It should extend ValidityChecker => Can access checkValidTransaction 
    ✓ Has a function called addBlock
    ✓ Has a function called findTransaction
    ✓ addBlock should take a parameter called block and return a new block 
    ✓ addBlock should add the new block to the chain
    ✓ findTransaction should take a parameter called index and return that block
 ```

### Step 7

Let's ensure that our blockchain instance is tamper proof. **Underneath** where you first checked to see if your new instance of the `Blockchain` class had a valid chain, **reassign a transaction's sender to something different inside its chain**. 

<br> It may be helpful here to look at the console.log of your `Blockchain` instance's `chain` to see how its data is structured. 

A few things to note:
- Your `Blockchain` instance has a chain. What data type is the chain and how might you access values within it?
- Each block in the chain is an object with 5 keys: `data`, `index`, `prevHash`, `timeStamp`, and `hash`.
- How might you access the `sender` key inside the `data` object within a `block` inside the `chain`?

Now check if the chain is valid once more, like you did in **Step 5**, below where you just reassigned the `sender`. It should return false if done correctly.

Our blockchain is definitely tamper proof!

### Step 8

Just in case we ever want to be a bit evil, we should create a method that wipes the entire chain. Yes, we're gonna be those people :)

Create a method called `destroyChain` below `findTransaction` inside the `Blockchain` class. This method should wipe the entire blockchain.
- What data type is the `chain` in `Blockchain`? How might you delete or remove values from it?

Run `npm run test` to check your work.

If the test passes... We are now evil people :) .... JK

## Closing

If all of your tests pass successfully, **you just built your first blockchain**! Let's build the next Bitcoin!

```
    ✓ It should extend ValidityChecker => Can access checkChainValid (2 ms)
    ✓ It should extend ValidityChecker => Can access checkValidTransaction
    ✓ Has a function called addBlock
    ✓ Has a function called findTransaction (1 ms)
    ✓ addBlock should take a parameter called block and return a new block (1 ms)
    ✓ addBlock should add the new block to the chain
    ✓ findTransaction should take a parameter called index and return that block
    ✓ destroyBlock should wipe the chain
```

Make sure to submit a pull request once you've finished!


## Bonus

Create a function that creates a large amount of transactions and adds them to our blockchain. This can be a seperate method.

<details>
<summary>Hint</summary>
You may want to look into:

- `new Array`
- `array.fill`
</details>
<br>
You've also been provided with a package called faker that allows us to generate some awesome fake data quickly! It's imported at the top of the `solution.js file`. Happy Coding!

**[More On Faker](https://github.com/Marak/Faker.js#readme)**

Try making 10, 50, 100 or maybe 1000 transactions!


<div>
 <img src="https://cdn-images-1.medium.com/max/1600/0*CBdplDXxsopDV-Ik." alt="evenmoblocks">
</div>