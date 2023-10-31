pragma solidity ^0.8.13;

enum Urgency {
    Low,
    Medium,
    High
}

enum BloodType {
    A,
    B,
    AB,
    O
}

struct Doctor {
    address doctorAddress;
    string name;
    uint8 age;
}

struct Patient {
    address patientAddress;
    string name;
    uint8 age;
    Urgency urgency;
    uint256 dateAdded;
    BloodType bloodType;
    Doctor patientsDoctor;
}

struct Donor {
    address donorAddress;
    string name;
    uint8 age;
    BloodType bloodType;
    uint256 dateAdded;
    Doctor donorsDoctor;
}

contract Donation {
    address procurementOrganiser;
    address organMatchingOrganiser;
    Patient[] patients;
    Donor[] donors;
    Doctor[] doctors;

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

    modifier onlyOrganMatchingOrganiser() {
        require(
            msg.sender == organMatchingOrganiser,
            "Only the organ matching organiser can add an organ matching organiser"
        );
        _;
    }

    modifier onlyDoctor() {
        bool isDoctor = false;
        for (uint256 i = 0; i < doctors.length; i++) {
            if (doctors[i].doctorAddress == msg.sender) {
                isDoctor = true;
            }
        }
        require(isDoctor, "Only a doctor can add a patient or donor");
        _;
    }

    modifier onlyPatientDoctor(Patient _patient) {
        require(
            _patient.patientsDoctor.doctorAddress == msg.sender,
            "Only the patients doctor can add a donor"
        );
        _;
    }

    modifier onlyDonorDoctor(Donor _donor) {
        require(
            _donor.donorsDoctor.doctorAddress == msg.sender,
            "Only the donors doctor can add a donor"
        );
        _;
    }

    addMatchingOrganiser(address _organMatchingOrganiser) public onlyProcurementOrganiser{
        require(
            msg.sender == procurementOrganiser,
            "Only the procurement organiser can add an organ matching organiser"
        );
        organMatchingOrganiser = _organMatchingOrganiser;
    }

    addDoctor(string memory _name, uint8 _age) public onlyOrganMatchingOrganiser {
        doctors.push(Doctor(msg.sender, _name, _age));
    }

    addPatient(
        string memory _name,
        uint8 _age,
        Urgency _urgency,
        BloodType _bloodType
    ) public onlyDoctor {
        patients.push(
            Patient(
                msg.sender,
                _name,
                _age,
                _urgency,
                block.timestamp,
                _bloodType,
                Doctor(msg.sender, "", 0)
            )
        );
    }

    addDonor(
        string memory _name,
        uint8 _age,
        BloodType _bloodType
    ) public onlyDoctor {
        donors.push(
            Donor(
                msg.sender,
                _name,
                _age,
                _bloodType,
                block.timestamp,
                Doctor(msg.sender, "", 0)
            )
        );
    }

    matchDonorToPatient(Patient _patient, Donor _donor) public onlyPatientDoctor(_patient) onlyDonorDoctor(_donor) {
        require(
            _patient.bloodType == _donor.bloodType,
            "The patient and donor must have the same blood type"
        );
        require(
            _patient.urgency == Urgency.High,
            "The patient must have a high urgency"
        );
        require(
            _donor.dateAdded > _patient.dateAdded,
            "The donor must have been added after the patient"
        );
        _patient.patientsDoctor = Doctor(address(0), "", 0);
        _donor.donorsDoctor = Doctor(address(0), "", 0);
    }


}
