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
// import './OnBoardMerchant.css';


// const OnBoardMerchant = () => {
//   var dappToken = "";
//   const [merchantId, setMerchantId] = useState('');
//   const [isConnected, setIsConnected] = useState(false);
//   const [responseMessage, setResponseMessage] = useState("");
//   const [responseReadMessage, setresponseReadMessage] = useState("");

//   const handleWhitelist = () => {
//     const channelName = "kalp";
//     const chainCodeName = "CBDC5";
//     const transactionName = "WhitelistUser";
//     const transactionParams = [
//       `{"User":"${merchantId}","Role":"USER","Desc":"user"}`
//     ];

//     ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
//   };


//   const handleBlacklist = () => {
//     const channelName = "kalp";
//     const chainCodeName = "CBDC5";
//     const transactionName = "RemoveWhitelisting";
//     const transactionParams = [
//       `${merchantId}`
//     ];

//     ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
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
//     } catch (error) {
//       console.log(`error is :${error}`);
//     }
//   };
    

//   return (
//     <div className="admin-flow-page content-area">
//       <div className="admin-flow-container">
//         <label>CBDC</label>
//         <input
//           className="input-field"
//           type="text"
//           placeholder="Enter User's ID"
//           value={merchantId}
//           onChange={(e) => setMerchantId(e.target.value)}
//         />
//         <button className="whitelist-button" onClick={handleWhitelist}>
//           Whitelist
//         </button>
//         <button className="blacklist-button" onClick={handleBlacklist}>
//           Blacklist
//         </button>
//         {responseMessage && (
//           <div className="response-message">
//             {responseMessage}
//           </div>
//         )}
                
//       </div>
//     </div>
//   );
// };

// export default OnBoardMerchant;


import React, { useState } from 'react';
import {
  writeTransactionFromWallet,
  readTransactionFromWallet,
} from "kalp-wallet-dapp-pkg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './OnBoardMerchant.css';

// Reuse the Modal component
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

const OnBoardMerchant = () => {
  const [merchantId, setMerchantId] = useState('');
  const [responseMessage, setResponseMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleWhitelist = () => {
    const channelName = "kalp";
    const chainCodeName = "CBDC5";
    const transactionName = "WhitelistUser";
    const transactionParams = [
      `{"User":"${merchantId}","Role":"USER","Desc":"user"}`
    ];

    ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
  };

  // const handleBlacklist = async () => {
  //   try {
  //     const balance = await getBalance(); // Await the balance before proceeding
  //     console.log('the balance: ', balance)
  
  //     if (balance === 0) {
  //       // If balance is 0, proceed with the blacklist operation
  //       const channelName = "kalp";
  //       const chainCodeName = "CBDC5";
  //       const transactionName = "RemoveWhitelisting";
  //       const transactionParams = [`${merchantId}`];
  
  //       await ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
  
  //       // Set a success message and show the modal after blacklisting
  //       setResponseMessage("Merchant has been successfully blacklisted.");
  //       setModalShow(true);
  //     } else {
  //       // If balance is greater than 0, show a message in the modal
  //       setResponseMessage(`Merchant has balance = ${balance}, Burn the balance before Blacklisting`);
  //       setModalShow(true);
  //     }
  //   } catch (error) {
  //     console.log("Error in handleBlacklist:", error);
  //     setResponseMessage("An error occurred while trying to blacklist the merchant.");
  //     setModalShow(true); // Show the modal on error as well
  //   }
  // };

  const handleBlacklist = async () => {
    try {
      const balance = await getBalance();
      console.log('the balance: ', balance)
  
      if (balance === 0) {
        setTimeout(async () => {
          const channelName = "kalp";
          const chainCodeName = "CBDC5";
          const transactionName = "RemoveWhitelisting";
          const transactionParams = [`${merchantId}`];
  
          await ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
  
          setResponseMessage("Merchant has been successfully blacklisted.");
          setModalShow(true);
        }, 100); // Add a 100ms delay to allow the DOM to reflow
      } else {
        setResponseMessage(`Merchant has balance = ${balance}, Burn the balance before Blacklisting`);
        setModalShow(true);
      }
    } catch (error) {
      console.log("Error in handleBlacklist:", error);
      setResponseMessage("An error occurred while trying to blacklist the merchant.");
      setModalShow(true);
    }
  };
  
  

  const getBalance = async () => {
    try {
      const channelName = "kalp";
      const chainCodeName = "CBDC5";
      const transactionName = "GetBalanceForAccount";
      const transactionParams = [`${merchantId}`];

      const readResult = await ExecuteReadTransaction(channelName, chainCodeName, transactionName, transactionParams);

      // Assuming the balance is returned as a string, e.g., '"30"', extract the numeric value
      const parsedBalance = parseFloat(readResult);

      if (!isNaN(parsedBalance)) {
        return parsedBalance;  // Return the numeric balance
      } else {
        throw new Error("Failed to parse balance.");
      }
    } catch (error) {
      console.log("Error in getBalance:", error);
      return null;  // Return null in case of error
    }
  };

  const ExecuteSubmitTransaction = async (
    channelName,
    chaincodeName,
    transactionName,
    transactionParams
  ) => {
    try {
      const dappToken = localStorage.getItem("opensea_dappToken") || "";

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
        setResponseMessage(`Error: ${res.error}`);
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

      console.log("Reading balance...", transactionParams);
      const readTransactionPromise = await readTransactionFromWallet(
        dappToken,
        "OPENSEA",
        "http://localhost:3000/favicon.ico", "http://localhost:3000",
        channelName,
        chaincodeName,
        transactionName,
        transactionParams
      );

      // Assuming the response contains the balance as a stringified number, e.g., '"30"'
      return readTransactionPromise; // Returning the balance from the response

    } catch (error) {
      console.log("Error in ExecuteReadTransaction:", error);
      throw error;
    }
  };

  return (
    <div className="admin-flow-page content-area">
      <div className="admin-flow-container">
        <label>CBDC</label>
        <input
          className="input-field"
          type="text"
          placeholder="Enter User's ID"
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
        />
        <Button className="whitelist-button" onClick={handleWhitelist}>
          Whitelist
        </Button>
        <Button className="blacklist-button" onClick={handleBlacklist}>
          Blacklist
        </Button>
      </div>

      {/* Modal to display the response message */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        message={responseMessage}
      />
    </div>
  );
};

export default OnBoardMerchant;
