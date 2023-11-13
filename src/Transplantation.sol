// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Modifiers.sol";

contract Transplantation is Modifiers{
    address donor;
    address patient;
    address doctor;
    string label;
    uint256 timeCreated;
    uint256 timeTransported;
    uint256 timeTransplanted;
    uint256 transplantationStatusConfirmedTime;
    bool isSuccessful;

    event TransplantationCreated(address indexed doctor, address indexed patient, address indexed donor, string label, uint256 timeCreated);
    event OrganTransported(address indexed doctor, address indexed patient, address indexed donor, string label, uint256 timeTransported);
    event OrganTransplanted(address indexed doctor, address indexed patient, address indexed donor, string label, uint256 timeTransplanted);
    event TransplantationStatsus(address indexed doctor, address indexed patient, address indexed donor, uint256 transplantationStatusConfirmedTime, bool isSuccessful);

    constructor(address _donor, address _patient, string memory _label) {
        donor = _donor;
        patient = _patient;
        label = _label;
        doctor = msg.sender;
        timeCreated = block.timestamp;
    }

    function setOrganTransported() public onlyTransplantationDoctor(doctor) {
        timeTransported = block.timestamp;
        emit OrganTransported(doctor, patient, donor, label, timeTransported);
    }

    function setOrganTransplanted() public onlyTransplantationDoctor(doctor) {
        timeTransplanted = block.timestamp;
        emit OrganTransplanted(doctor, patient, donor, label, timeTransplanted);
    }

    function setTransplantationStatus() public onlyTransplantationDoctor(doctor) {
        isSuccessful = true;
        transplantationStatusConfirmedTime = block.timestamp;
        emit TransplantationStatsus(doctor, patient, donor, transplantationStatusConfirmedTime, isSuccessful);
    }
}
