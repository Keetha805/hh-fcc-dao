//give time to users to "get out"

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    //  * - `minDelay`: initial minimum delay for operations
    //  * - `proposers`: accounts to be granted proposer and canceller roles
    //  * - `executors`: accounts to be granted executor role
    //  * - `admin`: optional account to be granted admin role; disable with zero address
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address _admin
    ) TimelockController(minDelay, proposers, executors, _admin) {}
}
