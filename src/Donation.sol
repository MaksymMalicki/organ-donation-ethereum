// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "./Structs.sol";
import "./Patients.sol";
import "./Doctors.sol";
import "./Donors.sol";

contract Donation{
    address public procurementOrganiser;
    mapping (address => address[]) doctorsTransplantationsMapping;
    Patients patientsContract;
    Doctors doctorsContract;
    Donors donorsContract;

    mapping(address=>mapping(address=>Transplantation)) doctorsTransplantations;

    event TransplantationCreated(address indexed doctor, address indexed patient, address indexed donor, string label, uint256 timeCreated);
    event OrganTransported(address indexed doctor, address indexed patient, address indexed donor, string label, uint256 timeTransported);
    event OrganTransplanted(address indexed doctor, address indexed patient, address indexed donor, string label, uint256 timeTransplanted);
    event TransplantationStatsus(address indexed doctor, address indexed patient, address indexed donor, uint256 transplantationStatusConfirmedTime, bool isSuccessful);

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
            if (_checkBloodTypeCompatibility(patient.bloodType, _donor.bloodType) && patient.isInTransplantation == false) {
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

    function _checkBloodTypeCompatibility(BloodType patientBloodType, BloodType donorBloodType) internal pure returns(bool){
        if(donorBloodType == BloodType.O && (patientBloodType == BloodType.A || patientBloodType == BloodType.B || patientBloodType == BloodType.AB || patientBloodType == BloodType.O)) return true;
        else if(donorBloodType == BloodType.A && (patientBloodType == BloodType.A || patientBloodType == BloodType.AB)) return true;
        else if(donorBloodType == BloodType.B && (patientBloodType == BloodType.B || patientBloodType == BloodType.AB)) return true;
        else if(donorBloodType == BloodType.AB && (patientBloodType == BloodType.AB)) return true;
        return false;
    }

    function startTransplantation(address pa, address da, string memory label) public onlyDoctor{
        patientsContract.setPatientIsInTransplantation(pa, true);
        Transplantation memory t = Transplantation(da, pa, procurementOrganiser, msg.sender, label, 0, 0, 0, 0, false);
        doctorsTransplantations[msg.sender][pa] = t;
        emit TransplantationCreated(msg.sender, pa, da, label, block.timestamp);
    }

    modifier onlyTransplantationDoctor(address pa){
        Transplantation memory t = doctorsTransplantations[msg.sender][pa];
        require(t.doctor == msg.sender, "Only the transplantation doctor can perform this");
        _;
    }

    function setOrganTransported(address pa) public onlyTransplantationDoctor(pa) {
        doctorsTransplantations[msg.sender][pa].timeTransported = block.timestamp;
        Transplantation memory t = doctorsTransplantations[msg.sender][pa];
        emit OrganTransported(t.doctor, t.patient, t.donor, t.label, t.timeTransported);
    }

    function setOrganTransplanted(address pa) public onlyTransplantationDoctor(pa) {
        doctorsTransplantations[msg.sender][pa].timeTransplanted = block.timestamp;
        Transplantation memory t = doctorsTransplantations[msg.sender][pa];
        emit OrganTransplanted(t.doctor, t.patient, t.donor, t.label, t.timeTransplanted);
    }

    function setTransplantationStatus(address pa) public onlyTransplantationDoctor(pa) {
        doctorsTransplantations[msg.sender][pa].isSuccessful = true;
        doctorsTransplantations[msg.sender][pa].transplantationStatusConfirmedTime = block.timestamp;
        Transplantation memory t = doctorsTransplantations[msg.sender][pa];
        emit TransplantationStatsus(t.doctor, t.patient, t.donor, t.transplantationStatusConfirmedTime, t.isSuccessful);
    }

    function getDoctorsTransplantations(address pa) public view onlyDoctor returns (Transplantation memory){
        return doctorsTransplantations[msg.sender][pa];
    }

    function getPatientTransplantation() public view returns (Transplantation memory){
        Patient memory p = patientsContract.getPatientFromMapping(msg.sender);
        return doctorsTransplantations[p.patientsDoctor][msg.sender];
    }
}
