export const doctorsAbi =
  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "doctors",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllDoctors",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "doctorAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "speciality",
              "type": "string"
            }
          ],
          "internalType": "struct Doctor[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getDoctorAddressById",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        }
      ],
      "name": "getDoctorFromMapping",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "doctorAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "speciality",
              "type": "string"
            }
          ],
          "internalType": "struct Doctor",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDoctors",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDoctorsArrayLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        }
      ],
      "name": "isDoctor",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "procurementOrganiser",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_doctorAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_age",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "speciality",
          "type": "string"
        }
      ],
      "name": "registerDoctor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        }
      ],
      "name": "removeDoctor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
export const donorsAbi =
  [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_age",
          "type": "uint8"
        },
        {
          "internalType": "enum BloodType",
          "name": "_bloodType",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "isAlive",
          "type": "bool"
        }
      ],
      "name": "addDonor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        }
      ],
      "name": "markDonorAsDead",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        }
      ],
      "name": "markDonorKidneyGoodForTransplant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "age",
          "type": "uint8"
        },
        {
          "internalType": "enum BloodType",
          "name": "bloodType",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "isAlive",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isKidneyGoodToTransplant",
          "type": "bool"
        }
      ],
      "name": "modifyDonor",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "donorAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "enum BloodType",
              "name": "bloodType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "dateAdded",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isAlive",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isKidneyGoodToTransplant",
              "type": "bool"
            }
          ],
          "internalType": "struct Donor",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        }
      ],
      "name": "removeDonor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "donors",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllDonors",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "donorAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "enum BloodType",
              "name": "bloodType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "dateAdded",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isAlive",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isKidneyGoodToTransplant",
              "type": "bool"
            }
          ],
          "internalType": "struct Donor[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getDonorAddressById",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        }
      ],
      "name": "getDonorFromMapping",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "donorAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "enum BloodType",
              "name": "bloodType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "dateAdded",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isAlive",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isKidneyGoodToTransplant",
              "type": "bool"
            }
          ],
          "internalType": "struct Donor",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDonorsAddressesArray",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDonorsArrayLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        }
      ],
      "name": "isDonor",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "procurementOrganiser",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
export const patientsAbi =
  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_doctorsContractAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getAllPatients",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "patientAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "dateAdded",
              "type": "uint256"
            },
            {
              "internalType": "enum Urgency",
              "name": "urgency",
              "type": "uint8"
            },
            {
              "internalType": "enum BloodType",
              "name": "bloodType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "patientsDoctor",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isInTransplantation",
              "type": "bool"
            }
          ],
          "internalType": "struct Patient[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDoctorsPatients",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "patientAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "dateAdded",
              "type": "uint256"
            },
            {
              "internalType": "enum Urgency",
              "name": "urgency",
              "type": "uint8"
            },
            {
              "internalType": "enum BloodType",
              "name": "bloodType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "patientsDoctor",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isInTransplantation",
              "type": "bool"
            }
          ],
          "internalType": "struct Patient[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getPatientAddressById",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pa",
          "type": "address"
        }
      ],
      "name": "getPatientFromMapping",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "patientAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "dateAdded",
              "type": "uint256"
            },
            {
              "internalType": "enum Urgency",
              "name": "urgency",
              "type": "uint8"
            },
            {
              "internalType": "enum BloodType",
              "name": "bloodType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "patientsDoctor",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isInTransplantation",
              "type": "bool"
            }
          ],
          "internalType": "struct Patient",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pa",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        }
      ],
      "name": "getPatientToTransplantationFromMapping",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "patientAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "dateAdded",
              "type": "uint256"
            },
            {
              "internalType": "enum Urgency",
              "name": "urgency",
              "type": "uint8"
            },
            {
              "internalType": "enum BloodType",
              "name": "bloodType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "patientsDoctor",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isInTransplantation",
              "type": "bool"
            }
          ],
          "internalType": "struct Patient",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPatientsArrayLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pa",
          "type": "address"
        }
      ],
      "name": "isPatient",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_patientAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "age",
          "type": "uint8"
        },
        {
          "internalType": "enum Urgency",
          "name": "urgency",
          "type": "uint8"
        },
        {
          "internalType": "enum BloodType",
          "name": "bloodType",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "isInTransplantation",
          "type": "bool"
        }
      ],
      "name": "modifyPatient",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "patientAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "dateAdded",
              "type": "uint256"
            },
            {
              "internalType": "enum Urgency",
              "name": "urgency",
              "type": "uint8"
            },
            {
              "internalType": "enum BloodType",
              "name": "bloodType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "patientsDoctor",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isInTransplantation",
              "type": "bool"
            }
          ],
          "internalType": "struct Patient",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "patients",
      "outputs": [
        {
          "internalType": "address",
          "name": "patientAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "age",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "dateAdded",
          "type": "uint256"
        },
        {
          "internalType": "enum Urgency",
          "name": "urgency",
          "type": "uint8"
        },
        {
          "internalType": "enum BloodType",
          "name": "bloodType",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "patientsDoctor",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isInTransplantation",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "procurementOrganiser",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_patientAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_age",
          "type": "uint8"
        },
        {
          "internalType": "enum Urgency",
          "name": "_urgency",
          "type": "uint8"
        },
        {
          "internalType": "enum BloodType",
          "name": "_bloodType",
          "type": "uint8"
        }
      ],
      "name": "registerPatient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pa",
          "type": "address"
        }
      ],
      "name": "removeByAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pa",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "state",
          "type": "bool"
        }
      ],
      "name": "setPatientIsInTransplantation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
export const donationAbi =
  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_patientsContractAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_doctorsContractAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_donorsContractAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "doctor",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "patient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "label",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timeTransplanted",
          "type": "uint256"
        }
      ],
      "name": "OrganTransplanted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "doctor",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "patient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "label",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timeTransported",
          "type": "uint256"
        }
      ],
      "name": "OrganTransported",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pa",
          "type": "address"
        }
      ],
      "name": "setOrganTransplanted",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pa",
          "type": "address"
        }
      ],
      "name": "setOrganTransported",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pa",
          "type": "address"
        }
      ],
      "name": "setTransplantationStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pa",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "label",
          "type": "string"
        }
      ],
      "name": "startTransplantation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "doctor",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "patient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "label",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timeCreated",
          "type": "uint256"
        }
      ],
      "name": "TransplantationCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "doctor",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "patient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "transplantationStatusConfirmedTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isSuccessful",
          "type": "bool"
        }
      ],
      "name": "TransplantationStatsus",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "pa",
          "type": "address"
        }
      ],
      "name": "getDoctorsTransplantations",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "donor",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "patient",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "procurementOrganiser",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "doctor",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "label",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timeCreated",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timeTransported",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timeTransplanted",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "transplantationStatusConfirmedTime",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isSuccessful",
              "type": "bool"
            }
          ],
          "internalType": "struct Transplantation",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "da",
          "type": "address"
        }
      ],
      "name": "matchDonorToPatient",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "patientAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "age",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "dateAdded",
              "type": "uint256"
            },
            {
              "internalType": "enum Urgency",
              "name": "urgency",
              "type": "uint8"
            },
            {
              "internalType": "enum BloodType",
              "name": "bloodType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "patientsDoctor",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isInTransplantation",
              "type": "bool"
            }
          ],
          "internalType": "struct Patient[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "procurementOrganiser",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
