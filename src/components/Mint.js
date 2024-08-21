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
import './Mint.css'; 

const Mint = () => {
  // State for Mint form
  var dappToken = "";
  const [totalSupply, setTotalSupply] = useState(234);
  const [cbdc, setCBDC] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseReadMessage, setresponseReadMessage] = useState("");

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
    // Mint logic goes here
    setTotalSupply(totalSupply + amount);
    const channelName = "kalp";
    const chainCodeName = "CBDC4";
    const transactionName = "Mint";
    const transactionParams = [
      `{\"OnrampTxnId\":\"${randomTxnId}\",\"Desc\":\"First minting\",\"Amount\":${amount}}`
    ];

    ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
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
      console.log('here is response: ', setResponseMessage)
    } catch (error) {
      console.log(`error is :${error}`);
    }
  };
  
  // const ExecuteReadTransaction = async (
  //   channelName,
  //   chaincodeName,
  //   transactionName,
  //   transactionParams
  // ) => {
  //   try {
  //     //const resp: boolean = await connectToWallet(dappToken, "OPENSEA");
  //     const enrollmentId = localStorage.getItem("opensea_enrollmentId");
  //     dappToken = localStorage.getItem("opensea_dappToken") || "";
  
  //     transactionParams = ["Assetgaurav60442", "ASSET-MYIPR"];
  //     if (!dappToken) {
  //       console.log("Error: no dappToken exists");
  //       throw new Error("Error: no dappToken exists");
  //     }
  
  //     console.log("hebhr")
  //     var readTransactionPromise = await readTransactionFromWallet(
  //       dappToken,
  //       "OPENSEA",
  //       "http://localhost:3000/favicon.ico", "http://localhost:3000",
  //       channelName,
  //       chaincodeName,
  //       transactionName,
  //       transactionParams
  //     );
  //     console.log(`readTransactionPromise is:${readTransactionPromise}`);
  
  //     setresponseReadMessage(
  //       `Read Transaction successful: ${JSON.stringify(readTransactionPromise)}`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      console.log(`readTransactionPromise is:${readTransactionPromise}`);
      console.log('balance Amount: ', readTransactionPromise)
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
        {/* <div className="total-supply">Total Supply: {totalSupply}</div> */}

        <div className="input-container">
          {/* <input
            className="input-field"
            type="text"
            placeholder="CBDC"
            value={cbdc}
            onChange={(e) => setCBDC(e.target.value)}
          /> */}
          <label>
            CBDC
          </label>
          {/* <input
            className="input-field"
            type="text"
            placeholder="Receiver Address"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
          /> */}
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
        
        {/* <div className="total-supply-after-mint">
          Total Supply after mint: {totalSupply + amount}
        </div> */}
        <div className="transaction-messages">
        {responseMessage && <p>{responseMessage}</p>}
        {/* {responseReadMessage && <h1>{responseReadMessage}</h1>} */}
      </div>
      </div>
    </div>
  );
};

export default Mint;
