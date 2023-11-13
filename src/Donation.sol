// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Modifiers.sol";
import "./Structs.sol";
import "./Patients.sol";
import "./Doctors.sol";
import "./Donors.sol";
import "./Transplantation.sol";

contract Donation is Modifiers{
    address procurementOrganiser;
    Patients patientsContract;
    Doctors doctorsContract;
    Donors donorsContract;
    TransplantationProposal[] proposals;

    event DoctorNotified(address indexed doctor, address indexed patient, address indexed donor, uint256 timeCreated); 

    constructor(address _patientsContractAddress, address _doctorsContractAddress, address _donorsContractAddress) {
        procurementOrganiser = msg.sender;
        patientsContract = Patients(_patientsContractAddress);
        doctorsContract = Doctors(_doctorsContractAddress);
        donorsContract = Donors(_donorsContractAddress);
    }

    function matchDonorToPatient(Donor memory _donor) public view onlyProcurementOrganiser(procurementOrganiser) returns (Patient[] memory) {
        Patient[] memory _matchedPatients = new Patient[](5);
        uint256 _matchedPatientsCounter = 0;
        uint256 len = patientsContract.getPatientsArrayLength();
        Patient memory patient;
        for (uint256 i = 0; i < len; i++) {
            patient = patientsContract.getPatientFromMapping(
                patientsContract.getPatientAddressById(i)
            );
            if (patient.bloodType == _donor.bloodType && _matchedPatientsCounter < 5) {
                _matchedPatients[_matchedPatientsCounter] = patient;
            }
        }
        return _matchedPatients;
    }

    function registerNewPatient(
        address _patientAddress,
        string memory _name,
        uint8 _age,
        Urgency _urgency,
        BloodType _bloodType
    ) public onlyDoctor(doctorsContract.getDoctors()) {
        patientsContract.registerPatient(
            _patientAddress,
            _name,
            _age,
            _urgency,
            _bloodType,
            doctorsContract.getDoctors()
        );
    }

    function notifyDoctor(Patient memory _patient, address _donorsAddress) public onlyProcurementOrganiser(procurementOrganiser) {
        emit DoctorNotified(_patient.patientsDoctor, _patient.patientAddress, _donorsAddress, block.timestamp);
    }

    function startTransplantation(Patient memory _patient, address _donor, string memory label) public onlyPatientDoctor(_patient) {
        Transplantation transplantation = new Transplantation(_donor, _patient.patientAddress, label);
    }
}
