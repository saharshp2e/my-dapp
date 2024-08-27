
import React, { useState } from 'react';
import { writeTransactionFromWallet, readTransactionFromWallet } from "kalp-wallet-dapp-pkg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Reuse the Modal component from Send.js
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
          Transaction Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ overflowWrap: 'break-word', maxHeight: '200px', overflowY: 'auto' }}>
          <p>{props.message}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Burn = () => {
    var dappToken = "";
    const [receiverAddress, setReceiverAddress] = useState('');
    const [responseMessage, setResponseMessage] = useState("");
    const [modalShow, setModalShow] = useState(false); // State to control modal visibility

    const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const ExecuteSubmitTransaction = async (
        channelName,
        chaincodeName,
        transactionName,
        transactionParams
    ) => {
        try {
            const enrollmentId = localStorage.getItem("opensea_enrollmentId");
            dappToken = localStorage.getItem("opensea_dappToken") || "";
    
            console.log('transaction params: ', transactionParams);
            if (!dappToken) {
                console.log("Error: no dappToken exists");
                throw new Error("Error: no dappToken exists");
            }
            const res = await writeTransactionFromWallet(
                dappToken,
                "OPENSEA",
                "http://localhost:3000/favicon.ico",
                "http://localhost:3000",
                channelName,
                chaincodeName,
                transactionName,
                transactionParams
            );
            setResponseMessage(`Transaction successful: ${JSON.stringify(res)}`);
        } catch (error) {
            console.log(`Error: ${error}`);
            setResponseMessage("An error occurred during the transaction.");
        } finally {
            setModalShow(true); // Show the modal with the response
        }
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
    
        console.log("Initiating transaction...", transactionParams);
    
        // Open the wallet popup
        const readTransactionPromise = await readTransactionFromWallet(
          dappToken,
          "OPENSEA",
          "http://localhost:3000/favicon.ico", 
          "http://localhost:3000",
          channelName,
          chaincodeName,
          transactionName,
          transactionParams
        );
    
        console.log('Transaction response:', readTransactionPromise);
    
        // Manually control when the modal is shown or hidden
        setResponseMessage(`Balance retrieved: ${readTransactionPromise}`);
        setModalShow(true); // Show modal after transaction is completed
    
      } catch (error) {
        console.log('Error in ExecuteReadTransaction:', error);
        setResponseMessage(`Error: ${error.message}`);
        setModalShow(true); // Show modal on error as well
      }
    };

    const handleBurn = () => {
        const txnId = generateRandomString(6);
        const channelName = "kalp";
        const chainCodeName = "CBDC5";
        const transactionName = "Burn";
    
        const transactionParams = [
          `{"Account":"${receiverAddress}","OnrampTxnId":"${txnId}","Desc":"remove funds"}`
        ];
        
        ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
    };

    const getTotalSupply = async () => {
      const channelName = "kalp";
      const chainCodeName = "CBDC5";
      const transactionName = "GetTotalSupply";
      const transactionParams = [];
  
      await ExecuteReadTransaction(channelName, chainCodeName, transactionName, transactionParams);
      console.log('total supply: ', ExecuteReadTransaction)
    }

    return (
        <div className="admin-flow-page">
            <button onClick={getTotalSupply}>
              Total Supply
            </button>
            <div className="admin-flow-container">
                <div className="input-container">
                    <label>
                        CBDC
                    </label>
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Receiver Address"
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                    />
                </div>

                <button className="burn-button" onClick={handleBurn}>
                    Burn
                </button>

                {/* Modal to display the response message */}
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    message={responseMessage} // Pass the response message as a prop to the modal
                />
            </div>
        </div>
    );
};

export default Burn;
