pragma solidity ^0.8.0;

contract OrganDonationRegistry {
    struct Donor {
        string name;
        uint age;
        string bloodType;
        string organ;
        address donorAddress;
        bool isRegistered;
    }
    
    mapping(address => Donor) public donors;
    address[] public donorList;
    
    event DonorRegistered(address indexed donorAddress, string name, string bloodType, string organ);
    
    function registerDonor(string memory _name, uint _age, string memory _bloodType, string memory _organ) public {
        require(!donors[msg.sender].isRegistered, 'Already registered');
        
        donors[msg.sender] = Donor(_name, _age, _bloodType, _organ, msg.sender, true);
        donorList.push(msg.sender);
        
        emit DonorRegistered(msg.sender, _name, _bloodType, _organ);
    }
    
    function getDonor(address _donor) public view returns (string memory, uint, string memory, string memory, address) {
        require(donors[_donor].isRegistered, 'Donor not found');
        
        Donor memory d = donors[_donor];
        return (d.name, d.age, d.bloodType, d.organ, d.donorAddress);
    }
    
    function getAllDonors() public view returns (address[] memory) {
        return donorList;
    }
    
    function updateDonor(string memory _organ) public {
        require(donors[msg.sender].isRegistered, 'Donor not found');
        
        donors[msg.sender].organ = _organ;
    }
}