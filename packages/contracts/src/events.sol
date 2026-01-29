//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

library minilendEvent {
    /* ============ Events ============ */
    event ltvUpdated(uint256 newltv);
    event BonusUpdated(uint256 newBonus);
    event TokenRevoked(address indexed token);
    event NewTokenApproved(address indexed token);
    event PriceFeedUpdated(address indexed token, address indexed feed);
    event MockUsdtAddressUpdated(address newAddress);
    event EthStaked(address indexed user, uint256 ethAmount);
    event USDRepaid(address indexed user, uint256 usdAmount);
    event USDBorrowed(address indexed user, uint256 usdAmount);
    event ETHCollateralWithdrawn(address indexed user, uint256 amount);
    event Liquidation(
        address indexed liquidator,
        address indexed borrower,
        uint256 repayAmount,
        uint256 seizedCollateral
    );
}
