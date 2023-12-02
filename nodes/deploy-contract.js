const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

const contractName = process.argv[2];

// Set up a connection to the Ethereum network
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.Contract.handleRevert = true;

// Read the bytecode from the file system
const bytecodePath = path.join(__dirname, `compiled/bin/${contractName}.bin`);
const bytecode = fs.readFileSync(bytecodePath, 'utf8');

const abi = require(`./compiled/abi/${contractName}.json`);
const myContract = new web3.eth.Contract(abi);

async function deploy() {
	const providersAccounts = await web3.eth.getAccounts();
	const defaultAccount = providersAccounts[0];
	console.log('deployer account:', defaultAccount);

	const deployedContract = myContract.deploy({
		data: '0x' + bytecode,
    arguments: ['0xf6d385073bBb5FF569Bf520d0101f8DaBADA05ee', '0xD1aB0EAf7A852B429f1a299D0e0cDe537a49a999', '0xeB898135FE1cC18840EEDa2A4593729f14459146']
	});

	// optionally, estimate the gas that will be used for development and log it
	const gas = await deployedContract.estimateGas({
		from: defaultAccount,
	});
	console.log('estimated gas:', gas);

	try {
		const tx = await deployedContract.send({
			from: defaultAccount,
			gas,
		});
		console.log('Contract deployed at address: ' + tx.options.address);

		const deployedAddressPath = path.join(__dirname, `compiled/address/${contractName}.bin`);
		fs.writeFileSync(deployedAddressPath, tx.options.address);
	} catch (error) {
		console.error(error);
	}
}

deploy();