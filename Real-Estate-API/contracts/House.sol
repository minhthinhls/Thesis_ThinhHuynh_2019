pragma solidity ^0.5.0;

contract House {
    address ownerAddress;
    string public ownerName;
    string public ownerEmail;
    string public location;

    uint public area;
    uint public price;
    uint public ownerPhone;

    constructor(string memory _name, uint _area, uint _price) public {
        ownerAddress = msg.sender;
        ownerName = _name;
        area = _area;
        price = _price;
    }

    modifier _isOwner() {
        if (msg.sender != ownerAddress) {
            revert();
        }
        _;
    }

    function setOwner(address _newOwner) _isOwner public returns (bool ok){
        ownerAddress = _newOwner;
        return true;
    }
}
