pragma solidity ^0.5.0;

/* New ERC20 contract interface */

contract ERC20 {
    function totalSupply() public returns (uint);

    function balanceOf(address tokenOwner) public returns (uint balance);

    function allowance(address tokenOwner, address spender) public returns (uint remaining);

    function transfer(address to, uint tokens) public returns (bool success);

    function approve(address spender, uint tokens) public returns (bool success);

    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}
