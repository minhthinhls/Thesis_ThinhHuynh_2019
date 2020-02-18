pragma solidity ^0.5.0;

contract Authentication {

    address payable internal owner;

    modifier _isOwner(bool _option) {
        if (_option) {
            if (msg.sender == owner) {
                _;
            } else {
                revert("YOU ARE NOT OWNER !");
            }
        } else {
            if (msg.sender != owner) {
                _;
            } else {
                revert("YOU ARE OWNER ALREADY !");
            }
        }
    }

    modifier _enoughEther(uint256 _value) {
        if (msg.value >= _value) {
            _;
        } else {
            revert("TRANSACTION NOT ENOUGH ETHER !");
        }
    }

    function toEther(uint256 _amount) internal pure returns (uint256) {
        return _amount * 1 ether;
    }

    /* If transferring more than the required amount then the leftover go back to sender account ! */
    function safeTransferTo(address payable _to, uint256 _amount) internal {
        address(_to).transfer(_amount);
        /* Leftover money go back to sender wallet ! */
        address(msg.sender).transfer(msg.value - _amount);
    }

    /* Only current owner could set the new owner ! */
    function setOwner(address payable _newOwner) public payable _isOwner(true) returns (bool _success) {
        owner = _newOwner;
        return true;
    }

    function getOwner() public view returns (address payable _currentOwner) {
        return owner;
    }

}
