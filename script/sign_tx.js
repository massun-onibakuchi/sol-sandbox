const ethers = require('ethers')
const daiAbi = ['function transfer(address to, uint256 value) public returns (bool)']

// Connect to Ethereum network using Ethers.js
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/your-project-id')
const privateKey = 'your-private-key'
const wallet = new ethers.Wallet(privateKey, provider)

// Set up the contract interface for DAI token
const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'
const daiContract = new ethers.Contract(daiAddress, daiAbi, wallet)

// Set up the transaction parameters
const recipientAddress = '0x1234567890123456789012345678901234567890'
const amount = ethers.utils.parseUnits('10', 18) // 10 DAI

const maxPriorityFeePerGas = ethers.utils.parseUnits('2', 'gwei')
const maxFeePerGas = ethers.utils.parseUnits('100', 'gwei')

// Get the current nonce for the sender address
const nonce = await wallet.getTransactionCount()

// Create the transaction object
const tx = {
  to: daiAddress,
  gasLimit: ethers.utils.hexlify(100000),
  data: daiContract.interface.encodeFunctionData('transfer', [recipientAddress, amount]),
  nonce: ethers.utils.hexlify(nonce),
  maxPriorityFeePerGas: ethers.utils.hexlify(maxPriorityFeePerGas),
  maxFeePerGas: ethers.utils.hexlify(maxFeePerGas),
}

// Sign the transaction with the sender's private key
const signedTx = await wallet.signTransaction(tx)

console.log('Signed transaction:', signedTx)
