pragma solidity ^0.5.0;

import "./Authentication.sol";
import "./House.sol";

contract HouseAdmin is Authentication {

    House[] public houses;

    constructor() public {
        owner = msg.sender;
    }

    event Log(string text);

    function sellHouse(string memory _location, uint256 _price, uint256 _area) public returns (House _houseAddress) {
        // Create new house instance as passing arguments to its constructor !
        House house = new House(msg.sender, _location, _price * 1 ether, _area);
        houses.push(house);
        return house;
    }

    function getAllHouses() public view returns (House[] memory) {
        return houses;
    }

    /* Fallback methods ! */
    function() external payable {
        /* Fallback function ! */
    }

}
