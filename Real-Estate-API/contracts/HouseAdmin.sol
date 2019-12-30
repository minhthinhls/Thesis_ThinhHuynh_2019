pragma solidity ^0.5.0;

import "./Authentication.sol";
import "./House.sol";

contract HouseAdmin is Authentication {

    mapping(address => House[]) public ownedHousesOf;
    address[] public owners;
    House[] public houses;

    constructor() public {
        ownerAddress = msg.sender;
    }

    event Log(string text);

    function sellHouse(string memory _name, uint _area, uint _price) public returns (House) {
        House house = new House(msg.sender, _name, _area, _price);
        if (ownedHousesOf[msg.sender].length == 0) {
            owners.push(msg.sender);
        }
        ownedHousesOf[msg.sender].push(house);
        houses.push(house);
        return house;
    }

    function buyHouse(House _houseAddress) public payable returns (bool _success) {
        require(msg.value >= _houseAddress.getPrice() * 1 ether); // Make sure having enough money !
        require(_houseAddress.getOwner() != msg.sender); // Buyer must not be owner !
        _houseAddress.setOwner.value(_houseAddress.getPrice() * 1 ether)(msg.sender);
        address(msg.sender).transfer(address(this).balance); // Leftover money go back to your wallet !
        return true;
    }

    function getOwnedHouses() public view returns (House[] memory) {
        return ownedHousesOf[msg.sender];
    }

    function getAllOwners() public view returns (address[] memory) {
        return owners;
    }

    function getAllHouses() public view returns (House[] memory) {
        return houses;
    }

}
