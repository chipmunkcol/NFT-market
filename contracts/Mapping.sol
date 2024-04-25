// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Mapping {
    mapping (address => mapping (uint => bool)) public nested;

    function get(address _add, uint _i) public view returns (bool) {
        return nested[_add][_i];
    }
    function set(address _add, uint _i, bool _bool) public {
        nested[_add][_i] = _bool;
    }
    function remove(address _add, uint _i) public {
        delete nested[_add][_i];
    }
}