pragma solidity ^0.5.0;

import "./Authentication.sol";

contract House is Authentication {

    string private ownerName;
    string private ownerEmail;
    string private location;

    uint private area;
    uint private price;
    uint private ownerPhone;

    event TransferSuccess(
        address payable newowner,
        uint price
    );

    constructor(address payable _ownerAddress, string memory _name, uint _area, uint _price) public payable {
        ownerAddress = _ownerAddress;
        ownerName = _name;
        area = _area;
        price = _price;
    }

    function setOwner(address payable _newOwner) public payable returns (bool _success) {
        require(ownerAddress != msg.sender); // Buyer must not be owner !
        require(ownerAddress != _newOwner); // New owner must not be old one !
        require(address(this).balance >= price * 1 ether);
        address(ownerAddress).transfer(address(this).balance);
        ownerAddress = _newOwner; // Assign new owner !
        return true;
    }

    function getPrice() public view returns(uint _value) {
        return price;
    }

    function () external payable {
        // Fallback function !
    }

}
