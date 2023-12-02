// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Structs.sol";

contract Doctors{
    address public procurementOrganiser;
    address[] public doctors;
    mapping(address => Doctor) doctorsMap;

    constructor() {
        procurementOrganiser = msg.sender;
    }

    modifier onlyProcurementOrganiser() {
        require(
            msg.sender == procurementOrganiser,
            "Only the procurement organiser can add an organ matching organiser"
        );
        _;
    }

    function registerDoctor(address _doctorAddress, string memory _name, uint8 _age) public onlyProcurementOrganiser {
        uint256 len = doctors.length;
        bool found = false;
        for(uint256 i=0; i<len; i++){
            if(doctorsMap[doctors[i]].doctorAddress == msg.sender){
                found = true;
                break;
            }
        }
        require(!found, "This address is already registered!");
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
        Doctor memory _doctor = doctorsMap[pa];
        require(_doctor.doctorAddress == msg.sender || procurementOrganiser == msg.sender, "Only the doctor or procurement organiser can view doctor data");
        return _doctor;
    }

    function getDoctorAddressById(uint256 id) public view returns(address) {
        return doctors[id];
    }

    function getDoctors() public view returns(address[] memory) {
        return doctors;
    }

    function getAllDoctors() public view onlyProcurementOrganiser returns (Doctor[] memory) {
        uint256 len = getDoctorsArrayLength();
        Doctor[] memory allDoctors = new Doctor[](len);

        for (uint256 i = 0; i < len; i++) {
            address donorAddress = doctors[i];
            allDoctors[i] = doctorsMap[donorAddress];
        }

        return allDoctors;
    }

    function removePatient(address da) public {
        uint256 index = 0;
        bool found = false;
        Doctor memory _doctor = doctorsMap[da];
        require(_doctor.doctorAddress == msg.sender || procurementOrganiser == msg.sender, "Only doctor or procurement organiser can delete doctor!");

        for(uint256 i=0;i<doctors.length;i++){
            if(doctors[i] == da){
                index = i;
                found = true;
                break;
            }
        }
        require(found, "Patient was not found!");
        doctors[index] = doctors[doctors.length - 1];
        doctors.pop();
        delete doctorsMap[da];
    }
}