pragma solidity ^0.5.0;

import "./Buyable.sol";

contract Installable is Buyable {

    uint256 internal installmentDueDate;
    uint256 internal installmentPaymentDate;
    uint256 internal installmentPaymentCharge;
    uint256 internal installmentPaymentStep; // For Development Purposes !
    uint256 internal installmentDuration;
    address payable internal installmentBuyer;
    bool internal inProcess;
    bool internal installable;

    /* <now> is the alias for <block.timestamp> expression, which
    is the Unix timestamp of the 'latest' block had been mined */
    event InitializeInstallmentSuccess(
        address renter
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

    /* Start pay the house by installment in this smart contract ! */
    function installmentPayment() public payable _installable() _isOwner(false) _enoughEther(installmentPaymentCharge) {
        require(now >= installmentDueDate);
        safeTransferTo(owner, installmentPaymentCharge);
        installmentDueDate = now + installmentDuration;
        installmentPaymentDate = now + installmentPaymentStep;
        installmentBuyer = msg.sender;
        inProcess = true;
        emit InitializeInstallmentSuccess(installmentBuyer);
    }

    /* Pay the monthly fee to keep the contract installment payment in process */
    function chargeInstallmentContract() public payable _isOwner(false) _enoughEther(installmentPaymentCharge) {
        require(msg.sender == installmentBuyer);
        safeTransferTo(owner, installmentPaymentCharge);
        installmentPaymentDate += installmentPaymentStep;
        /* Set the new owner if he or she successfully payed for the last partial step ! */
        if (installmentPaymentDate >= installmentDueDate) {
            owner = installmentBuyer;
            this.resetInstallmentContract();
            emit TransferOwnerSuccess(owner);
        }
    }

    /* If reached payment day but buyer has not yet pay,
    the owner could kick the buyer out of the contract !*/
    function resetInstallmentContract() public _isOwner(true) {
        require(now >= installmentPaymentDate);
        installmentBuyer = address(0);
        inProcess = false;
        installable = false;
    }

    /* Only Getter methods ! */
    function getInstallmentDetail() public view returns (uint256 _installmentDueDate, uint256 _installmentPaymentDate,
        uint256 _installmentPaymentCharge, uint256 _installmentPaymentStep, uint256 _installmentDuration,
        address payable _installmentBuyer, bool _inInstallmentProcess, bool _canInstallmentPaid)
    {
        return (
        installmentDueDate, installmentPaymentDate,
        installmentPaymentCharge, installmentPaymentStep, installmentDuration,
        installmentBuyer, inProcess, installable
        );
    }

    /* Only Setter methods ! */
    function setInstallmentPayment(uint256 _interestRate, uint256 _installmentPaymentStep,
        uint256 _installmentDuration, bool _canInstallmentPaid) public _isOwner(true) _inProcess(false)
    {
        uint256 totalPayment = price + price * _interestRate / 100;
        installmentPaymentCharge = uint256(totalPayment * _installmentPaymentStep) / _installmentDuration;
        installmentPaymentStep = _installmentPaymentStep;
        installmentDuration = _installmentDuration;
        installable = _canInstallmentPaid;
    }

    function setInstallable(bool _canInstallmentPaid) public _isOwner(true) {
        installable = _canInstallmentPaid;
    }

}
