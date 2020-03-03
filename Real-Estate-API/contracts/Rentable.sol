pragma solidity ^0.5.0;

import "./Authentication.sol";

contract Rentable is Authentication {

    uint256 internal rentalDueDate;
    uint256 internal rentalPaymentDate;
    uint256 internal rentalPaymentCharge;
    uint256 internal rentalPaymentStep; // For Development Purposes !
    uint256 internal rentalDuration;
    address internal renter;
    bool internal rented;
    bool internal rentable;

    /* <now> is the alias for <block.timestamp> expression, which
    is the Unix timestamp of the 'latest' block had been mined ! */
    event RentSuccess(
        address renter
    );

    event ExtendSuccess(
        address renter
    );

    /* Can rent if and only if the house is
    not yet rented and owner allows to rent ! */
    modifier _rentable() {
        if (rentable && !rented) {
            _;
        } else {
            revert("YOU CANNOT RENT THIS HOUSE !");
        }
    }

    modifier _isRented(bool _option) {
        if (_option) {
            if (rented && renter != address(0)) {
                _;
            } else {
                revert("THE HOUSE IS CURRENTLY NOT RENTED !");
            }
        } else {
            if (!rented && renter == address(0)) {
                _;
            } else {
                revert("THE HOUSE IS CURRENTLY RENTED !");
            }
        }
    }

    /* Start renting the house in this smart contract ! */
    function rent() public payable _rentable() _isOwner(false) _enoughEther(rentalPaymentCharge) {
        require(now >= rentalDueDate, "THE HOUSE IS CURRENTLY BEING RENTED !");
        safeTransferTo(owner, rentalPaymentCharge);
        rentalDueDate = now + rentalDuration;
        rentalPaymentDate = now + rentalPaymentStep;
        renter = msg.sender;
        rented = true;
        emit RentSuccess(renter);
    }

    /* Pay the monthly fee to extend renting time ! */
    function chargeRentalContract() public payable _isOwner(false) _enoughEther(rentalPaymentCharge) {
        require(rented && msg.sender == renter, "YOU ARE NOT RENTER OR HOUSE NOT RENTED !");
        require(rentalPaymentDate < rentalDueDate, "RENTAL CONTRACT PAYMENT OVERTIME !");
        safeTransferTo(owner, rentalPaymentCharge);
        rentalPaymentDate += rentalPaymentStep;
        emit ExtendSuccess(renter);
    }

    /* If reached payment day but renter has not yet pay, 
    the owner could kick the renter out of the contract ! */
    function resetRentalContract() public _isOwner(true) {
        require(now >= rentalPaymentDate, "IT HAS NOT BEEN YET REACHED PAYMENT DATE !");
        require(rented, "THE HOUSE HAS NOT BEEN RENTED YET !");
        renter = address(0);
        rented = false;
        rentable = false;
        emit TransactionSuccess();
    }

    /* Only Getter methods ! */
    function getRentalDetail() public view returns (uint256 _rentalDueDate, uint256 _rentalPaymentDate,
        uint256 _rentalPaymentCharge, uint256 _rentalPaymentStep, uint256 _rentalDuration,
        address _renter, bool _rented, bool _canRent)
    {
        return (
        rentalDueDate, rentalPaymentDate,
        rentalPaymentCharge, rentalPaymentStep, rentalDuration,
        renter, rented, rentable
        );
    }

    /* Only Setter methods ! */
    function setRentalPayment(uint256 _rentalPaymentCharge, uint256 _rentalPaymentStep,
        uint256 _rentalDuration, bool _allowRent) public _isOwner(true) _isRented(false)
    {
        require(_rentalPaymentCharge > 0, "PAYMENT CHARGE MUST BE LARGER THAN 0 !");
        require(_rentalPaymentStep > 0, "PAYMENT STEP MUST BE LARGER THAN 0 !");
        require(_rentalDuration >= _rentalPaymentStep, "DURATION MUST BE GREATER THAN OR EQUAL TO PAYMENT STEP !");
        require((_rentalDuration % _rentalPaymentStep) == 0, "DURATION MUST BE DIVISIBLE BY PAYMENT STEP !");
        rentalPaymentCharge = _rentalPaymentCharge;
        rentalPaymentStep = _rentalPaymentStep;
        rentalDuration = _rentalDuration;
        rentable = _allowRent;
        emit TransactionSuccess();
    }

    function setRentable(bool _allowRent) public _isOwner(true) {
        rentable = _allowRent;
        emit TransactionSuccess();
    }

}
