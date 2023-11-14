const {Web3} = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const fromAccount = "0x1bcfb2968829603c31b814b6641f793d3d64350a";
const toAccount = process.argv[2];
const privateKey = "0x98d0b0607307b9447bf0f719fb847fe6b252e432de4f19ee1fdeb7d49b3ac7a0"

web3.eth.accounts.wallet.add(privateKey);

web3.eth.sendTransaction({
  from: fromAccount,
  to: toAccount,
  value: 1_000_000_000_000_000_000_000,
  gas: '21000',
})
.then(console.log)
.catch(console.error);