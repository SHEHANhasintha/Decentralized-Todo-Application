pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TodoList.sol";

contract TestSimpleStorage {

  function testItStoresAValue() public {
    TodoList simpleStorage = TodoList(DeployedAddresses.TodoList());

  }

}



