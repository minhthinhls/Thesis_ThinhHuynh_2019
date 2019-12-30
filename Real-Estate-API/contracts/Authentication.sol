pragma solidity ^0.5.0;

contract Authentication {

    address payable ownerAddress;

    function setOwner(address payable _newOwner) public payable returns (bool _success) {
        ownerAddress = _newOwner;
        return true;
    }

    function getOwner() public view returns (address payable _currentOwner) {
        return ownerAddress;
    }

}
