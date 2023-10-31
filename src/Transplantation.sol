pragma solidity ^0.8.13;

contract Transplantation {
    address donor;
    address patient;
    string label;
    uint256 time;

    constructor(address _donor, address _patient, string memory _label) {
        donor = _donor;
        patient = _patient;
        label = _label;
        time = block.timestamp;
    }
}
