// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Modifiers.sol";

contract Patients is Modifiers{
    address[] public patients;

    mapping(address => Patient) public patientsMap;

    function getPatientsArrayLength() public view returns(uint256) {
        return patients.length;
    }

    function getPatientFromMapping(address pa) public view returns(Patient memory) {
        return patientsMap[pa];
    }

    function getPatientAddressById(uint256 id) public view returns(address) {
        return patients[id];
    }

    function registerPatient(
        address _patientAddress,
        string memory _name,
        uint8 _age,
        Urgency _urgency,
        BloodType _bloodType,
        address[] memory _doctors
    ) public onlyDoctor(_doctors) {
        Patient memory patient = Patient(
            _patientAddress,
            _name,
            _age,
            block.timestamp,
            _urgency,
            _bloodType,
            msg.sender
        );
        patients.push(
            _patientAddress
        );
        patientsMap[_patientAddress] = patient;
    }
}
