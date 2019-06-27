const BN = require('bn.js');

const Protocol = artifacts.require('DFProtocol.sol');
const Pool = artifacts.require('DFPool.sol');
const Engine = artifacts.require('DFEngine.sol');
const USDx = artifacts.require('DSToken.sol');
const Collaterals = artifacts.require('Collaterals_t.sol');
const DF = artifacts.require('DSToken.sol');
const DF_Addr = "0x4AF82b7C2F049574C9fc742A896DAbEA379b7d51";

module.exports = async function (deployer, network, accounts) {

    if (network == 'development' || network == 'production')
        return;

    let contractProtocol = await Protocol.deployed();
    let contractPool = await Pool.deployed();
    let contarctEngine = await Engine.deployed();
    let contractUSDx = await USDx.deployed();
    
    const daiAddr = "0xf494e07dfdbce883bf699cedf818fde2fa432db4";
    const paxAddr = "0x2901ea287e0299d595783faedae3ca0ab2bc4e53";
    const tusdAddr = "0xfb010ff66700b6ace85fa68e2d98ab754b6f7af4";
    const usdcAddr = "0x481f8ff13489695b2e1c81691a95a81f8cb96e32";

    let contractDAI = await Collaterals.at(daiAddr);
    let contractPAX = await Collaterals.at(paxAddr);
    let contractTUSD = await Collaterals.at(tusdAddr);
    let contractUSDC = await Collaterals.at(usdcAddr);
    let contractDF = await DF.at(DF_Addr);

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

    let amount = new BN(Number(10 ** 28).toLocaleString().replace(/,/g, ''));

    await contractDAI.approve.sendTransaction(contractPool.address, amount).then(result => {
        print("contractDAI.approve");
        printTx(result.tx);
    }).catch(error => {
        perror("contractDAI.approve")
    })

    await contractPAX.approve.sendTransaction(contractPool.address, amount).then(result => {
        print("contractPAX.approve");
        printTx(result.tx);
    }).catch(error => {
        perror("contractPAX.approve")
    })

    await contractTUSD.approve.sendTransaction(contractPool.address, amount).then(result => {
        print("contractTUSD.approve");
        printTx(result.tx);
    }).catch(error => {
        perror("contractTUSD.approve")
    })

    await contractUSDC.approve.sendTransaction(contractPool.address, amount).then(result => {
        print("contractUSDC.approve");
        printTx(result.tx);
    }).catch(error => {
        perror("contractUSDC.approve")
    })

    await contractDF.approve.sendTransaction(contarctEngine.address, amount).then(result => {
        print("contractDF.approve");
        printTx(result.tx);
    }).catch(error => {
        perror("contractDF.approve")
    })

    await contractUSDx.approve.sendTransaction(contarctEngine.address, amount).then(result => {
        print("contractUSDx.approve");
        printTx(result.tx);
    }).catch(error => {
        perror("contractUSDx.approve")
    })

    let daiW = new BN(Number(0.01 * 10 ** 18).toLocaleString().replace(/,/g, ''));
    let paxW = new BN(Number(0.03 * 10 ** 12).toLocaleString().replace(/,/g, ''));
    let tusdW = new BN(Number(0.03 * 10 ** 8).toLocaleString().replace(/,/g, ''));
    let usdcW = new BN(Number(0.03 * 10 ** 6).toLocaleString().replace(/,/g, ''));

    await contractProtocol.deposit.sendTransaction(daiAddr, new BN(0), daiW.mul(new BN(100))).then(result => {
        print("contractProtocol.deposit");
        printTx(result.tx);
    }).catch(error => {
        perror("contractProtocol.deposit")
    })

    await contractProtocol.deposit.sendTransaction(paxAddr, new BN(0), paxW.mul(new BN(200))).then(result => {
        print("contractProtocol.deposit");
        printTx(result.tx);
    }).catch(error => {
        perror("contractProtocol.deposit")
    })

    await contractProtocol.deposit.sendTransaction(tusdAddr, new BN(0), tusdW.mul(new BN(150))).then(result => {
        print("contractProtocol.deposit");
        printTx(result.tx);
    }).catch(error => {
        perror("contractProtocol.deposit")
    })

    await contractProtocol.deposit.sendTransaction(usdcAddr, new BN(0), usdcW.mul(new BN(100))).then(result => {
        print("contractProtocol.deposit");
        printTx(result.tx);
    }).catch(error => {
        perror("contractProtocol.deposit")
    })

    await contractProtocol.withdraw.sendTransaction(tusdAddr, new BN(0), tusdW.mul(new BN(100))).then(result => {
        print("contractProtocol.withdraw");
        printTx(result.tx);
    }).catch(error => {
        perror("contractProtocol.withdraw")
    })

    await contractProtocol.claim.sendTransaction(new BN(0)).then(result => {
        print("contractProtocol.claim");
        printTx(result.tx);
    }).catch(error => {
        perror("contractProtocol.claim")
    })

    await contractProtocol.destroy.sendTransaction(new BN(0), daiW.mul(new BN(100))).then(result => {
        print("contractProtocol.destroy");
        printTx(result.tx);
    }).catch(error => {
        perror("contractProtocol.destroy")
    })

    await contractProtocol.oneClickMinting.sendTransaction(new BN(0), daiW.mul(new BN(10000))).then(result => {
        print("contractProtocol.oneClickMinting");
        printTx(result.tx);
    }).catch(error => {
        perror("contractProtocol.oneClickMinting")
    })
};