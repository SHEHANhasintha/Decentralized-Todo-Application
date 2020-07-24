// SPDX-License-Identifier: MIT
/*
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}

*/

pragma solidity >=0.4.21 <0.7.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  constructor() public {
   // createTask("Check out dappuniversity.com");
  }

  function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
    emit TaskCreated(taskCount, _content, false);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

  function getTasks() public view returns (uint[] memory) {
    uint[] memory memoryArrayid = new uint[](taskCount);
    for(uint i = 0; i < taskCount; i++) {
        memoryArrayid[i] = tasks[i].id;
    }
    return memoryArrayid;
  }

  function getTaskContent(uint _contentId) public view returns (string memory){
  	return tasks[_contentId + 1].content;
  }

  function getCompletedSubmissionContent(uint _contentId) public view returns (bool ){
  	return tasks[_contentId].completed;
  }  

}
