const { get } = require('http');
const {Web3} = require('web3');

const bankPort = '8845';
const bankAccount = "0x1bcfb2968829603c31b814b6641f793d3d64350a";
const bankPrivateKey = "0x98d0b0607307b9447bf0f719fb847fe6b252e432de4f19ee1fdeb7d49b3ac7a0";

const node1Port = '3334';
const node1Account = "0x263aed6c69cc271c3a6e4abb949be37c5e394ace";
const node1PrivateKey = "0xa5ea69d3d3fbc06ed3dd25e03a558825e45fde6586f1d650a86aa14e35719dfa";
let node = 1;
if(node = 1){
    privateKey = node1PrivateKey;
    account = node1Account;
    port = node1Port;
}
else if(node = 2){
    privateKey = bankPrivateKey;
    account = bankAccount;
    port = bankPort;
}
var privateKey;
var account;
var port;

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:"+port));

web3.eth.accounts.wallet.add(privateKey);

const contractAbi = [{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNumber","type":"uint256"}],"name":"setNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = "0xF115f9d9d664CD1580553dBda96C4eD7EC680499";
const contract = new web3.eth.Contract(contractAbi, contractAddress);

async function method(){
    console.log(await contract.methods["increment"]().send({from: account, gas: 1000000}));
    console.log(await contract.methods["number"]().call());
}

async function getNumber(){
    console.log(await contract.methods["number"]().call());
}
getNumber();
// method();