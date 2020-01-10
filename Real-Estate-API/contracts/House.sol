pragma solidity ^0.5.0;

import "./Authentication.sol";

contract House is Authentication {

    string private ownerName;
    string private ownerEmail;
    string private ownerPhone;
    string private houseLocation;
    string private houseType;
    uint private bedrooms;
    uint private bathrooms;
    uint private area;
    uint private price;
    bool private active;

    event TransferSuccess(
        address payable newOwner,
        uint price
    );

    constructor(address payable _ownerAddress, string memory _name, string memory _email,
        string memory _phone, string memory _location, string memory _houseType,
        uint _bedrooms, uint _bathrooms, uint _area, uint _price) public payable {
        ownerAddress = _ownerAddress;
        ownerName = _name;
        ownerEmail = _email;
        ownerPhone = _phone;
        houseLocation = _location;
        houseType = _houseType;
        bedrooms = _bedrooms;
        bathrooms = _bathrooms;
        area = _area;
        price = _price;
        active = true;
    }

    function setOwner(address payable _newOwner) public payable returns (bool _success) {
        // House must be in active status !
        require(active);
        // Buyer must not be owner !
        require(ownerAddress != msg.sender);
        // New owner must not be old one !
        require(ownerAddress != _newOwner);
        require(address(this).balance >= price * 1 ether);
        address(ownerAddress).transfer(address(this).balance);
        // Assign new owner !
        ownerAddress = _newOwner;
        return true;
    }

    function getOwnerName() public view returns (string memory _ownerName) {
        return ownerName;
    }

    function setOwnerName(string memory _ownerName) public _isOwner() {
        ownerName = _ownerName;
    }

    function getOwnerEmail() public view returns (string memory _ownerEmail) {
        return ownerEmail;
    }

    function setOwnerEmail(string memory _ownerEmail) public _isOwner() {
        ownerEmail = _ownerEmail;
    }

    function getOwnerPhone() public view returns (string memory _ownerPhone) {
        return ownerPhone;
    }

    function setOwnerPhone(string memory _ownerPhone) public _isOwner() {
        ownerPhone = _ownerPhone;
    }

    function getLocation() public view returns (string memory _houseLocation) {
        return houseLocation;
    }

    function setLocation(string memory _houseLocation) public _isOwner() {
        houseLocation = _houseLocation;
    }

    function getType() public view returns (string memory _houseType) {
        return houseType;
    }

    function setType(string memory _houseType) public _isOwner() {
        houseType = _houseType;
    }

    function getBedrooms() public view returns (uint _bedrooms) {
        return bedrooms;
    }

    function setBedrooms(uint _bedrooms) public _isOwner() {
        bedrooms = _bedrooms;
    }

    function getBathrooms() public view returns (uint _bathrooms) {
        return bathrooms;
    }

    function setBathrooms(uint _bathrooms) public _isOwner() {
        bathrooms = _bathrooms;
    }

    function getArea() public view returns (uint _area) {
        return area;
    }

    function setArea(uint _area) public _isOwner() {
        area = _area;
    }

    function getPrice() public view returns (uint _price) {
        return price;
    }

    function setPrice(uint _price) public _isOwner() {
        price = _price;
    }

    function getState() public view returns (bool _active) {
        return active;
    }

    function setState(bool _active) public _isOwner() {
        active = _active;
    }

    function() external payable {
        // Fallback function !
    }

}
