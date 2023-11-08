geth init --datadir node1 genesis.json
node scripts/send-money-to-node 0x263aed6c69cc271c3a6e4abb949be37c5e394ace
geth --datadir node1 --port 30306 --bootnodes enode://7ee44918891465601e982de42e0fdbfaf90553b9d6e5553bf76df7531a4fbae9997d11fc38e3e3b0a50fccbaf41220278aaa3c71d14e5c32f5e9ee4b85d1c722@127.0.0.1:0?discport=30305  --networkid 12345 --unlock 0x263aed6c69cc271c3a6e4abb949be37c5e394ace --password node1/password.txt --authrpc.port 8551 --http --http.port 3334 --http.api eth,net,web3 --allow-insecure-unlock --miner.gasprice 1
