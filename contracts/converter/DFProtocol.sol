pragma solidity ^0.5.2;

import '../update/DFUpgrader.sol';

contract DFProtocol is DFUpgrader {
    /******************************************/
    /* Public events that will notify clients */
    /******************************************/

    /**
     * @dev Emmit when `_tokenAmount` tokens of `_tokenID` deposits from one account(`_sender`),
     * and show the amout(`_usdxAmount`) tokens generate.
     */
    event Deposit (address indexed _tokenID, address indexed _sender, uint _tokenAmount, uint _usdxAmount);

    /**
     * @dev Emmit when `_expectedAmount` tokens of `_tokenID` withdraws from one account(`_sender`),
     * and show the amount(`_actualAmount`) tokens have been withdrawed successfully.
     *
     * Note that `_actualAmount` may be less than or equal to `_expectedAmount`.
     */
    event Withdraw(address indexed _tokenID, address indexed _sender, uint _expectedAmount, uint _actualAmount);

    /**
     * @dev Emmit when `_amount` USDx were destroied from one account(`_sender`).
     */
    event Destroy (address indexed _sender, uint _usdxAmount);

    /**
     * @dev Emmit when `_usdxAmount` USDx were claimed from one account(`_sender`).
     */
    event Claim(address indexed _sender, uint _usdxAmount);

    /**
     * @dev Emmit when `_amount` USDx were minted from one account(`_sender`).
     */
    event OneClickMinting(address indexed _sender, uint _usdxAmount);

    /******************************************/
    /*            User interfaces             */
    /******************************************/

    /**
     * @dev The caller deposits `_tokenAmount` tokens of `_tokenID`,
     * and the caller would like to use `_feeTokenIdx` as the transaction fee.
     *
     * Note that: 1)For `_tokenID`: it should be one of the supported stabel currencies.
     *            2)For `_feeTokenIdx`: 0 is DF, and 1 is USDx.
     *
     * Returns a uint value indicating the total amount that generating USDx.
     *
     * Emits a `Deposit` event.
     */
    function deposit(address _tokenID, uint _feeTokenIdx, uint _tokenAmount) public returns (uint){
        uint _usdxAmount = iDFEngine.deposit(msg.sender, _tokenID, _feeTokenIdx, _tokenAmount);
        emit Deposit(_tokenID, msg.sender, _tokenAmount, _usdxAmount);
        return _usdxAmount;
    }

    /**
     * @dev The caller withdraws `_expectedAmount` tokens of `_tokenID`,
     * and the caller would like to use `_feeTokenIdx` as the transaction fee.
     *
     * Returns a uint value indicating the total amount of the caller has withdrawed successfully.
     *
     * Emits a `Withdraw` event.
     */
    function withdraw(address _tokenID, uint _feeTokenIdx, uint _expectedAmount) public returns (uint) {
        uint _actualAmount = iDFEngine.withdraw(msg.sender, _tokenID, _feeTokenIdx, _expectedAmount);
        emit Withdraw(_tokenID, msg.sender, _expectedAmount, _actualAmount);
        return _actualAmount;
    }

    /**
     * @dev The caller destroies `_usdxAmount` USDx,
     * and the caller would like to use `_feeTokenIdx` as the transaction fee.
     *
     * Emits a `Destroy` event.
     */
    function destroy(uint _feeTokenIdx, uint _usdxAmount) public {
        iDFEngine.destroy(msg.sender, _feeTokenIdx, _usdxAmount);
        emit Destroy(msg.sender, _usdxAmount);
    }

    /**
     * @dev The caller claims to get spare USDx he can get,
     * and the caller would like to use `_feeTokenIdx` as the transaction fee.
     *
     * Returns a uint value indicating the total amount of the caller has claimed.
     *
     * Emits a `Claim` event.
     */
    function claim(uint _feeTokenIdx) public returns (uint) {
        uint _usdxAmount = iDFEngine.claim(msg.sender, _feeTokenIdx);
        emit Claim(msg.sender, _usdxAmount);
        return _usdxAmount;
    }

    /**
     * @dev The caller mints `_usdxAmount` USDx directly,
     * and the caller would like to use `_feeTokenIdx` as the transaction fee.
     *
     * Emits a `OneClickMinting` event.
     */
    function oneClickMinting(uint _feeTokenIdx, uint _usdxAmount) public {
        iDFEngine.oneClickMinting(msg.sender, _feeTokenIdx, _usdxAmount);
        emit OneClickMinting(msg.sender, _usdxAmount);
    }
}
