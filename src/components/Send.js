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
import './Send.css';

const Send = () => {
  var dappToken = "";
  const [accountBalance, setAccountBalance] = useState(234);
  const [cbdc, setCBDC] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseReadMessage, setresponseReadMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Balance, setBalance] =  useState("")
  const [capital, setCapital] = useState("");
  const [extractedMessage, setExtractedMessage] = useState("");

  let displayedBalance = "";

    // const extractMessage = (responseMessage) => {
    //   try {
    //     // Extract the JSON string part from the response message
    //     const jsonStringStart = responseMessage.indexOf("{");
    //     const jsonString = responseMessage.substring(jsonStringStart);
    
    //     // Parse the outermost JSON object
    //     const parsedResponse = JSON.parse(jsonString);
    
    //     // Extract the 'error' field (which contains the embedded JSON message)
    //     const errorString = parsedResponse.error;
    
    //     // Find the 'message' JSON inside the 'error' string
    //     const messageMatch = errorString.match(/message: (\{.*\})/);
    
    //     // Parse the embedded JSON message if it exists
    //     if (messageMatch && messageMatch[1]) {
    //       const embeddedMessageJson = JSON.parse(messageMatch[1]);
    
    //       // Return the error message from the embedded JSON
    //       return embeddedMessageJson.message.error;
    //     } else {
    //       throw new Error("No valid message JSON found in the error field.");
    //     }
    //   } catch (error) {
    //     console.error("Error parsing message:", error);
    //     return "Error parsing message.";
    //   }
    // };
    
    // const message = extractMessage(responseMessage);
    // // setResponseMessage(message)
    // console.log("Extracted message:", message);  // Expected output: "insufficient balance"
    

  const handleSend = async () => {
    const channelName = "kalp";
    const chainCodeName = "CBDC4";
    const transactionName = "TransferToken";
    const transactionParams = [
      `{"Receiver":"${receiverAddress}","Amount":${amount}}`,
      // `{\"Receiver\":\'ebcb2f58c3f034486e75159b6c6bf42c039be539\',\"Amount\":50}`,
    ];
    console.log('transfer token amount : ', transactionParams)
    await ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
    

    // Send logic goes here
    setAccountBalance(accountBalance - amount);
    getBalance()
    console.log(`Sent ${amount} CBDC to ${receiverAddress}`);
  };
  

  // const getBalance = () => {
  //   const channelName = "kalp";
  //   const chainCodeName = "CBDC2";
  //   const transactionName = "GetBalanceForAccount";
  //   const transactionParams = [`"${receiverAddress}"`];

  //   ExecuteReadTransaction(channelName, chainCodeName, transactionName, transactionParams)
  //   // ExecuteReadTransaction(channelName, chainCodeName, transactionName, transactionParams)
  // };

  const getBalance = async () => {
    try {
      const channelName = "kalp";
      const chainCodeName = "CBDC4";
      const transactionName = "GetBalanceForAccount";
      const transactionParams = [`"${receiverAddress}"`];
  
      // Await the balance retrieval and store the result
      const balanceResult = await ExecuteReadTransaction(channelName, chainCodeName, transactionName, transactionParams);

      // Store the balance locally to render it later
      displayedBalance = `Read Transaction successful: ${JSON.stringify(balanceResult)}`;
      console.log(displayedBalance);
      
  
      // Update state with the retrieved balance
      // setBalance(`Read Transaction successful: ${JSON.stringify(balanceResult)}`);
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
      // TODO: format the error msg
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
        "http://localhost:3000/favicon.ico", "http://localhost:3000",
        channelName,
        chaincodeName,
        transactionName,
        transactionParams
      );
      setResponseMessage(`Transaction successful: ${JSON.stringify(res)}`);
      {responseMessage && <p>{responseMessage}</p>}
      {responseReadMessage && (
        <h1>Read Transaction Output: {responseReadMessage}</h1>
      )}
      // const message = extractMessage(responseMessage);
      // const message = extractMessage(`Transaction successful: ${JSON.stringify(res)}`);
      // setExtractedMessage(message);
      // console.log('message: ', message)
    } catch (error) {
      console.log(`error is :${error}`);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message.error);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };
  
  const ExecuteReadTransaction = async (
    channelName,
    chaincodeName,
    transactionName,
    transactionParams
  ) => {
    try {
      //const resp: boolean = await connectToWallet(dappToken, "OPENSEA");
      const enrollmentId = localStorage.getItem("opensea_enrollmentId");
      dappToken = localStorage.getItem("opensea_dappToken") || "";
  
      transactionParams = [`${receiverAddress}"`];
      if (!dappToken) {
        console.log("Error: no dappToken exists");
        throw new Error("Error: no dappToken exists");
      }
  
      console.log("hebhr")
      var readTransactionPromise = await readTransactionFromWallet(
        dappToken,
        "OPENSEA",
        "http://localhost:3000/favicon.ico", "http://localhost:3000",
        channelName,
        chaincodeName,
        transactionName,
        transactionParams
      );
      // console.log(`readTransactionPromise is:${readTransactionPromise}`);
      console.log('balance Amount: ', responseReadMessage) 
 
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


  return (
    <div className="admin-flow-page content-area">
      <div className="admin-flow-container">
        <div className="account-balance">Acc. Balance: {Balance}</div>
        {/* <button className="redeem-button" disabled>
          Redeem
        </button>
        <div className="redeem-info">To be added later once off-chain fiat money is linked</div> */}

        {/* <input
          className="input-field"
          type="text"
          placeholder="CBDC"
          value={cbdc}
          onChange={(e) => setCBDC(e.target.value)}
        /> */}
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
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
        <div className="transaction-messages">
          {responseMessage && <p>{responseMessage}</p>}
          {/* {responseReadMessage && <h1>{responseReadMessage}</h1>} */}
          {/* {extractedMessage && <p>{extractedMessage}</p>}  */}
        </div>
      </div>
    </div>
  );
};

export default Send;

