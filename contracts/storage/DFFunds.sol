pragma solidity ^0.5.2;

import '../token/interfaces/IERC20Token.sol';
import '../utility/DSAuth.sol';
import '../utility/Utils.sol';

contract DFFunds is DSAuth, Utils {

    function transferOut(address _tokenID, address _to, uint _amount)
        public
        validAddress(_to)
        auth
        returns (bool)
    {
        require(_to != address(0), "TransferOut: 0 address not allow.");
        assert(IERC20Token(_tokenID).transfer(_to, _amount));
        return true;
    }
}