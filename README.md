# USDx

### Prepare

```
npm install -g truffle
npm install -g ganache-cli
```

### Install

```
~/$ git clone https://github.com/HorsenLi/USDx_1.0.git
~/$ cd ./USDx_1.0
~/USDx_1.0$ npm install
```

### Build

```
~/USDx_1.0$ npm run build
```

### Test

You will need to open a new terminal to start the `ganache-cli`.
```
~/$ ganache-cli --port=7545 --gasLimit=8000000 --accounts=10 --defaultBalanceEther=10000
```

Go back to original terminal.
```
~/USDx_1.0$ truffle test ./test/DFEngine_deposit_claim.js > testDF_deposit_claim.log
```

### Deploy

#### private network

Download `Ganache-cli` or `Ganache(GUI)`, start private network to simulation Ethereum network

```
~/USDx_1.0$ truffle migrate
```

#### publick network

Sign up [Infura](https://infura.io/), save project id for configration of `truffle-config.js`

```
~/USDx_1.0$ mv .env.example .env
```

You will need to edit the `.env` file with your local environment variables.

##### kovan

```
~/USDx_1.0$ truffle migrate --network kovan
```

##### ropsten

```
~/USDx_1.0$ truffle migrate --network ropsten
```

##### rinkeby

```
~/USDx_1.0$ truffle migrate --network rinkeby
```
