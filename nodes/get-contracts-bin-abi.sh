solc --abi ../src/Doctors.sol -o compiled/abi --overwrite
solc --abi ../src/Doctors.sol -o compiled/bin --overwrite

solc --abi ../src/Donation.sol -o compiled/abi --overwrite
solc --bin ../src/Donation.sol -o compiled/bin --overwrite

solc --abi ../src/Donors.sol -o compiled/abi --overwrite
solc --bin ../src/Donors.sol -o compiled/bin --overwrite

solc --abi ../src/Patients.sol -o compiled/abi --overwrite
solc --bin ../src/Patients.sol -o compiled/bin --overwrite

solc --abi ../src/Transplantation.sol -o compiled/abi --overwrite
solc --bin ../src/Transplantation.sol -o compiled/bin --overwrite

