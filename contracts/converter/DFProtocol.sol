pragma solidity ^0.5.2;

import '../update/DFUpgrader.sol';

contract DFProtocol is DFUpgrader {

    event Deposit (address indexed _tokenID, address indexed _sender, uint _amount, uint _balance);
    event Withdraw(address indexed _tokenID, address indexed _sender, uint _amount, uint _balance);
    event Destroy (address indexed _sender, uint _amount);
    event Claim   (address indexed _sender, uint _balance);
    event OneClickMinting(address indexed _sender, uint _amount);

    function deposit(address _tokenID, uint _feeTokenIdx, uint _amount) public returns (uint){
        uint _balance = iDFEngine.deposit(msg.sender, _tokenID, _feeTokenIdx, _amount);
        emit Deposit(_tokenID, msg.sender, _amount, _balance);
        return _balance;
    }

    function withdraw(address _tokenID, uint _feeTokenIdx, uint _amount) public returns (uint) {
        uint _balance = iDFEngine.withdraw(msg.sender, _tokenID, _feeTokenIdx, _amount);
        emit Withdraw(_tokenID, msg.sender, _amount, _balance);
        return _balance;
    }

    function destroy(uint _feeTokenIdx, uint _amount) public {
        iDFEngine.destroy(msg.sender, _feeTokenIdx, _amount);
        emit Destroy(msg.sender, _amount);
    }

    function claim(uint _feeTokenIdx) public returns (uint) {
        uint _balance = iDFEngine.claim(msg.sender, _feeTokenIdx);
        emit Claim(msg.sender, _balance);
        return _balance;
    }

    function getUSDXForDeposit(address _tokenID, uint _amount) public view returns (uint) {
        return iDFEngine.getDepositMaxMint(msg.sender, _tokenID, _amount);
    }

    function getUserMaxToClaim() public view returns (uint) {
        return iDFEngine.getMaxToClaim(msg.sender);
    }

    function getColMaxClaim() public view returns (address[] memory, uint[] memory) {
        return iDFEngine.getCollateralMaxClaim();
    }

    function getMintingSection() public view returns (address[] memory, uint[] memory) {
        return iDFEngine.getMintingSection();
    }

    function getBurningSection() public view returns (address[] memory, uint[] memory) {
        return iDFEngine.getBurningSection();
    }

    function getUserWithdrawBalance() public view returns (address[] memory, uint[] memory) {
        return iDFEngine.getWithdrawBalances(msg.sender);
    }

    function getPrice(uint _tokenIdx) public view returns (uint) {
        return iDFEngine.getPrices(_tokenIdx);
    }

    function getFeeRate(uint _processIdx) public view returns (uint) {
        return iDFEngine.getFeeRateByID(_processIdx);
    }

    function getDestroyThreshold() public view returns (uint) {
        return iDFEngine.getDestroyThreshold();
    }

    function oneClickMinting(uint _feeTokenIdx, uint _amount) public {
        iDFEngine.oneClickMinting(msg.sender, _feeTokenIdx, _amount);
        emit OneClickMinting(msg.sender, _amount);
    }
}
