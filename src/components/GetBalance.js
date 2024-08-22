
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
  const [responseReadMessage, setresponseReadMessage] = useState("");
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
