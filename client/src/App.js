import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ShieldedPII from "./contracts/ShieldedPII.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
    state = { storageValue: 0, web3: null, accounts: null, contract: null };

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            // const deployedNetwork = SimpleStorageContract.networks[networkId];
            const deployedNetwork = ShieldedPII.networks[networkId];

            // const instance = new web3.eth.Contract(
            //     SimpleStorageContract.abi,
            //     deployedNetwork && deployedNetwork.address,
            // );

            const instance = new web3.eth.Contract(
                ShieldedPII.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: instance }, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    runExample = async () => {
        const { accounts, contract } = this.state;



        // Stores a given value, 5 by default.
        // await contract.methods.set(50).send({ from: accounts[0] });

        // Get the value from the contract to prove it worked.
        // const response = await contract.methods.get().call();

        // Update state with the result.

        // this.setState({ storageValue: response });

        await contract.methods.registerPatient("Harry John", 635057910, "123 Main St., Buffalo, NY, 14228", "02021985", ["a, ", "b, ", "c"], "356728").send({ from: accounts[0], gas: 1000000 });

        const response = await contract.methods.patients(window.location.href.split("=")[1]).call();

        const responseHealthHist = await contract.methods.getPatientHealthHist(window.location.href.split("=")[1]).call();

        // console.log(responseHealthHist)

        this.setState({ storageValue: response });
        this.setState({ storageValueHist: responseHealthHist });
        console.log(response)
        console.log(responseHealthHist)




    };
    buttonClick = async () => {
        const { accounts, contract } = this.state;
        await contract.methods.addPatientHistory(window.location.href.split("=")[1], ", Sample Hist").send({ from: accounts[0], gas: 1000000 });

    }

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (


            <div className=" outer">
                <form className="form-horizontal">
                    <div className="panel panel-default">
                        <div className="panel-body text-center">
                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="img-circle profile-avatar" alt="User avatar"/>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">Patient Personal Info</h4>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">ID</label>
                                <div className="col-sm-10">
                                    <label type="text" className="form-control"> {this.state.storageValue.id}</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Name</label>
                                <div className="col-sm-10">
                                    <label type="text" className="form-control"> {this.state.storageValue.name}</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">SSN</label>
                                <div className="col-sm-10">
                                    <label type="text" className="form-control"> {this.state.storageValue.ssn}</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Address</label>
                                <div className="col-sm-10">
                                    <label type="text" className="form-control"> {this.state.storageValue.address_}</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">DOB</label>
                                <div className="col-sm-10">
                                    <label type="text" className="form-control"> {this.state.storageValue.dob}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">Health Info</h4>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Health History</label>
                                <div className="col-sm-10">
                                    <label type="text" className="form-control"> {this.state.storageValueHist}</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 control-label">New Health History</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control"/>
                                   <button onClick = {this.buttonClick.bind(this)} type="button" className="btn btn-success">Submit</button>
                                </div>

                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 control-label">Insurance ID</label>
                                <div className="col-sm-10">
                                    <label type="text" className="form-control"> {this.state.storageValue.insuranceID}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


        )
    }
}

export default App;