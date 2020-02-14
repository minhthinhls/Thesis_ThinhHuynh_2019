pragma solidity ^0.5.0;

import "./Authentication.sol";

contract HouseProperty is Authentication {

    string internal location;
    uint256 internal area;
    bool internal active;

    /* Only Getter methods ! */
    function getHouseDetail() public view returns (address payable _owner,
        string memory _location, uint256 _area, bool _active)
    {
        return (owner, location, area, active);
    }

    /* Only Setter methods ! */
    function setHouseDetail(string memory _location, uint256 _area,
        bool _active) public _isOwner(true)
    {
        location = _location;
        area = _area;
        active = _active;
    }

    function setState(bool _active) public _isOwner(true) {
        active = _active;
    }

}
