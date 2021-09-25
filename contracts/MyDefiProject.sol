pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyDefiProject  { 
    IERC20 dai;
    event Payout(uint256 payout);
    event LogDeposit(address sender, uint amount);
    address[] public people;
    address[] public users;
    uint addressRegistryCount; 
    mapping(address => uint) public balances;
    constructor (address daiAddress) public  {
	dai = IERC20 (daiAddress);  
	
    }

   /**
     * This is NOT needed, but for learning purposes, a convenience ... 
     * Anyone can check the balance at any address at any time, without this assistance.
     */
function getBalance() public view returns(uint balance) {
        return address(this).balance;
    }

function updateBalance(uint newBalance) public {
    balances[msg.sender] = newBalance;
    users.push(msg.sender);
    //addressRegistryCount++;   
     //balances[0xf16c73133577A5a06e64aC7fFa95d769e72315Ae] = newBalance;
   }
 
function returnBalance (address myAddress) public view returns (uint) {
      return balances[myAddress];
   }

function deposit() external payable returns(string memory) {
        //require(msg.value == 1);
        updateBalance(msg.value);
        emit LogDeposit(msg.sender, msg.value);
        return "deposit done";
    }


function sendFunds(address payable addr, uint amount) public {
    require (address(this).balance >= amount);
    addr.transfer(amount);
}


function random(uint length) public view returns (uint) {
    uint nonce = 0;
    nonce++;
    uint randomnumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % length;
    randomnumber = randomnumber + 1;
    return randomnumber;
}

function meh(address recipient, uint amount) external {
 	dai.transfer(recipient, amount);
	people.push(recipient);
}

// pick winner by the largest amount of tokens

function pickWinner(address[] memory _members) public payable returns(uint) {
 
  // if(_members[2].getBalance == 120
     emit Payout(_members[2].balance);
     return _members[2].balance;
}
// return array of addresses in mapping
function getAllUsers() public view returns (address[] memory){
    // return an array of users that deposited ether
    return users;
}

function getRecipientAddresses() public view returns(address[] memory) {
	return people;
}


}
