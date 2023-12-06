// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Structs.sol";
import "./Doctors.sol";

contract Patients{
    address public procurementOrganiser;
    Patient[] public patients;
    mapping(address => Patient) patientsMap;
    Doctors doctorsContract;

    constructor(address _doctorsContractAddress) {
        procurementOrganiser = msg.sender;
        doctorsContract = Doctors(_doctorsContractAddress);
    }

    modifier onlyProcurementOrganiser() {
        require(
            msg.sender == procurementOrganiser,
            "Only the procurement organiser can add an organ matching organiser"
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

    function getPatientsArrayLength() public view returns(uint256) {
        return patients.length;
    }

    function getPatientFromMapping(address pa) public view returns(Patient memory) {
        Patient memory _patient = patientsMap[pa];
        return _patient;
    }

    function getPatientToTransplantationFromMapping(address pa, address da) public view returns(Patient memory) {
        Patient memory _patient = patientsMap[pa];
        require(_patient.patientsDoctor == da, "Only patient's doctor get patient for transplantation");
        return _patient;
    }

    function modifyPatient(address _patientAddress,string memory name,uint8 age,Urgency urgency,BloodType bloodType,bool isInTransplantation) public  returns(Patient memory){
        Patient memory _patient = patientsMap[_patientAddress];
        require(_patient.patientsDoctor == msg.sender || _patient.patientAddress == msg.sender || msg.sender == procurementOrganiser, "Only patient's doctor or patient can modify patient for transplantation");
        _patient.age = age;
        _patient.name = name;
        _patient.urgency = urgency;
        _patient.bloodType = bloodType;
        _patient.isInTransplantation = isInTransplantation;
        patientsMap[_patientAddress] = _patient;
        uint256 index =0;
        bool found = false;
        for(uint256 i=0; i<patients.length; i++){
            if(patients[i].patientAddress == _patientAddress){
                index = i;
                found = true;
                break;
            }
        }
        require(found, "Patient not found!");
        patients[index] = _patient;
        return _patient;
    }

    function setPatientIsInTransplantation(address pa, bool state) public{
        patientsMap[pa].isInTransplantation = state;
    }

    function getDoctorsPatients() public view onlyDoctor returns(Patient[] memory) {
        Patient[] memory _patients = new Patient[](99);
        uint counter = 0;
        uint len = getPatientsArrayLength();
        Patient memory _patient;
        for(uint256 i=0; i<len; i++){
            _patient = patients[i];
            if(_patient.patientsDoctor == msg.sender){
                _patients[counter] = _patient;
                counter++;
            }
        }
        return _patients;
    }

    function isPatient(address pa) public view returns(bool){
        bool found = false;
        for(uint256 i=0;i<patients.length;i++){
            if(patients[i].patientAddress == pa){
                found = true;
                break;
            }
        }
        return found;
    }

    function getPatientAddressById(uint256 id) public view returns (address){
        return patients[id].patientAddress;
    }

    function getAllPatients() public view onlyProcurementOrganiser returns (Patient[] memory){
        return patients;
    }

    function registerPatient(
        address _patientAddress,
        string memory _name,
        uint8 _age,
        Urgency _urgency,
        BloodType _bloodType
    ) public onlyDoctor {
        uint256 len = patients.length;
        bool found = false;
        for(uint256 i=0; i<len; i++){
            if(patients[i].patientAddress == _patientAddress){
                found = true;
                break;
            }
        }
        require(!found, "This address is already registered!");
        Patient memory patient = Patient(
            _patientAddress,
            _name,
            _age,
            block.timestamp,
            _urgency,
            _bloodType,
            msg.sender,
            false
        );
        patients.push(
            patient
        );
        patientsMap[_patientAddress] = patient;
        heapifyUp(patients.length -1);
    }

    function removeByAddress(address pa) public {

        Patient memory patient = patientsMap[pa];
        require(msg.sender == patient.patientsDoctor || msg.sender == procurementOrganiser || msg.sender == patient.patientAddress, "Only PO, patient doctor or patient can do this!");
        uint256 len = patients.length;
        uint256 index =0;
        bool found = false;
        for(uint256 i=0; i<len; i++){
            if(patients[i].patientAddress == pa){
                index = i;
                found = true;
                break;
            }
        }
        require(found, "Patient not found!");
        require(index < patients.length, "Index out of bounds");

        patients[index] = patients[patients.length - 1];
        patients.pop();
        delete patientsMap[patient.patientAddress];
        heapifyDown(index);

    }

    function heapifyUp(uint256 startIndex) internal {
        uint256 currentIndex = startIndex;
        Patient memory tmp;

        while (currentIndex > 0) {
            uint256 parentIndex = (currentIndex - 1) / 2;

            if (compare(patients[currentIndex], patients[parentIndex]) > 0) {
                tmp = patients[currentIndex];
                patients[currentIndex] = patients[parentIndex];
                patients[parentIndex] = tmp;
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    function heapifyDown(uint256 startIndex) internal {
        uint256 currentIndex = startIndex;
        Patient memory tmp;
        while (true) {
            uint256 leftChildIndex = 2 * currentIndex + 1;
            uint256 rightChildIndex = 2 * currentIndex + 2;

            uint256 largest = currentIndex;

            if (leftChildIndex < patients.length && compare(patients[leftChildIndex], patients[largest]) > 0) {
                largest = leftChildIndex;
            }

            if (rightChildIndex < patients.length && compare(patients[rightChildIndex], patients[largest]) > 0) {
                largest = rightChildIndex;
            }

            if (largest != currentIndex) {
                tmp = patients[currentIndex];
                patients[currentIndex] = patients[largest];
                patients[largest] = tmp;
                currentIndex = largest;
            } else {
                break;
            }
        }
    }

    function compare(Patient memory patientA, Patient memory patientB) internal pure returns (int8) {
        if (patientA.urgency > patientB.urgency) {
            return 1;
        } else if (patientA.urgency < patientB.urgency) {
            return -1;
        }
        return 0;
    }
}
