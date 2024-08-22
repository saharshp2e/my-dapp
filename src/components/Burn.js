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

const Burn = () => {
    var dappToken = "";
    const [receiverAddress, setReceiverAddress] = useState('');
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

    const ExecuteSubmitTransaction = async (
        channelName,
        chaincodeName,
        transactionName,
        transactionParams
      ) => {
        try {
          const enrollmentId = localStorage.getItem("opensea_enrollmentId");
          dappToken = localStorage.getItem("opensea_dappToken") || "";
    
          // transactionParams = [
          //   `{"id":"${"Assetgaurav60444"}","docType":"ASSET-MYIPR","name":"${"za"}","type":"Real Estate","desc":"Real 1111111","status":"COMPLETED","assetDigest":"${"Assetgaurav60444"}","uri":"12345678914","account":["67595a0d2cfad599fa82f337c88a7ef07c92e4eb"],"location":"Dubai","address": "Jabelali"}`,
          // ];
          console.log('transaction params: ', transactionParams)
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
          // console.log('response message: ', responseMessage)
        } catch (error) {
          console.log(`error is :${error}`);
        }
      };

    const handleBurn = () => {
        // setTotalSupply(totalSupply - amount);
        const txnId = generateRandomString(6)
        const channelName = "kalp";
        const chainCodeName = "CBDC4";
        const transactionName = "Burn";
    
        const transactionParams = [
          `{"Account":"${receiverAddress}","OnrampTxnId":"${txnId}","Desc":"remove funds"}`
        ];
        
        ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
      }


    return (
        <div className="admin-flow-page">
            <div className="admin-flow-container">
              {/* <div className="total-supply">Total Supply: {totalSupply}</div> */}
              
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
              
              {/* <div className="total-supply-after-burn">
                Total Supply after burn: {totalSupply - amount}
              </div> */}
              <div className="transaction-messages">
                {responseMessage && <p>{responseMessage}</p>}
                {/* {responseReadMessage && <h1>{responseReadMessage}</h1>} */}
              </div>
            </div>
          </div>
    )

}

export default Burn