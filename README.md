# USDx
### Contracts Deployed in Mainnet（2020-03-25）
<table>
	<tr>
   		<th>Contract Name</th>
    	<th>Contract Address</th>
	</tr>
	<tr>
		<td> USDx </td>
		<td> 0xeb269732ab75A6fD61Ea60b06fE994cD32a83549 </td>
	</tr>
	<tr>
		<td> DF </td>
		<td> 0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0 </td>
	</tr>
	<tr>
		<td> DSGuard </td>
		<td> 0xE4BF7DAa758f5D5f966bF345e24db016180373C5 </td>
	</tr>
	<tr>
		<td> DFStore </td>
		<td> 0xD30d06b276867CfA2266542791242fF37C91BA8d </td>
	</tr>
	<tr>
		<td> DFFunds </td>
		<td> 0xD5478011CCB79189a240a96EC913a8021b54cE6d </td>
	</tr>
	<tr>
		<td> DFEngine </td>
		<td> 0x8Dc753D30b9F9f86dAc3380e37d5bC03D6b60202 </td>
	</tr>
    <tr>
		<td> DFCollateral </td>
		<td> 0x617bED8699F71fE830a50469bd474bc8481F5235 </td>
	</tr>
	<tr>
		<td> DFPool </td>
		<td> 0x786bF554473f9aB733Fd683C528212492A23D895 </td>
	</tr>
	<tr>
		<td> DFSetting </td>
		<td> 0x801C4a04AaD875B6AA91a2EC1346393eE348A32e </td>
	</tr>
	<tr>
		<td> DFProtocol </td>
		<td> 0x5843F1Ccc5baA448528eb0e8Bc567Cda7eD1A1E8 </td>
	</tr>
</table>


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
