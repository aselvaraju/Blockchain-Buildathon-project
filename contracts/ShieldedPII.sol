pragma solidity ^0.5.0;
pragma experimental "ABIEncoderV2";


contract ShieldedPII{
     
    // Model a Patient
     struct Patient {
        uint id;
        string name;
        uint ssn;
        string address_;
        string dob;
        string[] health_hist;
        uint insuranceID;
    }
    
    mapping (uint => Patient) public patients;
    address chairPerson;
    uint public patientIDCount = 656899;
    
    constructor () public{
        chairPerson = msg.sender;
    }
    
    modifier onlyBy(address _account){
        require(msg.sender == _account);
        _;            
    }

    function registerPatient(string memory _name, uint _ssn, string memory _address, string memory _dob, string[] memory _healthHist, uint _insuranceID) public onlyBy(chairPerson){
        patients[patientIDCount] = Patient(patientIDCount, _name, _ssn, _address, _dob, _healthHist, _insuranceID);
        patientIDCount ++;
    }
    
    function unregisterPatient(uint _id) public onlyBy(chairPerson) {
        delete patients[_id];
    }
    
    
    //Update functions -- By admin only
    function updateName(uint _id, string memory _name) public onlyBy(chairPerson){
        patients[_id].name = _name;
    }
    function updateSSN(uint _id, uint _ssn) public onlyBy(chairPerson){
        patients[_id].ssn = _ssn;
    }
    function updateAddress(uint _id, string memory _address) public onlyBy(chairPerson){
        patients[_id].address_ = _address;
    }
    function updateDOB(uint _id, string memory _dob) public onlyBy(chairPerson){
        patients[_id].dob = _dob;
    }
    function updateHealthHist(uint _id, string[] memory _healthHist) public onlyBy(chairPerson){
        patients[_id].health_hist = _healthHist;
    }
    function updateInsuranceID(uint _id, uint _insuranceID) public onlyBy(chairPerson){
        patients[_id].insuranceID = _insuranceID;
    }

    
    //Get functions for Medical Providers/Doctors
    function getPatientName(uint _id) public view returns (string memory) {
       return patients[_id].name;
    }
    function getPatientSSN(uint _id) public view returns (uint)  {
       return patients[_id].ssn;
    }
    function getPatientAddress(uint _id) public view returns (string memory)  {
       return patients[_id].address_;
    }
    function getPatientDOB(uint _id) public view returns (string memory)  {
       return patients[_id].dob;
    }
    function getPatientHealthHist(uint _id) public view returns (string[] memory)  {
       return patients[_id].health_hist;
    }
    function getPatientInsuranceID(uint _id) public view returns (uint)  {
       return patients[_id].insuranceID;
    }
    
    function addPatientHistory (uint _id, string memory _history) public {
        patients[_id].health_hist.push(_history);
    }
    

    
    
    
}