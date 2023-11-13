// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Structs.sol";

contract Modifiers {
    modifier onlyProcurementOrganiser(address procurementOrganiser) {
        require(
            msg.sender == procurementOrganiser,
            "Only the procurement organiser can add an organ matching organiser"
        );
        _;
    }

    modifier onlyDoctor(address[] memory doctors) {
        bool isDoctor = false;
        for (uint256 i = 0; i < doctors.length; i++) {
            if (doctors[i] == msg.sender) {
                isDoctor = true;
                break;
            }
        }
        require(isDoctor, "Only a doctor can add a patient or donor");
        _;
    }

    modifier onlyTransplantationDoctor(address doctor){
        require(doctor == msg.sender, "Only the transplantation doctor can add a donor");
        _;
    }

    modifier onlyPatientDoctor(Patient memory _patient) {
        require(
            _patient.patientsDoctor == msg.sender,
            "Only the patients doctor can add a donor"
        );
        _;
    }
}