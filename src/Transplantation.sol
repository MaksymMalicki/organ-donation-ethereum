// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Transplantation{
    address donor;
    address public patient;
    address public procurementOrganiser;
    address public doctor;
    string public label;
    uint256  timeCreated;
    uint256  timeTransported;
    uint256  timeTransplanted;
    uint256  transplantationStatusConfirmedTime;
    bool isSuccessful;

    event TransplantationCreated(address transplantationAddress, address indexed doctor, address indexed patient, address indexed donor, string label, uint256 timeCreated);
    event OrganTransported(address transplantationAddress, address indexed doctor, address indexed patient, address indexed donor, string label, uint256 timeTransported);
    event OrganTransplanted(address transplantationAddress, address indexed doctor, address indexed patient, address indexed donor, string label, uint256 timeTransplanted);
    event TransplantationStatsus(address transplantationAddress, address indexed doctor, address indexed patient, address indexed donor, uint256 transplantationStatusConfirmedTime, bool isSuccessful);

    constructor(address _doctor, address _donor, address _patient, address _procurementOrganiser, string memory _label) {
        donor = _donor;
        patient = _patient;
        label = _label;
        doctor = _doctor;
        timeCreated = block.timestamp;
        procurementOrganiser = _procurementOrganiser;
        emit TransplantationCreated(address(this), doctor, _patient, _donor, label, block.timestamp);
    }

    modifier onlyProcurementOrganiser() {
        require(
            msg.sender == procurementOrganiser,
            "Only the procurement organiser can add an organ matching organiser"
        );
        _;
    }

    modifier onlyTransplantationDoctor(){
        require(doctor == msg.sender, "Only the transplantation doctor can perform this");
        _;
    }

    function setOrganTransported() public onlyTransplantationDoctor() {
        timeTransported = block.timestamp;
        emit OrganTransported(address(this), doctor, patient, donor, label, timeTransported);
    }

    function setOrganTransplanted() public onlyTransplantationDoctor() {
        timeTransplanted = block.timestamp;
        emit OrganTransplanted(address(this), doctor, patient, donor, label, timeTransplanted);
    }

    function getTransplantationData() public view returns (
        address,
        address,
        address,
        address,
        string memory,
        uint256,
        uint256,
        uint256,
        uint256,
        bool
    ) {
        require(doctor == msg.sender || procurementOrganiser == msg.sender, "Only the transplantation doctor or procurement organiser can perform this");
        return (
            donor,
            patient,
            procurementOrganiser,
            doctor,
            label,
            timeCreated,
            timeTransported,
            timeTransplanted,
            transplantationStatusConfirmedTime,
            isSuccessful
        );
    }

    function setTransplantationStatus() public onlyTransplantationDoctor() {
        isSuccessful = true;
        transplantationStatusConfirmedTime = block.timestamp;
        emit TransplantationStatsus(address(this), doctor, patient, donor, transplantationStatusConfirmedTime, isSuccessful);
    }
}
