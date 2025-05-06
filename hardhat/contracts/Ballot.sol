// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Ballot {
    // Ballot info
    string public title;
    string public description;

    address public owner;
    bool public hasStarted;
    bool public hasEnded;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
    }

    struct Candidate {
        string name;
        uint256 voteCount;
        bool isRegistered;
    }

    mapping(string => Voter) private voters; // DPI -> Voter
    mapping(string => Candidate) private candidates; // DPI -> Candidate

    string[] private candidateDpis;

    // Events
    event VoterRegistered(string dpi);
    event CandidateRegistered(string dpi, string name);
    event VoteCast(string candidateDpi);
    event BallotStarted();
    event BallotEnded();

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized.");
        _;
    }

    constructor(string memory _title, string memory _description) {
        title = _title;
        description = _description;
        owner = msg.sender;
    }

    function addVoter(string memory _dpi) public onlyOwner {
        require(!hasStarted, "Ballot already started.");
        require(!voters[_dpi].isRegistered, "Duplicate voter.");
        voters[_dpi] = Voter({isRegistered: true, hasVoted: false});
        emit VoterRegistered(_dpi);
    }

    function addCandidate(
        string memory _name,
        string memory _dpi
    ) public onlyOwner {
        require(!hasStarted, "Ballot already started.");
        require(!candidates[_dpi].isRegistered, "Candidate already exists.");
        candidates[_dpi] = Candidate({
            name: _name,
            voteCount: 0,
            isRegistered: true
        });
        candidateDpis.push(_dpi);
        emit CandidateRegistered(_dpi, _name);
    }

    function startBallot() public onlyOwner {
        require(!hasStarted, "Ballot already started.");
        hasStarted = true;
        emit BallotStarted();
    }

    function endBallot() public onlyOwner {
        require(hasStarted, "Ballot has not started.");
        require(!hasEnded, "Ballot already ended.");
        hasEnded = true;
        emit BallotEnded();
    }

    function castVote(
        string memory _candidateDpi,
        string memory _voterDpi
    ) public {
        require(hasStarted, "Ballot not started.");
        require(!hasEnded, "Ballot ended.");
        require(voters[_voterDpi].isRegistered, "Voter not registered.");
        require(!voters[_voterDpi].hasVoted, "Voter already voted.");
        require(candidates[_candidateDpi].isRegistered, "Candidate not found.");

        candidates[_candidateDpi].voteCount += 1;
        voters[_voterDpi].hasVoted = true;

        emit VoteCast(_candidateDpi);
    }

    function getCandidateVoteCount(
        string memory _dpi
    ) public view returns (uint256) {
        require(candidates[_dpi].isRegistered, "Candidate not found.");
        return candidates[_dpi].voteCount;
    }

    function hasVoterVoted(string memory _dpi) public view returns (bool) {
        require(voters[_dpi].isRegistered, "Voter not registered.");
        return voters[_dpi].hasVoted;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory result = new Candidate[](candidateDpis.length);
        for (uint256 i = 0; i < candidateDpis.length; i++) {
            result[i] = candidates[candidateDpis[i]];
        }
        return result;
    }
}
