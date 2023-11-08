NODE1_RPC_URL="http://127.0.0.1:8545"

NODE2_ADDRESS="$1"

AMOUNT=1000000000000000000

TRANSACTION_DATA="0x"$(echo -n "Hello, Ethereum!" | xxd -p)

RESULT=$(
  node -e "
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider('"${NODE1_RPC_URL}"'));
  "
)

if [[ $RESULT == *"Transaction"* ]]; then
  echo "Transaction sent successfully: $RESULT"
else
  echo "Transaction failed: $RESULT"
fi