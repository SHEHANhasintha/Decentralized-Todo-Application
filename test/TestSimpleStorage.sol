pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TodoList.sol";

contract TestSimpleStorage {

  function testItStoresAValue() public {
    TodoList simpleStorage = TodoList(DeployedAddresses.TodoList());

    //simpleStorage.set(89);

    //uint expected = 89;

    //Assert.equal(simpleStorage.get(), expected, "It should store the value 89.");
  }

}




/*


pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TodoList.sol";



contract TestSimpleStorage {

  function testItStoresAValue() public {
    TodoList simpleStorage = TodoList(DeployedAddresses.TodoList());

    //simpleStorage.set(89);

    //uint expected = 89;

    //Assert.equal(simpleStorage.get(), expected, "It should store the value 89.");
  }

}


*/