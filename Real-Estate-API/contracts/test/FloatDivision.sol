pragma solidity ^0.5.0;

contract FloatDivision {

    /* A trick to floor the quotient, dividend must be
     casted to uint256 type before divided by divisor <15> */
    function testFloating() public pure returns (
        uint256 _shouldReturn_2_$_Value_,
        uint256 _shouldReturn_3_$_Value_,
        uint256 _shouldReturn_3_$_Values_
    ) {
        return (
        uint256(14 + 5 * 6) / 15,
        uint256(15 + 5 * 6) / 15,
        uint256(16 + 5 * 6) / 15
        );
    }
    /*
    function testFloatingError() public pure returns (
        uint256 _shouldReturn_2_$_Value_,
        uint256 _shouldReturn_3_$_Value_,
        uint256 _shouldReturn_3_$_Values_
    ) {
        return (
        (14 + 5 * 6) / 15,
        (15 + 5 * 6) / 15,
        (16 + 5 * 6) / 15
        );
    }
    */
}
