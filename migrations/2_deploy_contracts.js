const BN = require('bn.js');

const Funds = artifacts.require('DFFunds.sol');
const Protocol = artifacts.require('DFProtocol.sol');
const ProtocolView = artifacts.require('DFProtocolView.sol');
const Store = artifacts.require('DFStore.sol');
const Pool = artifacts.require('DFPool.sol');
const Collateral = artifacts.require('DFCollateral.sol');
const Engine = artifacts.require('DFEngine.sol');
const Guard = artifacts.require('DSGuard.sol');
const PriceFeed = artifacts.require('PriceFeed.sol');
const Medianizer = artifacts.require('Medianizer.sol');
const USDx = artifacts.require('DSToken.sol');
const Setting = artifacts.require('DFSetting.sol');
const DSWrappedToken = artifacts.require('DSWrappedToken.sol');
// const DF = artifacts.require('DFToken.sol');

// const USDx_Addr = "0x17996ea27d03d68ddc618f9b8f0faf43838acaf6";
const DF_Addr = "0xb7dd4a376d3c3680a939f6ec2c5b5a737a60710a";

let daiW = new BN(Number(0.01 * 10 ** 18).toLocaleString().replace(/,/g, ''));
let paxW = new BN(Number(0.03 * 10 ** 18).toLocaleString().replace(/,/g, ''));
let tusdW = new BN(Number(0.03 * 10 ** 18).toLocaleString().replace(/,/g, ''));
let usdcW = new BN(Number(0.03 * 10 ** 18).toLocaleString().replace(/,/g, ''));

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(USDx, "0x6b6b00000000000000000000000000");
    // await deployer.deploy(DF, "0x6b6600000000000000000000000000");
    await deployer.deploy(Guard);
    await deployer.deploy(Protocol);

    await deployer.deploy(DSWrappedToken, '0x506243424a778382f73bf6c24390d08fa9096092', 18, "0x6b6b00000000000000000000000000");
    let xDAI = await DSWrappedToken.deployed();
    await deployer.deploy(DSWrappedToken, '0xd414e78d5db39e90c704070943e067ffc0eb3d86', 13, "0x6b6c00000000000000000000000000");
    let xPAX = await DSWrappedToken.deployed();
    await deployer.deploy(DSWrappedToken, '0xfeb2112e370091f25a2f96fb600484700a0ed603', 10, "0x6b6a00000000000000000000000000");
    let xTUSD = await DSWrappedToken.deployed();
    await deployer.deploy(DSWrappedToken, '0x71abccd90dbb09c37686e4d5026c2d9597d469cb', 6, "0x6b6800000000000000000000000000");
    let xUSDC = await DSWrappedToken.deployed();

    console.log('----------------------------------\n');
    console.log('xDAI address : ' + xDAI.address);
    console.log('xPAX address : ' + xPAX.address);
    console.log('xTUSD address : ' + xTUSD.address);
    console.log('xUSDC address : ' + xUSDC.address);
    console.log('----------------------------------\n');
    await deployer.deploy(Store,
        [
            xDAI.address,
            xPAX.address,
            xTUSD.address,
            xUSDC.address,
        ],
        [daiW, paxW, tusdW, usdcW]);
    let contractCollateral = await deployer.deploy(Collateral);
    await deployer.deploy(Funds, DF_Addr);
    let contractPool = await deployer.deploy(Pool, Collateral.address);
    await deployer.deploy(Medianizer);
    await deployer.deploy(PriceFeed);
    await deployer.deploy(Engine, USDx.address, Store.address, Pool.address, Collateral.address, Funds.address);
    await deployer.deploy(Setting, Store.address);

    await deployer.deploy(ProtocolView, Store.address, Collateral.address, Funds.address);

    let count = 0

    function print(str) {
        count++;
        console.log(`\n${count} #######`, str);
    }

    function printTx(str) {
        console.log(`\n-#######`, str);
    }

    function perror(str) {
        console.log(`\n!!!!!!!`, str);
    }

    // xDAI
    await xDAI.setAuthority.sendTransaction(Engine.address).then(result => {
        print("xDAI.setAuthority");
        printTx(result.tx);
    }).catch(error => {
        perror("xDAI.setAuthority")
    })

    // xPAX
    await xPAX.setAuthority.sendTransaction(Engine.address).then(result => {
        print("xPAX.setAuthority");
        printTx(result.tx);
    }).catch(error => {
        perror("xPAX.setAuthority")
    })

    // xTUSD
    await xTUSD.setAuthority.sendTransaction(Engine.address).then(result => {
        print("xTUSD.setAuthority");
        printTx(result.tx);
    }).catch(error => {
        perror("xTUSD.setAuthority")
    })

    // xUSDC
    await xUSDC.setAuthority.sendTransaction(Engine.address).then(result => {
        print("xUSDC.setAuthority");
        printTx(result.tx);
    }).catch(error => {
        perror("xUSDC.setAuthority")
    })

    await contractPool.approveToEngine.sendTransaction(xDAI.address, Engine.address).then(result => {
        print("contractPool.approve xDAI");
        printTx(result.tx);
    }).catch(error => {
        perror("contractPool.approve xDAI")
    })

    await contractPool.approveToEngine.sendTransaction(xPAX.address, Engine.address).then(result => {
        print("contractPool.approve xPAX");
        printTx(result.tx);
    }).catch(error => {
        perror("contractPool.approve xPAX")
    })
    await contractPool.approveToEngine.sendTransaction(xTUSD.address, Engine.address).then(result => {
        print("contractPool.approve xTUSD");
        printTx(result.tx);
    }).catch(error => {
        perror("contractPool.approve xTUSD")
    })
    await contractPool.approveToEngine.sendTransaction(xUSDC.address, Engine.address).then(result => {
        print("contractPool.approve xUSDC");
        printTx(result.tx);
    }).catch(error => {
        perror("contractPool.approve xUSDC")
    })
    await contractCollateral.approveToEngine.sendTransaction(xDAI.address, Engine.address).then(result => {
        print("contractCollateral.approve xDAI");
        printTx(result.tx);
    }).catch(error => {
        perror("contractCollateral.approve xDAI")
    })
    await contractCollateral.approveToEngine.sendTransaction(xPAX.address, Engine.address).then(result => {
        print("contractCollateral.approve xPAX");
        printTx(result.tx);
    }).catch(error => {
        perror("contractCollateral.approve xPAX")
    })
    await contractCollateral.approveToEngine.sendTransaction(xTUSD.address, Engine.address).then(result => {
        print("contractCollateral.approve xTUSD");
        printTx(result.tx);
    }).catch(error => {
        perror("contractCollateral.approve xTUSD")
    })
    await contractCollateral.approveToEngine.sendTransaction(xUSDC.address, Engine.address).then(result => {
        print("contractCollateral.approve xUSDC");
        printTx(result.tx);
    }).catch(error => {
        perror("contractCollateral.approve xUSDC")
    })
};