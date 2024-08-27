// import React, { useState } from 'react';
// import {
//   getToken,
//   connectToWallet,
//   getEnrollmentIdFromWallet,
//   writeTransactionFromWallet,
//   reEngageEvents,
//   readTransactionFromWallet,
//   disconnectWallet,
// } from "kalp-wallet-dapp-pkg";
// import './Mint.css'; 

// const Mint = () => {
//   // State for Mint form
//   var dappToken = "";
//   const [totalSupply, setTotalSupply] = useState(234);
//   const [amount, setAmount] = useState();
//   const [isConnected, setIsConnected] = useState(false);
//   const [responseMessage, setResponseMessage] = useState("");
//   const [responseReadMessage, setresponseReadMessage] = useState("");

//   const generateRandomString = (length) => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//   };

//   const handleMint = () => {
//     const randomTxnId = generateRandomString(6);
//     // Mint logic goes here
//     setTotalSupply(totalSupply + amount);
//     const channelName = "kalp";
//     const chainCodeName = "CBDC5";
//     const transactionName = "Mint";
//     const transactionParams = [
//       `{\"OnrampTxnId\":\"${randomTxnId}\",\"Desc\":\"First minting\",\"Amount\":${amount}}`
//     ];

//     ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
//   };

//   const connectToWalletFromDapp = async () => {
//     try {
//       if (dappToken === "") {
//         dappToken = getToken();
//       }
//       localStorage.setItem("opensea_dappToken", dappToken);
//       const res = await connectToWallet(dappToken, "OPENSEA", "http://localhost:3000/favicon.ico", "http://localhost:3000");
  
//       console.log("result", res);
//       setIsConnected(true); // Update the connected state
//     } catch (e) {
//       // TODO: format the error msg
//       console.log(`error is :${e}`);
//       setIsConnected(false); // Set connection status to false on error
//     }
//   };
  
//   const ExecuteSubmitTransaction = async (
//     channelName,
//     chaincodeName,
//     transactionName,
//     transactionParams
//   ) => {
//     try {
//       const enrollmentId = localStorage.getItem("opensea_enrollmentId");
//       dappToken = localStorage.getItem("opensea_dappToken") || "";
  
//       if (!dappToken) {
//         console.log("Error: no dappToken exists");
//         throw new Error("Error: no dappToken exists");
//       }
      
//       const res = await writeTransactionFromWallet(
//         dappToken,
//         "OPENSEA",
//         "http://localhost:3000/favicon.ico", "http://localhost:3000",
//         channelName,
//         chaincodeName,
//         transactionName,
//         transactionParams
//       );
//       setResponseMessage(`Transaction successful: ${JSON.stringify(res)}`);
//       {responseMessage && <p>{responseMessage}</p>}
//       {responseReadMessage && (
//         <h1>Read Transaction Output: {responseReadMessage}</h1>
//       )}
//       console.log('here is response: ', setResponseMessage)
//     } catch (error) {
//       console.log(`error is :${error}`);
//     }
//   };
  

//   return (
//     <div className="admin-flow-page content-area">
//       <div className="admin-flow-container">
//         {/* <div className="total-supply">Total Supply: {totalSupply}</div> */}

//         <div className="input-container">
//           <label>
//             CBDC
//           </label>
//           <input
//             className="input-field"
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(Number(e.target.value))}
//           />
//         </div>

//         <button className="mint-button" onClick={handleMint}>
//           Mint
//         </button>
        
//         <div className="transaction-messages">
//         {responseMessage && <p>{responseMessage}</p>}
//       </div>
//       </div>
//     </div>
//   );
// };

// export default Mint;



import React, { useState } from 'react';
import {
  getToken,
  connectToWallet,
  writeTransactionFromWallet,
  readTransactionFromWallet,
} from "kalp-wallet-dapp-pkg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Mint.css';

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
          Transaction Result
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

const Mint = () => {
  // State for Mint form
  var dappToken = "";
  const [totalSupply, setTotalSupply] = useState(0);
  const [amount, setAmount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleMint = () => {
    const randomTxnId = generateRandomString(6);
    setTotalSupply(totalSupply + amount);
    const channelName = "kalp";
    const chainCodeName = "CBDC5";
    const transactionName = "Mint";
    const transactionParams = [
      `{\"OnrampTxnId\":\"${randomTxnId}\",\"Desc\":\"First minting\",\"Amount\":${amount}}`
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
  
  
  

  const connectToWalletFromDapp = async () => {
    try {
      if (dappToken === "") {
        dappToken = getToken();
      }
      localStorage.setItem("opensea_dappToken", dappToken);
      const res = await connectToWallet(dappToken, "OPENSEA", "http://localhost:3000/favicon.ico", "http://localhost:3000");
  
      console.log("result", res);
      setIsConnected(true); // Update the connected state
    } catch (e) {
      console.log(`error is :${e}`);
      setIsConnected(false); // Set connection status to false on error
    }
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

      if (res.transactionId) {
        setResponseMessage(`Transaction successful: {"transactionId":"${res.transactionId}"}`);
      } else if (res.error) {
        try {
          const errorObj = JSON.parse(res.error);
          setResponseMessage(`Error: ${errorObj.message.error}`);
        } catch (parseError) {
          setResponseMessage(`Error: ${res.error}`);
        }
      }

    } catch (error) {
      console.log(`Error in ExecuteSubmitTransaction: ${error}`);
      setResponseMessage("An error occurred during the transaction.");
    } finally {
      setModalShow(true);
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
  
  

  return (
    <div className="admin-flow-page content-area">
      <button onClick={getTotalSupply}>
        Total Supply
      </button>
      <div className="admin-flow-container">
        <div className="input-container">
          <label>CBDC</label>
          <input
            className="input-field"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <button className="mint-button" onClick={handleMint}>
          Mint
        </button>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          message={responseMessage}
        />
      </div>
    </div>
  );
};

export default Mint;
