// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Enums.sol";

struct Patient {
    address patientAddress;
    string name;
    uint8 age;
    uint256 dateAdded;
    Urgency urgency;
    BloodType bloodType;
    address patientsDoctor;
    bool isInTransplantation;
}

struct Donor {
    address donorAddress;
    string name;
    uint8 age;
    BloodType bloodType;
    uint256 dateAdded;
    bool isAlive;
    bool isKidneyGoodToTransplant;
}

struct Doctor {
    address doctorAddress;
    string name;
    uint8 age;
    string speciality;
}

struct Transplantation{
    address donor;
    address patient;
    address procurementOrganiser;
    address doctor;
    string label;
    uint256  timeCreated;
    uint256  timeTransported;
    uint256  timeTransplanted;
    uint256  transplantationStatusConfirmedTime;
    bool isSuccessful;
}