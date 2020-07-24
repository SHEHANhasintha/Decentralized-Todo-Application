import React, { Component } from "react";
import TodoList from "./contracts/TodoList.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
   storageValue: [], 
   storageValueCompleted: null,
   web3: null, 
   accounts: null, 
   contract: null,
   loading: true
 };

 constructor(props){
    super(props);
    this.par = this.par.bind(this);
 }

  par = async () => {
    let items = [];
    let cave;
      for(let [index,entry] of this.state.storageValue.entries()){
        if (this.state.storageValueCompleted[index]){
          cave = 
          <div className="lay" style={{color : "#0f0"}}  key={index} className="checkbox">
                <label >
                  <input value={index} contentEditable="false" checked={true}  type="checkbox" onClick={(e) => this.taskToggleCompletion(e)}/>
                  <span className="content task">{entry}</span>
                </label>
            </div>
        }else{
          cave = 
          <div className="lay" style={{color : "#ff0"}}  key={index} className="checkbox">
                  <input type="checkbox" contentEditable="false" checked={false} value={index} onChange={(e) => this.taskToggleCompletion(e)}/>
                  <span className="content ">{entry}</span>            
            </div>
        }


        items.push(cave)
      }
    this.setState({makeuplist : items})
  }

  componentDidMount = async () => {

      //load web3 provider
      //load account
      //load contract
      //run pay

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoList.networks[networkId];
      const instance = new web3.eth.Contract(
        TodoList.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance ,loading : false});
      
      await this.getSubmissions()
      await this.getCompletedSubmissions();
      this.par();

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  taskValue = async (e) => {
    await this.setState({ taskValue: e.target.value.trim() })
  }

  taskToggleCompletion = async (e) => {
    await this.setState({ taskToggleCompletion: e.target.value.trim() })
    this.completedSubmission(this.state.taskToggleCompletion);
  }

  completedSubmission = async (value) => {
    const { accounts, contract, taskToggleCompletion } = this.state;
    if (taskToggleCompletion == "on"){
      await contract.methods.toggleCompleted(value).send({ from: accounts[0] });
    }else{
      await contract.methods.toggleCompleted(value).send({ from: accounts[0] });
    }

    await this.getCompletedSubmissions();
    this.par()

  }

  getSubmissions = async (e) => {
    const { accounts,contract, taskValue } = this.state;
    let response;
    try{
        response = await contract.methods.getTasks().call();
    }catch(e){
        return;
    }
    let ret = [];
    if (response[0] == "No item Exist yet"){
      return;
    }
    for (let i = 0; i<response.length; i++){
      ret[i] = await contract.methods.getTaskContent(i).call();
    }
    await this.setState({ storageValue: ret })

  }

  getCompletedSubmissions = async (e) => {
    const { accounts,contract, taskValue } = this.state;
    let response;
    try{
        response = await contract.methods.getTasks().call();
    }catch(e){
        return;
    }
    let ret = [];
    if (response[0] == "No item Exist yet"){
      return;
    }
    for (let i = 0; i<response.length; i++){

      ret[i] = await contract.methods.getCompletedSubmissionContent(i).call();
    }
    await this.setState({ storageValueCompleted: ret })

  }  

  runSubmission = async (e) => {
    e.preventDefault();
    const { accounts, contract, taskValue } = this.state;
    await contract.methods.createTask(taskValue).send({ from: accounts[0] });

    await this.getSubmissions()
    this.par()
  };



   render() {
      if (!this.state.web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
      }


    let items = [];

      let load;
        if (this.state.loading){
          load = <div id="loader" style={{display : this.loading()}} className="text-center layout">
            <p className="text-left">Loading...</p>
          </div>
          }else{
          load = <div id="content" className="layout">
            <form onSubmit={ (e) => this.runSubmission(e)} class="buttonOut">
              <input id="newTask" type="text" onChange={(e) => this.taskValue(e)} className="form-control" placeholder="Add task..." required/>
              <input type="submit" className="btn btn-primary" hidden=""/>
            </form>
            <ul id="taskList" className="list-unstyled">
                {this.state.makeuplist}  
            </ul>
            <ul id="completedTaskList" className="list-unstyled">
            </ul>
          </div>
        }



    return (
      <div className="App">


    <div className="container-fluid">
      <div className="row">
        <main role="main" className=" col-lg-12 d-flex justify-content-center">
          
          {load}

        </main>





      </div>
    </div>

      </div>
    );
  }
}

export default App;
