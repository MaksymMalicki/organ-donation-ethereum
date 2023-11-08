const {Web3} = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const account = "0x1bcfb2968829603c31b814b6641f793d3d64350a";
const privateKey = "0x98d0b0607307b9447bf0f719fb847fe6b252e432de4f19ee1fdeb7d49b3ac7a0"

web3.eth.accounts.wallet.add(privateKey);

const bytecode = '608060405234801561001057600080fd5b506101f2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80633fb5c1cb146100465780638381f58a14610062578063d09de08a14610080575b600080fd5b610060600480360381019061005b91906100ee565b61008a565b005b61006a610094565b604051610077919061012a565b60405180910390f35b61008861009a565b005b8060008190555050565b60005481565b6000808154809291906100ac90610174565b9190505550565b600080fd5b6000819050919050565b6100cb816100b8565b81146100d657600080fd5b50565b6000813590506100e8816100c2565b92915050565b600060208284031215610104576101036100b3565b5b6000610112848285016100d9565b91505092915050565b610124816100b8565b82525050565b600060208201905061013f600083018461011b565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061017f826100b8565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036101b1576101b0610145565b5b60018201905091905056fea2646970667358221220e475ae9c77a14a20efd8b10321921f78e76bb67319f2bb1dd587a75122c95b5564736f6c634300080e0033';
const contractAbi = [{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNumber","type":"uint256"}],"name":"setNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}];
async function deploy(){
    const contract = new web3.eth.Contract(contractAbi);
    contract.options.data = bytecode;
    const deployTx = contract.deploy();
    const deployedContract = await deployTx
      .send({
        from: account,
        gas: await deployTx.estimateGas(),
      })
      .once("transactionHash", (txhash) => {
        console.log(`Mining deployment transaction ...`);
      });
    
      console.log(`Contract deployed at ${deployedContract.options.address}`);
    console.log(
    `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`,
  );
    
    // contract.set.sendTransaction(42, { from: eth.accounts[0], gas: 1000000 });
    // contract.retrieve().call() >> 2;
}

deploy();