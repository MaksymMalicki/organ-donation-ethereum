geth init --datadir node2 ../genesis.json
node send-money-to-node 0xad28fe78ff7b125dcfb083ab98b7df10e40bc859
geth --datadir node2 --port 30307 --bootnodes enode://7ee44918891465601e982de42e0fdbfaf90553b9d6e5553bf76df7531a4fbae9997d11fc38e3e3b0a50fccbaf41220278aaa3c71d14e5c32f5e9ee4b85d1c722@127.0.0.1:0?discport=30305  --networkid 12345 --unlock 0xad28fe78ff7b125dcfb083ab98b7df10e40bc859 --password node2/password.txt --authrpc.port 8552 --http --http.port 3335 --http.api eth,net,web3 --allow-insecure-unlock --miner.gasprice 1
