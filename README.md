# Overview

This is my first project in Solidity and Ethereum! I've learned how to deploy
and run a smart contract on the Ethereum blockchain.

# Land

The purpose of this smart contract is to simplify land registration and
eliminate scammers. It includes various methods, and here are a few important
ones:

-   `transferOwnership`: This function transfers the ownership of the land to
    another Ethereum account. Only the account specified in the owner variable
    can execute this function.
-   `whoIsTheOwner`: This function allows others to find out who the owner of
    the land is.
-   `changeMyDetails`: This function enables the owner to modify their details.
    Only the owner can call this function.

# Deploy with Hardhat to Infura Sepolia

### Install the packages

```bash
npm i
```

### Configure the deployment:

```bash
mv .env.example .env
```

and fill in the details in `.env`

### Compile the contracts:

```bash
npx hardhat compile
```

### Deploy the contract:

```bash
npx hardhat run --network sepolia scripts/deploy.js
```

# Testing the Deployed Contract

To test a deployed contract by doing the steps above, You need to use Land UI -
a testing place for contracts.

Land UI is made with React and Vite, so you need to `cd` into `land_ui` and
start the server.

Here are the steps to do that:

## `cd`

```bash
cd land_ui
```

## Install Packages

```bash
npm i
```

## Start the Server

```bash
npm run dev
```

# YouTube Videos

If you're interested in learning Solidity and smart contracts, I found these
videos helpful in gaining a better understanding of the concepts. Each video has
a maximum duration of 20 minutes:

-   [Learn Solidity in 20 minutes!](https://www.youtube.com/watch?v=RQzuQb0dfBM)
-   [How to Code your first Smart Contract](https://www.youtube.com/watch?v=ooN6kZ9vqNQ)
