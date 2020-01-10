pragma solidity ^0.5.0;

import "./Authentication.sol";
import "./House.sol";

contract HouseAdmin is Authentication {

    House[] public houses;

    constructor() public {
        ownerAddress = msg.sender;
    }

    event Log(string text);

    function sellHouse(string memory _name, string memory _email,
        string memory _phone, string memory _location, string memory _houseType,
        uint _bedrooms, uint _bathrooms, uint _area, uint _price) public returns (House _houseAddress) {
        // Create new house instance as passing arguments to its constructor !
        House house = new House(msg.sender, _name, _email, _phone,
            _location, _houseType, _bedrooms, _bathrooms, _area, _price);
        houses.push(house);
        return house;
    }

    function buyHouse(uint _id) public payable returns (bool _success) {
        // Get house instance as passing arguments to <houses> array !
        House house = houses[_id];
        // Make sure having enough money !
        require(msg.value >= house.getPrice() * 1 ether);
        // Buyer must not be owner !
        require(house.getOwner() != msg.sender);
        // Set the new owner and passing ether to that house contract !
        house.setOwner.value(house.getPrice() * 1 ether)(msg.sender);
        // Leftover money go back to your wallet !
        address(msg.sender).transfer(address(this).balance);
        return true;
    }

    function getAllHouses() public view returns (House[] memory) {
        return houses;
    }

}
