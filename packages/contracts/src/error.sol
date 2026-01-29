//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/* ============ Errors ============ */
error TransferFailed(address token, address sender, uint256 amount);
error TokenTransferFailed(address token, address to, uint256 amount);
error BorrowLimitExceeded(uint256 amount, uint256 availableToBorrow);
error OverPaymentNotSupported(uint256 amountPaid, uint256 expectedAmount);
error NotEnoughCollateral(uint256 collateralBalance, uint256 userInput);
error InvalidAsset(address asset);
error BorrowedAmountNotFullyRepaid(uint256 balance);
error TokenAlreadyApproved(address token);
error TokenNotApproved(address token);
error InvalidPriceData(int256 price);
error InsufficientPoolBalance(uint256 poolBalance, uint256 requestedAmount);
error InvalidAddress(address addr);
error FeedDataNotFinalized();
error StalePriceData(uint256 data);
error NoCollateralProvided();
error InsufficientCollateral();
error InsufficientEthBalance();
error InvalidDecimals();
error BadBonus(uint256 bonus);
error InvalidCloseFactor();
error InvalidAmount();
error PositionHealthy();
error NoActivePosition();
error Badltv(uint256 ltv);
