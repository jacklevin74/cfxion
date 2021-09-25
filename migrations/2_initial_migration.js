const Dai = artifacts.require("Dai");
const MyDefiProject = artifacts.require("MyDefiProject");

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(Dai);
  const dai = await Dai.deployed();
  await deployer.deploy(MyDefiProject, dai.address); // dai.address is address of our new Dai token contract
  const myDefiProject = await MyDefiProject.deployed(); 
  await dai.faucet (myDefiProject.address, 500);
  await dai.faucet (accounts[4], 500);
  await dai.faucet (accounts[5], 500);
  ///await dai.increaseAllowance(myDefiProject.address, 100);
  await myDefiProject.meh(accounts[1], 100);  
  await myDefiProject.meh(accounts[2], 110);  
  await myDefiProject.meh(accounts[3], 120);  
  const balance0 = await dai.balanceOf(myDefiProject.address);
  console.log("Defi Project balance :"+balance0 + " of address " +myDefiProject.address);
  let balance1 = await myDefiProject.balance;
  console.log ("Defi proj balance: " + balance1);
//  const balance1 = await dai.balanceOf(accounts[1]);
//  const balance2 = await dai.balanceOf(accounts[2]);
//  const balance3 = await dai.balanceOf(accounts[3]);


  const people = await myDefiProject.getRecipientAddresses();
	console.log ("We see " + people.length + " people\n");
	for(var i = 0; i < people.length ; i++){
          const balanceOfPerson = await dai.balanceOf(people[i]);
          console.log(people[i]+":"+balanceOfPerson);
          winner = await myDefiProject.random(people.length);
          console.log ("winner number " + winner);
        }



  //const amount = myDefiProject.pickWinner(people);
	//console.log (amount);

  const balanceOfPerson = await dai.balanceOf(accounts[4]);
  console.log(accounts[4]+":"+balanceOfPerson);
  let alice = accounts[4];
  let bob = accounts[5];

  var price = 1000000000000000000;

  await myDefiProject.deposit({value:90000000000000});
  await myDefiProject.deposit({value:90000000000000, from:accounts[1]});
  const myBalance = await myDefiProject.returnBalance(accounts[0]);
  // test balance
  console.log("Sender of balance was: " + accounts[0]+ " : " + myBalance);

  const myBalance1 = await myDefiProject.returnBalance(accounts[0]);
  // test balance
  console.log("Sender of balance was: " + accounts[1]+ " : " + myBalance1);

  // after deposit, show mapping

  const allUsers = await myDefiProject.getAllUsers();
	console.log ("We see " + allUsers.length + " addresses that deposited funds\n");
  
	for(var i = 0; i < allUsers.length ; i++){
          const addressOfUser = allUsers[i];
          console.log(allUsers[i]+":"+await myDefiProject.returnBalance(allUsers[i]));
        }


  // moving funds into 3rd account
  await myDefiProject.sendFunds(accounts[2], 1);


  const contractBalance = await myDefiProject.getBalance();
  console.log ("Total deposit into contract: " +  contractBalance);



};
