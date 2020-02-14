pragma solidity ^0.5.0;

import "./Authentication.sol";

contract Buyable is Authentication {

    uint256 internal price;
    bool internal buyable;

    event TransferOwnerSuccess(
        address payable newOwner
    );

    modifier _buyable() {
        if (buyable) {
            _;
        } else {
            revert("YOU CANNOT BUY THIS HOUSE !");
        }
    }

    /* House must be in Buyable status, Buyer must not be Owner and enough Ethers ! */
    function buy() public payable _buyable() _isOwner(false) {
        /* Transfer ether from sender to owner ! */
        safeTransferTo(owner, price);
        /* Set new owner ! */
        owner = msg.sender;
        emit TransferOwnerSuccess(owner);
    }

    /* Only Getter methods ! */
    function getBuyDetail() public view returns (uint256 _price, bool _canBuyImmediately) {
        return (price, buyable);
    }

    /* Only Setter methods ! */
    function setBuyPayment(uint256 _price, bool _canBuyImmediately) public _isOwner(true) {
        price = _price;
        buyable = _canBuyImmediately;
    }

}
