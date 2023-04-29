import * as dotenv from 'dotenv'

import '@nomicfoundation/hardhat-toolbox'
import { HardhatUserConfig } from 'hardhat/types'
// it will be able to use dependencies installed with forge install
import '@nomicfoundation/hardhat-foundry'

dotenv.config()

const FORKING = process.env.FORKING?.toLowerCase() === 'true'
const ETH_RPC_URL = process.env.ETH_RPC_URL ?? ''
const FORK_BLOCK_NUMBER = process.env.FORK_BLOCK_NUMBER ? parseInt(process.env.FORK_BLOCK_NUMBER) : undefined

if (!ETH_RPC_URL?.startsWith('http') && FORKING) throw 'env ETH_RPC_URL is undefined'

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 15000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: ETH_RPC_URL,
        blockNumber: FORK_BLOCK_NUMBER,
        enabled: FORKING,
      },
    },
  },
  // Avoid foundry cache conflict.
  paths: {
    sources: 'src', // Use ./src rather than ./contracts as Hardhat expects
    cache: 'hh-cache',
  },
}

export default config
