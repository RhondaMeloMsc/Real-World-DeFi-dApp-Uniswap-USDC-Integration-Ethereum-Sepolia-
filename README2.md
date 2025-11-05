🌍 Real-World DeFi dApp: Uniswap + USDC Integration (Ethereum Sepolia)

A full-stack decentralized finance (DeFi) application demonstrating how to connect custom smart contracts with real blockchain protocols such as Uniswap and USDC on the Ethereum Sepolia testnet.

Built to simulate how modern dApps interact with real-world blockchain systems — using Solidity for smart contracts and Next.js for the frontend interface.

🧠 Overview

This project showcases the complete lifecycle of a decentralized app that:

Connects to MetaMask for wallet authentication.

Displays live USDC balances on Ethereum Sepolia.

Allows users to approve and deposit USDC into a smart contract vault.

Integrates with Uniswap V2/V3 for swap simulation and liquidity interactions.

It demonstrates how full-stack blockchain apps communicate across smart contracts, wallets, and DeFi protocols in a real-world testnet environment.

🧰 Tech Stack
Layer	Technology	Purpose
Smart Contracts	Solidity (0.8.x)	ERC-20 vault and token interaction
Framework	Hardhat + TypeScript	Compilation, deployment, and testing
Frontend	Next.js 14 + React + ethers.js v6	Wallet connection and UI
DeFi Integration	Uniswap V2 / USDC (Sepolia)	Realistic DeFi protocol simulation
Network	Ethereum Sepolia Testnet	Safe testing environment
📁 Project Structure
realworld-defi-dapp/
│
├── contracts/       → Hardhat + TypeScript (Solidity vault contract)
│   ├── contracts/DemoVault.sol
│   ├── scripts/deploy.ts
│   ├── test/vault.test.ts
│   └── .env.example
│
├── dapp/            → Next.js + ethers.js frontend
│   ├── app/page.tsx
│   ├── .env.example
│   └── package.json
│
├── README.md
└── LICENSE

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/realworld-defi-dapp.git
cd realworld-defi-dapp

2️⃣ Set Up the Smart Contracts
cd contracts
npm install
cp .env.example .env


Edit your .env file with the following:

SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
USDC_ADDRESS=0xUSDC_CONTRACT_ON_SEPOLIA


Compile and deploy:

npm run build
npm run deploy:sepolia


Note the printed VAULT_ADDRESS — you’ll need it for the frontend.

3️⃣ Set Up the Frontend
cd ../dapp
npm install
cp .env.example .env.local


Edit .env.local with:

NEXT_PUBLIC_SEPOLIA_USDC=<Your USDC Address>
NEXT_PUBLIC_VAULT_ADDRESS=<Your Deployed Vault Address>
NEXT_PUBLIC_UNISWAP_V2_ROUTER=<Optional Router Address>


Run the development server:

npm run dev


Then open your browser at:
👉 http://localhost:3000

💻 Features

✅ Connect to wallet (MetaMask)
✅ Display live USDC balance
✅ Approve and deposit to vault
✅ Example Uniswap V2 swap template (extendable)
✅ Configurable testnet environment
✅ Full-stack TypeScript integration
✅ Tested using Hardhat

🧪 Testing

From the /contracts folder:

npm test


This runs unit tests validating ERC-20 approval and vault deposit functionality.

🔒 Safety & Best Practices

⚠️ Use testnets only — this project is not for mainnet deployment.
⚠️ Never commit private keys or .env files.
⚠️ Always double-check Uniswap router and token contract addresses.

🌐 Example Workflow

Connect MetaMask wallet

View live USDC balance

Approve the vault contract

Deposit tokens into the vault

(Optional) Simulate swap via Uniswap

🧭 Future Enhancements

Add on-chain price oracle integration

Extend Uniswap swap template to full liquidity module

Integrate stablecoin yield simulation

Deploy to Polygon and Avalanche testnets

🧾 License

MIT © 2025

✍️ Author

Rhonda Melo / MelOrchid
Pioneering generative AI for compliance, blockchain, and digital identity — exploring creativity and code as parallel systems.
🔗 LinkedIn – [Rhonda Melo](https://www.linkedin.com/in/rhonda-melo/)

🔖 Tags

#Blockchain #DeFi #Ethereum #USDC #Uniswap #Solidity #Hardhat #NextJS #EthersJS #Web3 #SmartContracts
