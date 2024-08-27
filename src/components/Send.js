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
// import './Send.css';

// const Send = () => {
//   var dappToken = "";
//   const [accountBalance, setAccountBalance] = useState(234);
//   const [cbdc, setCBDC] = useState('');
//   const [receiverAddress, setReceiverAddress] = useState('');
//   const [amount, setAmount] = useState();
//   const [isConnected, setIsConnected] = useState(false);
//   const [responseMessage, setResponseMessage] = useState("");
//   const [responseReadMessage, setresponseReadMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [Balance, setBalance] =  useState("")
//   const [capital, setCapital] = useState("");
//   const [extractedMessage, setExtractedMessage] = useState("");

//   let displayedBalance = "";
    

//   const handleSend = async () => {
//     const channelName = "kalp";
//     const chainCodeName = "CBDC5";
//     const transactionName = "TransferToken";
//     const transactionParams = [
//       `{"Receiver":"${receiverAddress}","Amount":${amount}}`,
//       // `{\"Receiver\":\'ebcb2f58c3f034486e75159b6c6bf42c039be539\',\"Amount\":50}`,
//     ];
//     console.log('transfer token amount : ', transactionParams)
//     await ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
    

//     // Send logic goes here
//     setAccountBalance(accountBalance - amount);
//     getBalance()
//     console.log(`Sent ${amount} CBDC to ${receiverAddress}`);
//   };
  

//   const getBalance = async () => {
//     try {
//       const channelName = "kalp";
//       const chainCodeName = "CBDC5";
//       const transactionName = "GetBalanceForAccount";
//       const transactionParams = [`"${receiverAddress}"`];
  
//       // Await the balance retrieval and store the result
//       const balanceResult = await ExecuteReadTransaction(channelName, chainCodeName, transactionName, transactionParams);

//       // Store the balance locally to render it later
//       displayedBalance = `Read Transaction successful: ${JSON.stringify(balanceResult)}`;
//       console.log(displayedBalance);
      
  
//       // Update state with the retrieved balance
//       // setBalance(`Read Transaction successful: ${JSON.stringify(balanceResult)}`);
//     } catch (error) {
//       console.log("Error in getBalance:", error);
//     }
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
//       // const message = extractMessage(responseMessage);
//       // const message = extractMessage(`Transaction successful: ${JSON.stringify(res)}`);
//       // setExtractedMessage(message);
//       // console.log('message: ', message)
//     } catch (error) {
//       console.log(`error is :${error}`);
//       if (error.response && error.response.data && error.response.data.message) {
//         setErrorMessage(error.response.data.message.error);
//       } else {
//         setErrorMessage("An unknown error occurred.");
//       }
//     }
//   };
  
//   const ExecuteReadTransaction = async (
//     channelName,
//     chaincodeName,
//     transactionName,
//     transactionParams
//   ) => {
//     try {
//       //const resp: boolean = await connectToWallet(dappToken, "OPENSEA");
//       const enrollmentId = localStorage.getItem("opensea_enrollmentId");
//       dappToken = localStorage.getItem("opensea_dappToken") || "";
  
//       transactionParams = [`${receiverAddress}"`];
//       if (!dappToken) {
//         console.log("Error: no dappToken exists");
//         throw new Error("Error: no dappToken exists");
//       }
  
//       console.log("hebhr")
//       var readTransactionPromise = await readTransactionFromWallet(
//         dappToken,
//         "OPENSEA",
//         "http://localhost:3000/favicon.ico", "http://localhost:3000",
//         channelName,
//         chaincodeName,
//         transactionName,
//         transactionParams
//       );
//       // console.log(`readTransactionPromise is:${readTransactionPromise}`);
//       console.log('balance Amount: ', responseReadMessage) 
 
//       setBalance(
//         `Read Transaction successful: ${JSON.stringify(readTransactionPromise)}`
//       );
//       setresponseReadMessage(
//         `Read Transaction successful: ${JSON.stringify(readTransactionPromise)}`
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (
//     <div className="admin-flow-page content-area">
//       <div className="admin-flow-container">
//         <div className="account-balance">Acc. Balance: {Balance}</div>
//         <label>CBDC</label>
//         <input
//           className="input-field"
//           type="text"
//           placeholder="Receiver address"
//           value={receiverAddress}
//           onChange={(e) => setReceiverAddress(e.target.value)}
//         />
//         <input
//           className="input-field"
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(Number(e.target.value))}
//         />
//         <button className="send-button" onClick={handleSend}>
//           Send
//         </button>
//         <div className="transaction-messages">
//           {responseMessage && <p>{responseMessage}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Send;


import React, { useState } from 'react';
import {
  getToken,
  connectToWallet,
  getEnrollmentIdFromWallet,
  writeTransactionFromWallet,
  reEngageEvents,
  readTransactionFromWallet,
  disconnectWallet,
} from "kalp-wallet-dapp-pkg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Send.css';

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

const Send = () => {
  var dappToken = "";
  const [accountBalance, setAccountBalance] = useState();
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleSend = async () => {
    const channelName = "kalp";
    const chainCodeName = "CBDC5";
    const transactionName = "TransferToken";
    const transactionParams = [
      `{"Receiver":"${receiverAddress}","Amount":${amount}}`,
    ];
    console.log('transfer token amount : ', transactionParams);
    await ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);

    // Send logic goes here
    setAccountBalance(accountBalance - amount);
    getBalance();
    console.log(`Sent ${amount} CBDC to ${receiverAddress}`);
  };

  const getBalance = async () => {
    try {
      const channelName = "kalp";
      const chainCodeName = "CBDC5";
      const transactionName = "GetBalanceForAccount";
      const transactionParams = [`"${receiverAddress}"`];

      // Await the balance retrieval and store the result
      await ExecuteReadTransaction(channelName, chainCodeName, transactionName, transactionParams);
      
    } catch (error) {
      console.log("Error in getBalance:", error);
    }
  };

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
  
      // Directly use 'res' without JSON.parse
      if (res.transactionId) {
        // Transaction is successful
        setResponseMessage(`Transaction successful: {"transactionId":"${res.transactionId}"}`);
      } else if (res.error) {
        // Transaction failed
        try {
          // Attempt to parse the error message if it's a stringified JSON
          const errorObj = JSON.parse(res.error);
          setResponseMessage(`Error: ${errorObj.message.error}`);
        } catch (parseError) {
          // If parsing fails, show the raw error
          setResponseMessage(`Error: ${res.error}`);
        }
      }
  
    } catch (error) {
      console.log(`Error in ExecuteSubmitTransaction: ${error}`);
  
      // Update error handling to properly display error messages
      if (error.response && error.response.data && error.response.data.message) {
        setResponseMessage(`Error: ${error.response.data.message}`);
      } else {
        setResponseMessage("An error occurred during the transaction.");
      }
    } finally {
      // Ensure modal is shown in both success and error cases
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
      dappToken = localStorage.getItem("opensea_dappToken") || "";

      transactionParams = [`${receiverAddress}"`];
      if (!dappToken) {
        console.log("Error: no dappToken exists");
        throw new Error("Error: no dappToken exists");
      }

      var readTransactionPromise = await readTransactionFromWallet(
        dappToken,
        "OPENSEA",
        "http://localhost:3000/favicon.ico", "http://localhost:3000",
        channelName,
        chaincodeName,
        transactionName,
        transactionParams
      );

      console.log('balance Amount: ', readTransactionPromise); 

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-flow-page content-area">
      <div className="admin-flow-container">
        {/* <div className="account-balance">Acc. Balance: {accountBalance}</div> */}
        <label>CBDC</label>
        <input
          className="input-field"
          type="text"
          placeholder="Receiver address"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Button className="send-button" onClick={handleSend}>
          Send
        </Button>
      </div>

      {/* Modal to display the response message */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        message={responseMessage} // Pass the response message as a prop to the modal
      />
    </div>
  );
};

export default Send;
