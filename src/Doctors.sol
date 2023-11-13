// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Modifiers.sol";

contract Doctors is Modifiers{
    address organProcurementOrganiser;
    address[] doctors;
    mapping(address => Doctor) public doctorsMap;

    constructor() {
        organProcurementOrganiser = msg.sender;
    }

    function registerDoctor(address _doctorAddress, string memory _name, uint8 _age) public onlyProcurementOrganiser(organProcurementOrganiser) {
        Doctor memory doctor = Doctor(
            _doctorAddress,
            _name,
            _age
        );
        doctors.push(
            _doctorAddress
        );
        doctorsMap[_doctorAddress] = doctor;
    }

    function getDoctorsArrayLength() public view returns(uint256) {
        return doctors.length;
    }

    function getDoctorFromMapping(address pa) public view returns(Doctor memory) {
        return doctorsMap[pa];
    }

    function getDoctorAddressById(uint256 id) public view returns(address) {
        return doctors[id];
    }

    function getDoctors() public view returns(address[] memory) {
        return doctors;
    }
}
