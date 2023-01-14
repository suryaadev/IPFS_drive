// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract IPFS_drive {
    // struct for storring address which will have access and it's respective value

    struct Access {
        address user;
        bool access;
    }

    // mapping with array => images associated with address
    mapping(address => string[]) value;

    // list of addresses who have access
    mapping(address => Access[]) accessList;

    // nested mapping for ownership like 2D array
    mapping(address => mapping(address => bool)) ownership;

    // for storing previous state
    mapping(address => mapping(address => bool)) previousData;

    // function to add img url to the specific address
    function add(address _user, string memory _url) external {
        value[_user].push(_url);
    }

    // function to allow user who can see the the images
    function allow(address _user) public {
        ownership[msg.sender][_user] = true;
        if (previousData[msg.sender][_user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;
        }
    }

    function disAllow(address _user) public {
        ownership[msg.sender][_user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == _user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "Don't have access"
        );
        return (value[_user]);
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
