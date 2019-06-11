pragma solidity ^0.5.2;

import '../token/interfaces/IERC20Token.sol';
import '../utility/DSAuth.sol';
import '../utility/Utils.sol';

contract DFPool is DSAuth, Utils {

    address dfcol;

    constructor (address _dfcol) public {
        dfcol = _dfcol;
    }

    function transferFromSender(address _tokenID, address _from, uint _amount)
        public
        auth
        returns (bool)
    {
        assert(IERC20Token(_tokenID).transferFrom(_from, address(this), _amount));
        return true;
    }

    function transferOut(address _tokenID, address _to, uint _amount)
        public
        validAddress(_to)
        auth
        returns (bool)
    {
        assert(IERC20Token(_tokenID).transfer(_to, _amount));
        return true;
    }

    function transferToCol(address _tokenID, uint _amount)
        public
        auth
        returns (bool)
    {
        require(dfcol != address(0), "TransferToCol: collateral address empty.");
        assert(IERC20Token(_tokenID).transfer(dfcol, _amount));
        return true;
    }

    function transferFromSenderToCol(address _tokenID, address _from, uint _amount)
        public
        auth
        returns (bool)
    {
        require(dfcol != address(0), "TransferFromSenderToCol: collateral address empty.");
        assert(IERC20Token(_tokenID).transferFrom(_from, dfcol, _amount));
        return true;
    }
}
