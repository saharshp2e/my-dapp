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
import './OnBoardMerchant.css';


const OnBoardMerchant = () => {
  var dappToken = "";
  const [merchantId, setMerchantId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseReadMessage, setresponseReadMessage] = useState("");

  const handleWhitelist = () => {
    const channelName = "kalp";
    const chainCodeName = "CBDC4";
    const transactionName = "WhitelistUser";
    const transactionParams = [
      `{"User":"${merchantId}","Role":"USER","Desc":"user"}`
    ];

    ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
  };


  const handleBlacklist = () => {
    const channelName = "kalp";
    const chainCodeName = "CBDC4";
    const transactionName = "RemoveWhitelisting";
    const transactionParams = [
      `${merchantId}`
    ];

    ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
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
    } catch (error) {
      console.log(`error is :${error}`);
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
        <button className="whitelist-button" onClick={handleWhitelist}>
          Whitelist
        </button>
        <button className="blacklist-button" onClick={handleBlacklist}>
          Blacklist
        </button>
        {responseMessage && (
          <div className="response-message">
            {responseMessage}
          </div>
        )}
                
      </div>
    </div>
  );
};

export default OnBoardMerchant;
