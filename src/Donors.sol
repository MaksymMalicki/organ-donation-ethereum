// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Structs.sol";

contract Donors{
    address[] public donors;
    address public procurementOrganiser;
    mapping(address => Donor) donorsMap;

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

    function getDonorsArrayLength() public view returns(uint256) {
        return donors.length;
    }

    function getDonorFromMapping(address da) public view returns(Donor memory) {
        Donor memory _donor = donorsMap[da];
        return _donor;
    }

    function getDonorAddressById(uint256 id) public view returns(address) {
        return donors[id];
    }

    function modifyDonor(address da, string memory name,uint8 age,BloodType bloodType,bool isAlive,bool isKidneyGoodToTransplant) public returns(Donor memory){
        Donor memory donor = donorsMap[da];
        require(msg.sender == procurementOrganiser || msg.sender == donor.donorAddress, "Only PO and donor can modify donors data");
        donor.name = name;
        donor.age = age;
        donor.bloodType=bloodType;
        donor.isAlive=isAlive;
        donor.isKidneyGoodToTransplant=isKidneyGoodToTransplant;
        donorsMap[da] = donor;
        return donor;
    }

    function getDonorsAddressesArray() public view returns (address[] memory){
        return donors;
    }

    function getAllDonors() public view onlyProcurementOrganiser returns (Donor[] memory) {
        uint256 len = getDonorsArrayLength();
        Donor[] memory allDonors = new Donor[](len);

        for (uint256 i = 0; i < len; i++) {
            address donorAddress = donors[i];
            allDonors[i] = donorsMap[donorAddress];
        }

        return allDonors;
    }

    function addDonor(
        string memory _name,
        uint8 _age,
        BloodType _bloodType,
        bool isAlive
    ) public {
        uint256 len = donors.length;
        bool found = false;
        for(uint256 i=0; i<len; i++){
            if(donorsMap[donors[i]].donorAddress == msg.sender){
                found = true;
                break;
            }
        }
        require(!found, "This address is already registered!");
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

    function markDonorAsDead(address da) public onlyProcurementOrganiser {
        Donor memory _donor = getDonorFromMapping(da);
        require(
            _donor.isAlive == true,
            "The donor must be alive to be marked as dead"
        );
        _donor.isAlive = false;
        donorsMap[da] = _donor;
    }

    function markDonorKidneyGoodForTransplant(address da) public {
        Donor memory _donor = getDonorFromMapping(da);
        require(
            _donor.isAlive == false,
            "The donor must be dead to have his organs marked"
        );
        _donor.isKidneyGoodToTransplant = true;
        donorsMap[da] = _donor;
    }

    function removeDonor(address da) public {
        uint256 index = 0;
        bool found = false;
        Donor memory _donor = donorsMap[da];
        require(_donor.donorAddress == msg.sender || procurementOrganiser == msg.sender, "Only donor or procurement organiser can delete donor!");

        for(uint256 i=0;i<donors.length;i++){
            if(donors[i] == da){
                index = i;
                found = true;
                break;
            }
        }
        require(found, "Patient was not found!");
        donors[index] = donors[donors.length - 1];
        donors.pop();
        delete donorsMap[da];
    }

    function isDonor(address da) public view returns(bool) {
        bool found = false;
        for(uint256 i=0;i<donors.length;i++){
            if(donors[i] == da){
                found = true;
                break;
            }
        }
        return found;
    }
}
