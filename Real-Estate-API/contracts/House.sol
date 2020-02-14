pragma solidity ^0.5.0;

import "./Authentication.sol";
import "./HouseProperty.sol";
import "./Installable.sol";
import "./Rentable.sol";

contract House is HouseProperty, Rentable, Installable {

    event TransferOwnerSuccess(
        address payable newOwner
    );

    constructor(address payable _owner, string memory _location, uint _price, uint _area) public payable {
        /* Default Part */
        owner = _owner;
        /* House Property Part */
        location = _location;
        area = _area;
        active = true;
        /* Buying Part */
        price = _price;
        buyable = true;
        /* Renting Part */
        rented = false;
        rentable = false;
        rentalPaymentCharge = 1 ether;
        rentalPaymentStep = 30 days;
        rentalDuration = 30 days;
        /* Installment Payment Part */
        inProcess = false;
        installable = false;
        installmentPaymentCharge = 1 ether;
        installmentPaymentStep = 30 days;
        installmentDuration = 90 days;
    }

    /* Fallback methods ! */
    function() external payable {
        /* Fallback function ! */
    }

}
