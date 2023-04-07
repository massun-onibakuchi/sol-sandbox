const { ethers } = require('ethers')
// const dotenv = require('dotenv')
// dotenv.config()

// debug_traceTransaction is not available on the Free tier of Alchemy
// But with hardhat netowrk/anvil+cast, it is available for free
// How to use:
// 1. Run hardhat node/anvil in one terminal window
//    1.1. set env var RPC_URL=<alchemy rpc url>, block number and etc
//    1.2. run hardhat node: `npx hardhat node` is equivalent to `npx hardhat node --fork <mainnet rpc url> --fork-block-number <block number>
// 2. Run this script in another terminal window
//    type:
//     `RPC_URL=<hardhat node rpc url>, TX_HASH=<tx hash> node script/debug_trace_txn.js`
//     or `cast rpc debug_traceTransaction TX_HASH`

const RPC_URL =
  process.env.RPC_URL ||
  (function () {
    throw 'env RPC_URL is undefined'
  })()
const TX_HASH =
  process.env.TX_HASH ||
  (function () {
    throw 'env TX_HASH is undefined'
  })()

// debug_traceTransaction is not available on the Free tier of Alchemy
// https://docs.alchemy.com/reference/debug-tracetransaction
const main = async () => {
  const provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)
  const response = await provider.send('debug_traceTransaction', [
    TX_HASH,
    // { "tracer": "callTracer" }, // Not available on Hardhat network including forked mainnet
    {
      // disableMemory: true,
      // disableStack: true,
      disableStorage: true,
    },
  ])
  console.log(response)
  const fs = require('fs')
  fs.writeFileSync(`txn-trace-${TX_HASH}.json`, JSON.stringify(response, null, 2))
}

main()
  .catch(console.error)
  .then(() => process.exit(1))
