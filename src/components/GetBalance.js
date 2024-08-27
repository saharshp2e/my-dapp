
import React, { useState } from 'react';
import {
  readTransactionFromWallet,
} from "kalp-wallet-dapp-pkg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Modal Component
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Balance Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Account Balance</h4>
        <p>{props.balance}</p> {/* Display the balance from props */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

// Main Component
const GetBalance = () => {
  const [vendorAddress, setVendorAddress] = useState('');
  const [responseReadMessage, setResponseReadMessage] = useState("");
  const [Balance, setBalance] = useState("");
  const [modalShow, setModalShow] = useState(false); // State to control modal visibility

  const handleSubmit = () => {
    getBalance();
  };

  const ExecuteReadTransaction = async (
    channelName,
    chaincodeName,
    transactionName,
    transactionParams
  ) => {
    try {
      const enrollmentId = localStorage.getItem("opensea_enrollmentId");
      const dappToken = localStorage.getItem("opensea_dappToken") || "";

      if (!dappToken) {
        console.log("Error: no dappToken exists");
        throw new Error("Error: no dappToken exists");
      }

      console.log("Reading balance...", transactionParams);
      var readTransactionPromise = await readTransactionFromWallet(
        dappToken,
        "OPENSEA",
        "http://localhost:3000/favicon.ico", "http://localhost:3000",
        channelName,
        chaincodeName,
        transactionName,
        transactionParams
      );

      console.log('Balance retrieved: ', readTransactionPromise);

      setBalance(
        `Read Transaction successful: ${JSON.stringify(readTransactionPromise)}`
      );
      setResponseReadMessage(
        `Read Transaction successful: ${JSON.stringify(readTransactionPromise)}`
      );
      setModalShow(true); // Show modal when balance is retrieved
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const channelName = "kalp";
      const chainCodeName = "CBDC5";
      const transactionName = "GetBalanceForAccount";
      const transactionParams = [`${vendorAddress}`];

      await ExecuteReadTransaction(channelName, chainCodeName, transactionName, transactionParams);
    } catch (error) {
      console.log("Error in getBalance:", error);
    }
  };


  return (
    <>
      <div className="admin-flow-page content-area">
        <div className="admin-flow-container">
          <label>Vendor Address</label>
          <input
            className="input-field"
            type="text"
            value={vendorAddress}
            onChange={(e) => setVendorAddress(e.target.value)}
            placeholder="Enter Vendor Address"
          />

          <Button variant="primary" onClick={handleSubmit}>Get Balance</Button>

          {/* Modal to display the balance */}
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            balance={Balance} // Pass the balance as a prop to the modal
          />
        </div>
      </div>
    </>
  );
};

export default GetBalance;
