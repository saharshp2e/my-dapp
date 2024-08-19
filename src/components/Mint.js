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
  const [amount, setAmount] = useState(123);
  const [isConnected, setIsConnected] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseReadMessage, setresponseReadMessage] = useState("");

  const handleMint = () => {
    // Mint logic goes here
    setTotalSupply(totalSupply + amount);
    const channelName = "kalp";
    const chainCodeName = "CBDC2";
    const transactionName = "Mint";
    const transactionParams = [
      `{\"OnrampTxnId\":\"T004\",\"Desc\":\"First minting\",\"Amount\":5}`
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
      console.log('here is response: ', setResponseMessage)
    } catch (error) {
      console.log(`error is :${error}`);
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
  
      transactionParams = ["Assetgaurav60442", "ASSET-MYIPR"];
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
        <div className="total-supply">Total Supply: {totalSupply}</div>

        <div className="input-container">
          {/* <input
            className="input-field"
            type="text"
            placeholder="CBDC"
            value={cbdc}
            onChange={(e) => setCBDC(e.target.value)}
          /> */}
          <label>
            CDBC
          </label>
          <input
            className="input-field"
            type="text"
            placeholder="Receiver Address"
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
        </div>

        <button className="mint-button" onClick={handleMint}>
          Mint
        </button>
        
        <div className="total-supply-after-mint">
          Total Supply after mint: {totalSupply + amount}
        </div>
      </div>
    </div>
  );
};

export default Mint;
