pragma solidity ^0.5.0;

import "./Buyable.sol";

contract Installable is Buyable {

    uint256 internal installmentDueDate;
    uint256 internal installmentPaymentDate;
    uint256 internal installmentPaymentCharge;
    uint256 internal installmentPaymentStep; // For Development Purposes !
    uint256 internal installmentDuration;
    uint256 internal interestRate;
    uint256 internal repayRate;
    address payable internal installmentBuyer;
    address internal acceptAddress;
    bool internal installable;

    /* <now> is the alias for <block.timestamp> expression, which
    is the Unix timestamp of the 'latest' block had been mined ! */
    event InitializeInstallmentSuccess(
        address installmentBuyer
    );

    /* Can pay by installment if and only if the house is
    not yet in process and owner allows to partially pay ! */
    modifier _installable() {
        if (installable && !inProcess) {
            _;
        } else {
            revert("YOU CANNOT PAY BY INSTALLMENT FOR THIS HOUSE !");
        }
    }

    modifier _inProcess(bool _option) {
        if (_option) {
            if (inProcess && installmentBuyer != address(0)) {
                _;
            } else {
                revert("THE HOUSE IS CURRENTLY NOT IN PROCESS !");
            }
        } else {
            if (!inProcess && installmentBuyer == address(0)) {
                _;
            } else {
                revert("THE HOUSE IS CURRENTLY IN PROCESS !");
            }
        }
    }

    /* If transferring more than the required amount then the leftover go back to sender account ! */
    function safeRepayTransfer(uint256 _installmentPaymentCharge, uint256 _repayRate) internal {
        uint256 repay = uint256(_installmentPaymentCharge * _repayRate) / 100;
        /* This contract will store the specific percentage of annual charge ! */
        address(this).transfer(repay);
        /* Transfer the immediate payment to the current owner ! */
        address(owner).transfer(_installmentPaymentCharge - repay);
        /* Leftover money go back to sender wallet ! */
        address(msg.sender).transfer(msg.value - _installmentPaymentCharge);
    }

    /* Start pay the house by installment in this smart contract ! */
    function installmentPayment() public payable _installable() _isOwner(false) _enoughEther(installmentPaymentCharge) {
        require(now >= installmentDueDate, "THE HOUSE IS CURRENTLY IN INSTALLMENT PROCESS !");
        require(msg.sender == acceptAddress, "YOUR ADDRESS IS NOT ACCEPTED TO RENT THIS HOUSE !");
        safeRepayTransfer(installmentPaymentCharge, repayRate);
        installmentDueDate = now + installmentDuration;
        installmentPaymentDate = now + installmentPaymentStep;
        installmentBuyer = msg.sender;
        acceptAddress = address(0);
        inProcess = true;
        buyable = false;
        emit InitializeInstallmentSuccess(installmentBuyer);
    }

    /* Pay the monthly fee to keep the contract installment payment in process ! */
    function chargeInstallmentContract() public payable _isOwner(false) _enoughEther(installmentPaymentCharge) {
        require(inProcess && msg.sender == installmentBuyer, "YOU ARE NOT BUYER OR HOUSE IS NOT IN PROCESS !");
        require(installmentPaymentDate < installmentDueDate, "INSTALLMENT CONTRACT PAYMENT OVERTIME !");
        safeRepayTransfer(installmentPaymentCharge, repayRate);
        installmentPaymentDate += installmentPaymentStep;
        /* Set the new owner if he or she successfully payed for the last partial step ! */
        if (installmentPaymentDate >= installmentDueDate) {
            /* Send all ether stored in this contract as repay value to old owner ! */
            address(owner).transfer(address(this).balance);
            /* Set the new owner ! */
            owner = installmentBuyer;
            /* Reset the state of house installment-paid contract ! */
            installmentBuyer = address(0);
            inProcess = false;
            installable = false;
            installmentDueDate = now;
            installmentPaymentDate = now;
            emit TransferOwnerSuccess(owner);
        }
    }

    /* If reached payment day but buyer has not yet pay,
    the owner could kick the buyer out of the contract ! */
    function resetInstallmentContract() public _isOwner(true) {
        require(now >= installmentPaymentDate, "IT HAS NOT BEEN YET REACHED PAYMENT DATE !");
        require(inProcess, "THE HOUSE HAS NOT BEEN INSTALLMENT PAID YET !");
        /* Send all ether stored in this contract as repay value to installment buyer ! */
        address(installmentBuyer).transfer(address(this).balance);
        /* Reset the state of house installment-paid contract ! */
        installmentBuyer = address(0);
        inProcess = false;
        installable = true;
        buyable = true;
        installmentDueDate = now;
        installmentPaymentDate = now;
        emit TransactionSuccess();
    }

    /* Only Getter methods ! */
    function getInstallmentDetail() public view returns (uint256 _installmentDueDate, uint256 _installmentPaymentDate,
        uint256 _installmentPaymentCharge, uint256 _installmentPaymentStep, uint256 _installmentDuration,
        uint256 _interestRate, uint256 _repayRate,
        address payable _installmentBuyer, bool _inInstallmentProcess, bool _canInstallmentPaid)
    {
        return (
        installmentDueDate, installmentPaymentDate,
        installmentPaymentCharge, installmentPaymentStep, installmentDuration,
        interestRate, repayRate,
        installmentBuyer, inProcess, installable
        );
    }

    /* Only Setter methods ! */
    function setInstallmentPayment(uint256 _repayRate, uint256 _interestRate, uint256 _installmentPaymentStep,
        uint256 _installmentDuration, bool _canInstallmentPaid, address _acceptAddress) public _isOwner(true) _inProcess(false)
    {
        require((_repayRate >= 0) && (_repayRate <= 100), "REPAY RATE MUST BE IN BETWEEN 0% AND 100% !");
        require(_interestRate > 0, "INTEREST RATE MUST BE LARGER THAN 0 !");
        require(_installmentPaymentStep > 0, "PAYMENT STEP MUST BE LARGER THAN 0 !");
        require(_installmentDuration >= _installmentPaymentStep, "DURATION MUST BE GREATER THAN OR EQUAL TO PAYMENT STEP !");
        require((_installmentDuration % _installmentPaymentStep) == 0, "DURATION MUST BE DIVISIBLE BY PAYMENT STEP !");
        uint256 totalPayment = price + uint256(price * (_interestRate + 2)) / 100;
        installmentPaymentCharge = uint256(totalPayment * _installmentPaymentStep) / _installmentDuration;
        installmentPaymentStep = _installmentPaymentStep;
        installmentDuration = _installmentDuration;
        installable = _canInstallmentPaid;
        acceptAddress = _acceptAddress;
        interestRate = _interestRate;
        repayRate = _repayRate;
        emit TransactionSuccess();
    }

    function setInstallable(bool _canInstallmentPaid) public _isOwner(true) {
        installable = _canInstallmentPaid;
        emit TransactionSuccess();
    }

    /* Fallback methods ! */
    function() external payable {
        /* Fallback function ! */
    }

}
