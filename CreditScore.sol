// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    // Add if needed: function decimals() external view returns (uint8);
}

contract CreditScore is ChainlinkClient, ConfirmedOwner {
    struct ScoreEntry {
        uint256 score; // Total score
        uint256 financialHealthScore; // New: Dimensional score
        uint256 operationalStabilityScore; // New: Dimensional score
        uint256 onchainActivityScore; // New: Dimensional score
        uint256 timestamp;
    }

    mapping(address => ScoreEntry[]) private companyCreditHistory;
    mapping(address => uint256) private creditScoreUpdateCounts; // Track update counts

    bytes32 public constant ASSESSOR_ROLE = keccak256("ASSESSOR_ROLE");

    mapping(bytes32 => mapping(address => bool)) private roles;

    // Chainlink related variables
    address public oracle;
    bytes32 public jobId;
    uint256 public fee;

    event CreditScoreUpdated(address indexed company, uint256 newScore, uint256 timestamp);
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);
    event ChainlinkRequested(bytes32 indexed requestId);
    event CreditHistoryViewed(address indexed viewer, address indexed company); // New: Event for viewing history

    constructor() ConfirmedOwner(msg.sender) {
        _grantRole(ASSESSOR_ROLE, msg.sender); // Grant owner the ASSESSOR_ROLE initially
        // Default Chainlink parameters (replace with actual values)
        setChainlinkToken(0x01BE23585faA95CSoMEtHInG0123456789abcdef);
        oracle = 0x01BE23585faA95CSoMEtHInG0123456789abcdef; // Replace with actual Oracle address
        jobId = "29fa9aa13bf1468788b7cc490159b10f"; // Replace with actual Job ID
        fee = 1 * 10**18; // Example fee (1 LINK) - adjust as needed
    }

    modifier onlyRole(bytes32 role) {
        require(hasRole(role, msg.sender), string(abi.encodePacked("Missing role:", role)));
        _;
    }

    function hasRole(bytes32 role, address account) public view returns (bool) {
        return roles[role][account];
    }

    function grantRole(bytes32 role, address account) public onlyOwner {
        _grantRole(role, account);
    }

    function revokeRole(bytes32 role, address account) public onlyOwner {
        _revokeRole(role, account);
    }

    function _grantRole(bytes32 role, address account) internal {
        if (!hasRole(role, account)) {
            roles[role][account] = true;
            emit RoleGranted(role, account, msg.sender);
        }
    }

     function _revokeRole(bytes32 role, address account) internal {
        if (hasRole(role, account)) {
            roles[role][account] = false;
            emit RoleRevoked(role, account, msg.sender);
        }
    }

    // Function to set Chainlink parameters (callable by owner)
    function setChainlinkParameters(address _oracle, bytes32 _jobId, uint256 _fee) public onlyOwner {
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
        setChainlinkToken(LinkTokenInterface(0x01BE23585faA95CSoMEtHInG0123456789abcdef).address); // Ensure Link Token address is set
    }

    // Function to request a credit score assessment for a company via Chainlink
    // This function now initiates a request that should ideally result in multiple dimensional scores and a total score
    function requestCreditScoreAssessment(address company) public onlyRole(ASSESSOR_ROLE) returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // In a real application, you would add parameters here for the Chainlink node
        // to identify the company and know what data to fetch/process off-chain.
        // request.add("companyAddress", company);
        // request.add("dataSource", "financials"); // Example parameter indicating data source

        // In a real application, store the mapping from requestId to company address here
        // mapping(bytes32 => address) private requestIdToCompany;
        // requestIdToCompany[requestId] = company;

        requestId = sendChainlinkRequestTo(oracle, request, fee);
        emit ChainlinkRequested(requestId);
        return requestId;
    }

    // Chainlink callback function to receive the credit score result
    // IMPORTANT: Standard Chainlink fulfill receives single data. To get multiple dimensions,
    // the oracle job should return encoded data (e.g., bytes) which is then decoded here,
    // or you might use multiple Chainlink jobs/requests.
    // For simplicity in this example, we will assume the single returned uint256 is the total score
    // and use placeholder values for dimensional scores. A real implementation requires proper data handling.
    function fulfill(bytes32 _requestId, uint256 _totalScore) public recordChainlinkCallback(_requestId) {
        // IMPORTANT: In a real application, retrieve the company address using _requestId
        // from the mapping stored in requestCreditScoreAssessment.

         // address company = requestIdToCompany[_requestId]; // Example
         // if (company != address(0)) {
         //     // Assuming the oracle also provides dimensional scores, or they are calculated here
         //     uint256 financial = 0; // Placeholder
         //     uint256 operational = 0; // Placeholder
         //     uint256 onchain = 0; // Placeholder
         //     // In a real app, these would come from _requestId data or other logic
         //
         //     companyCreditHistory[company].push(ScoreEntry(_totalScore, financial, operational, onchain, block.timestamp));
         //     creditScoreUpdateCounts[company]++; // Increment count
         //     emit CreditScoreUpdated(company, _totalScore, block.timestamp);
         //     delete requestIdToCompany[_requestId]; // Clean up
         // }

         // To compile, we will add a placeholder assuming the company address is available
         // and use dummy values for dimensional scores for now.
         // *** IMPORTANT: Replace this with real logic mapping requestId to company address
         // and getting actual dimensional scores from the oracle callback data. ***
         address placeholderCompanyAddress = 0xAb5801a7D39935CEa5D1454Ffcc8614a9791CdC9; // Replace with logic to get the actual company address
         uint256 dummyFinancial = 80; // Dummy value
         uint256 dummyOperational = 75; // Dummy value
         uint256 dummyOnchain = calculateFrequencyAdjustment(placeholderCompanyAddress, 5); // Example: use on-chain logic for one dimension

         companyCreditHistory[placeholderCompanyAddress].push(
             ScoreEntry(
                 _totalScore, // Use the score from Chainlink as total score
                 dummyFinancial,
                 dummyOperational,
                 dummyOnchain,
                 block.timestamp
             )
         );
         creditScoreUpdateCounts[placeholderCompanyAddress]++; // Increment count
         emit CreditScoreUpdated(placeholderCompanyAddress, _totalScore, block.timestamp);
    }

    // Function to calculate a potential score adjustment based on ERC20 token balance
    // This is a view function and does not modify state.
    function calculateTokenBalanceAdjustment(
        address company,
        address tokenAddress,
        uint256 adjustmentFactor
    ) public view returns (int256) {
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(company);

        // Simple linear adjustment: balance divided by a factor
        // Need to be careful with division by zero and large numbers
        if (adjustmentFactor == 0) {
            return 0; // Avoid division by zero
        }
         // Example: Let adjustmentFactor represent how many minimal token units are needed for +1 score
        return int256(balance / adjustmentFactor);
    }

    // Function to calculate a score adjustment based on credit score update frequency
    // This is a view function and does not modify state.
    function calculateFrequencyAdjustment(
        address company,
        uint256 frequencyFactor
    ) public view returns (uint256) {
        // Simple linear adjustment: count multiplied by a factor
        return creditScoreUpdateCounts[company] * frequencyFactor;
    }

    // The previous setCreditScore is modified to accept dimensional scores as well
     function setCreditScore(
         address company,
         uint256 totalScore,
         uint256 financialHealthScore,
         uint256 operationalStabilityScore,
         uint256 onchainActivityScore
     ) public onlyRole(ASSESSOR_ROLE) {
         companyCreditHistory[company].push(
             ScoreEntry(
                 totalScore,
                 financialHealthScore,
                 operationalStabilityScore,
                 onchainActivityScore,
                 block.timestamp
             )
         );
         creditScoreUpdateCounts[company]++; // Increment count
         emit CreditScoreUpdated(company, totalScore, block.timestamp);
     }

    // Updated function to return the latest complete ScoreEntry
    function getLatestCreditScore(address company) public view returns (ScoreEntry memory) {
        emit CreditHistoryViewed(msg.sender, company); // Emit event when viewed
        ScoreEntry[] storage history = companyCreditHistory[company];
        if (history.length > 0) {
            return history[history.length - 1];
        } else {
             // Return a default or empty ScoreEntry if no history
            return ScoreEntry(0, 0, 0, 0, 0);
        }
    }

    // getCreditHistory now returns an array of the updated ScoreEntry struct
    function getCreditHistory(address company) public view returns (ScoreEntry[] memory) {
         emit CreditHistoryViewed(msg.sender, company); // Emit event when viewed
        return companyCreditHistory[company];
    }

    // --- Placeholder for future Privacy Features ---

    // event DataDecrypted(address indexed decrypter, address indexed company, bytes32 indexed dataIdentifier);
    // event ZeroKnowledgeProofVerified(address indexed verifier, bytes32 indexed proofHash, bool result);

    // // Function to potentially request access to encrypted data
    // function requestDataAccess(address company, bytes32 dataIdentifier) public; // Requires access control and off-chain processing

    // // Function to potentially verify a zero-knowledge proof related to a company's data
    // function verifyCreditworthinessProof(address company, bytes proof, bytes publicInputs) public returns (bool);

    // // State variable to potentially toggle privacy features or modes
    // bool public privacyModeEnabled = false;

    // --- End of Placeholder ---
} 