// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "./Structs.sol";
import "./Patients.sol";
import "./Doctors.sol";
import "./Donors.sol";
import "./Transplantation.sol";

contract Donation{
    address public procurementOrganiser;
    mapping (address => Transplantation) transplantationsMapping;
    Patients patientsContract;
    Doctors doctorsContract;
    Donors donorsContract;

    event DoctorNotified(address indexed doctor, address indexed patient, address indexed donor, uint256 timeCreated); 

    constructor(address _patientsContractAddress, address _doctorsContractAddress, address _donorsContractAddress) {
        procurementOrganiser = msg.sender;
        patientsContract = Patients(_patientsContractAddress);
        doctorsContract = Doctors(_doctorsContractAddress);
        donorsContract = Donors(_donorsContractAddress);
    }

    modifier onlyProcurementOrganiser() {
        require(
            msg.sender == procurementOrganiser,
            "Only the procurement organiser can do this"
        );
        _;
    }

    modifier onlyDoctor() {
        uint256 len = doctorsContract.getDoctorsArrayLength();
        address[] memory doctors = doctorsContract.getDoctors();
        bool isDoctor = false;
        for(uint256 i=0; i<len; i++){
            if(msg.sender == doctors[i]){
                isDoctor = true;
                break;
            }
        }
        require(isDoctor, "Only doctor can do this!");
        _;
    }

    function matchDonorToPatient(address da) public view onlyProcurementOrganiser returns (Patient[] memory) {
        Donor memory _donor = donorsContract.getDonorFromMapping(da);
        Patient[] memory _matchedPatients = new Patient[](5);
        uint256 _matchedPatientsCounter = 0;
        uint256 len = patientsContract.getPatientsArrayLength();
        Patient memory patient;
        for (uint256 i = 0; i < len; i++) {
            patient = patientsContract.getPatientFromMapping(
                patientsContract.getPatientAddressById(i)
            );
            if (patient.bloodType == _donor.bloodType && patient.isInTransplantation == false) {
                if(_matchedPatientsCounter <= 5){
                    _matchedPatients[_matchedPatientsCounter] = patient;
                    _matchedPatientsCounter++;
                } else {
                    for(uint256 j=0; j<5; j++){
                        if(_matchedPatients[j].urgency < patient.urgency || (_matchedPatients[j].urgency == patient.urgency && _matchedPatients[j].dateAdded > patient.dateAdded)){
                            _matchedPatients[j] = patient;
                            break;
                        }
                    }
                }
            }
        }
        return _matchedPatients;
    }

    function notifyDoctor(address pa, address _donorsAddress) public onlyProcurementOrganiser {
        Patient memory _patient = patientsContract.getPatientFromMapping(pa);
        emit DoctorNotified(_patient.patientsDoctor, _patient.patientAddress, _donorsAddress, block.timestamp);
    }

    function startTransplantation(address pa, address da, string memory label) public onlyDoctor{
        patientsContract.setPatientIsInTransplantation(pa, true);
        new Transplantation(msg.sender, da, pa, procurementOrganiser, label);
    }

    function getTransplantationByAddress(address ta) public view returns (Transplantation){
        Transplantation _transplantation = transplantationsMapping[ta];
        require(_transplantation.patient() == msg.sender || _transplantation.doctor() == msg.sender || procurementOrganiser == msg.sender, "Only the transplantation doctor, procurement organiser and patient or patient can view transplantation data");
        return _transplantation;
    }
}
