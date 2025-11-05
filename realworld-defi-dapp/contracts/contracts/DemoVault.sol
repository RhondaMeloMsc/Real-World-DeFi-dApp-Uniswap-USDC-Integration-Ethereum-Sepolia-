// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "./IERC20.sol";

/**
 * @title DemoVault
 * @notice Minimal ERC20 vault for demo purposes: deposit/withdraw a configured token (e.g., USDC).
 *         Not production ready. No fees, no shares accounting, single token only.
 */
contract DemoVault {
    address public immutable token;
    address public owner;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event OwnerChanged(address indexed newOwner);

    constructor(address _token) {
        require(_token != address(0), "token=0");
        token = _token;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    function setOwner(address _new) external onlyOwner {
        require(_new != address(0), "owner=0");
        owner = _new;
        emit OwnerChanged(_new);
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "amount=0");
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "transferFrom failed");
        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(amount > 0, "amount=0");
        require(IERC20(token).transfer(msg.sender, amount), "transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    function balance() external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }
}
