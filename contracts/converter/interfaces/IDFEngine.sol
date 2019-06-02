pragma solidity ^0.5.2;

contract IDFEngine {
    function deposit(address _sender, address _tokenID, uint _feeTokenIdx, uint _amount) public returns (uint);
    function withdraw(address _sender, address _tokenID, uint _feeTokenIdx, uint _amount) public returns (uint);
    function destroy(address _sender, uint _feeTokenIdx, uint _amount) public returns (bool);
    function claim(address _sender, uint _feeTokenIdx) public returns (uint);
    function getDepositMaxMint(address _depositor, address _tokenID, uint _amount) public returns (uint);
    function getMaxToClaim(address _depositor) public returns (uint);
    function getCollateralMaxClaim() public returns (address[] memory, uint[] memory);
    function getMintingSection() public returns(address[] memory, uint[] memory);
    function getBurningSection() public returns(address[] memory, uint[] memory);
    function getWithdrawBalances(address _depositor) public returns(address[] memory, uint[] memory);
    function getPrices(uint typeID) public returns (uint);
    function getFeeRateByID(uint typeID) public returns (uint);
    function getDestroyThreshold() public view returns (uint);
}