
// import React, { useState } from 'react';
// import {
//     getToken,
//     connectToWallet,
//     getEnrollmentIdFromWallet,
//     writeTransactionFromWallet,
//     reEngageEvents,
//     readTransactionFromWallet,
//     disconnectWallet,
//   } from "kalp-wallet-dapp-pkg";

// const GetBalance = () => {
//     var dappToken = "";
//   const [vendorAddress, setVendorAddress] = useState('');
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

//   const handleSubmit = () => {
//     getBalance()
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

//   const getBalance = async () => {
//     try {
//       const channelName = "kalp";
//       const chainCodeName = "CBDC4";
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

//   return (
//     <>
//       <div className="admin-flow-page content-area">
//         <div className="admin-flow-container">
//           <label>Vendor Address</label>
//           <input
//             className="input-field"
//             type="text"
//             value={vendorAddress}
//             onChange={(e) => setVendorAddress(e.target.value)}
//             placeholder="Enter Vendor Address"
//           />
          
          
//           <button className='whitelist-button' onClick={handleSubmit}>Get Balance</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GetBalance;



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

const GetBalance = () => {
  var dappToken = "";
  const [vendorAddress, setVendorAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState(234);
  const [receiverAddress, setReceiverAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseReadMessage, setresponseReadMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Balance, setBalance] = useState("");

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
      dappToken = localStorage.getItem("opensea_dappToken") || "";

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
      setresponseReadMessage(
        `Read Transaction successful: ${JSON.stringify(readTransactionPromise)}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const channelName = "kalp";
      const chainCodeName = "CBDC4";
      const transactionName = "GetBalanceForAccount";
      const transactionParams = [`${vendorAddress}`];

      const res = await ExecuteReadTransaction(channelName, chainCodeName, transactionName, transactionParams);

    //   console.log('response balance ', res)
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

          <button className='whitelist-button' onClick={handleSubmit}>Get Balance</button>

          {Balance && (
            <div className="balance-display">
              <p>{Balance}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GetBalance;
