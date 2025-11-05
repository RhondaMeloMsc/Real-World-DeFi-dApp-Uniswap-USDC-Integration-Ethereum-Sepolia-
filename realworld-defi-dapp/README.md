# Real-World DeFi dApp: Uniswap + USDC Integration (Sepolia)

Full-stack decentralized application demonstrating real-world blockchain integration:
- ERC-20 vault smart contract (Hardhat + TypeScript)
- Frontend dApp (Next.js + TypeScript + ethers v6)
- Wallet connect (MetaMask), USDC balance, approve, and deposit
- Uniswap hook template to route a swap (configurable)

Recommended network: **Ethereum Sepolia testnet**

---

## Monorepo Layout
- `contracts/` — Hardhat project (Solidity, deploy scripts, tests)
- `dapp/` — Next.js 14 app with a simple UI to connect wallet and interact with USDC + vault

---

## Quick Start

### Contracts
```bash
cd contracts
npm install
cp .env.example .env
# edit .env with SEPOLIA_RPC_URL and PRIVATE_KEY (test wallet only)
npm run build
npm run deploy:sepolia
```

The script prints:
- `VAULT_ADDRESS` (copy it for the frontend)
- You can verify or extend tests as needed.

### Frontend
```bash
cd ../dapp
npm install
cp .env.example .env.local
# set NEXT_PUBLIC_SEPOLIA_USDC and NEXT_PUBLIC_VAULT_ADDRESS (from deploy output)
npm run dev
# open http://localhost:3000
```

---

## What it Does
- Reads connected wallet address (MetaMask)
- Shows **USDC** balance (Sepolia address configurable via env)
- Lets user **approve** the vault to spend USDC
- Lets user **deposit** USDC into the vault (DemoVault.sol)
- Includes a **swap template** to call Uniswap V2 router (address via env)

---

## Safety
- Never commit real PRIVATE_KEY or .env files
- Use **Sepolia** only; this is an educational demo
- Review contract and addresses before sending transactions

---

## License
MIT © 2025
