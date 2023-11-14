// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Modifiers.sol";
import "./Structs.sol";
contract Donors is Modifiers{
    address[] donors;
    address procurementOrganiser;
    mapping(address => Donor) public donorsMap;

    constructor() {
        procurementOrganiser = msg.sender;
    }

    function addDonor(
        string memory _name,
        uint8 _age,
        BloodType _bloodType,
        bool isAlive
    ) public {
        Donor memory donor = Donor(
            msg.sender,
            _name,
            _age,
            _bloodType,
            block.timestamp,
            isAlive,
            false);
        donors.push(
            msg.sender
        );
        donorsMap[msg.sender] = donor;
    }

    function markDonorAsDead(Donor memory _donor) public view onlyProcurementOrganiser(procurementOrganiser) {
        require(
            _donor.isAlive == true,
            "The donor must be alive to be marked as dead"
        );
        _donor.isAlive = false;
    }

    function markDonorKidneyGoodForTransplant(Donor memory _donor) public view onlyProcurementOrganiser(procurementOrganiser) {
        require(
            _donor.isAlive == true,
            "The donor must be alive to be marked as dead"
        );
        _donor.isKidneyGoodToTransplant = true;
    }

    function isDonor(Donor memory _donor) public view returns(Donor memory) {
        return donorsMap[_donor.donorAddress];
    }
}
