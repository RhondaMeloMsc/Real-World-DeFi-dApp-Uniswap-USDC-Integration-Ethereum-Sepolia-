import { ethers } from "hardhat";
import "dotenv/config";

/**
 * Deploys DemoVault with a token address from env (USDC on Sepolia or any ERC20).
 */
async function main() {
  const token = process.env.USDC_ADDRESS;
  if (!token) throw new Error("Set USDC_ADDRESS in contracts/.env to an ERC20 address");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const Vault = await ethers.getContractFactory("DemoVault");
  const vault = await Vault.deploy(token);
  await vault.waitForDeployment();

  const addr = await vault.getAddress();
  console.log("VAULT_ADDRESS:", addr);
}

main().catch((e) => { console.error(e); process.exit(1); });
