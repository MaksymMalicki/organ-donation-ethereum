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
}

struct TransplantationProposal {
    address doctor;
    address patient;
    address donor;
    string label;
    uint256 timeCreated;
    bool isDoctorNotified;
}