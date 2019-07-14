const StarNotary = artifacts.require("StarNotary");


var accounts;
var owner;


contract('StarNotary',(accs)=>{
    accounts = accs;
    owner= accounts[0];
});

it('has correct name', async()=>{
    let instance =await StarNotary.deployed();
    let starName = await instance.starName.call();
    assert.equal(starName, "Awesome Udacity Star");
});

it('can be claimed', async()=>{
   let instance = await StarNotary.deployed();
   await instance.claimStar({from:owner});
   let starOwner = await instance.starOwner.call();
   assert.equal(starOwner,owner);

});


it('owner can be changed', async()=>{

 let secondOwner = accounts[1]; 
let instance = await StarNotary.deployed();
await instance.claimStar({from:owner});
let starOwner = await instance.starOwner.call();
assert.equal(starOwner,owner);

await instance.claimStar({from:secondOwner});
let secondUser = await instance.starOwner.call();
assert.equal(secondUser,secondOwner);

});

it('changing the name', async()=>{
 
    let nameChangedTo ="Aditya";
    let instance = await StarNotary.deployed();
    await instance.changeName("Aditya");
    let starName = await instance.starName.call();
    assert.equal(starName,nameChangedTo);


});