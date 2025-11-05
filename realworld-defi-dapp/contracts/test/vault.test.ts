import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

// Minimal mock ERC20 for local tests
const ERC20_SOURCE = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockERC20 {
    string public name = "Mock";
    string public symbol = "MCK";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address=>uint256) public balanceOf;
    mapping(address=>mapping(address=>uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 supply) {
        totalSupply = supply;
        balanceOf[msg.sender] = supply;
        emit Transfer(address(0), msg.sender, supply);
    }
    function transfer(address to,uint256 v) external returns(bool){
        require(balanceOf[msg.sender]>=v,"bal");
        balanceOf[msg.sender]-=v; balanceOf[to]+=v;
        emit Transfer(msg.sender,to,v); return true;
    }
    function approve(address sp,uint256 v) external returns(bool){
        allowance[msg.sender][sp]=v; emit Approval(msg.sender,sp,v); return true;
    }
    function transferFrom(address f,address t,uint256 v) external returns(bool){
        require(balanceOf[f]>=v,"bal"); require(allowance[f][msg.sender]>=v,"allow");
        allowance[f][msg.sender]-=v; balanceOf[f]-=v; balanceOf[t]+=v;
        emit Transfer(f,t,v); return true;
    }
}
`;

describe("DemoVault", function () {
  async function deploy() {
    const [owner, user] = await ethers.getSigners();
    const Mock = await ethers.getContractFactoryFromArtifact({
      _format: "hh-sol-artifact-1",
      contractName: "MockERC20",
      sourceName: "MockERC20.sol",
      abi: [], bytecode: "0x", deployedBytecode: "0x", linkReferences: {}, deployedLinkReferences: {}
    });
    // Workaround: compile inline solidity via ethers
    const factory = await ethers.getContractFactory(ERC20_SOURCE, []);
    const mock = await factory.deploy(ethers.parseUnits("1000",18));
    await mock.waitForDeployment();

    const Vault = await ethers.getContractFactory("DemoVault");
    const vault = await Vault.deploy(await mock.getAddress());
    await vault.waitForDeployment();

    return { owner, user, mock, vault };
  }

  it("accepts deposits", async () => {
    const { user, mock, vault } = await loadFixture(deploy);
    const amount = ethers.parseUnits("10", 18);
    await (await mock.transfer(user.address, amount)).wait();
    const mAsUser = mock.connect(user);
    await (await mAsUser.approve(await vault.getAddress(), amount)).wait();
    await (await vault.connect(user).deposit(amount)).wait();
    expect(await vault.balance()).to.equal(amount);
  });
});
