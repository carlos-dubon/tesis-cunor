// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ballot {
    string public message;

    constructor(string memory _message) {
        message = _message;
    }
}
