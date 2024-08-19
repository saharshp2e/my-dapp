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

  const handleSend = () => {
    const channelName = "kalp";
    const chainCodeName = "CBDC2";
    const transactionName = "TransferToken";
    const transactionParams = [
      `{"Receiver":"${receiverAddress}","Amount":${amount}}`,
      // `{\"Receiver\":\'ebcb2f58c3f034486e75159b6c6bf42c039be539\',\"Amount\":50}`,
    ];
    console.log('transfer token amount : ', transactionParams)
    if (amount > accountBalance) {
      console.log('Insufficient balance');
      return;
    }
    ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);

    // Send logic goes here
    setAccountBalance(accountBalance - amount);
    console.log(`Sent ${amount} CBDC to ${receiverAddress}`);
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
        <div className="account-balance">Acc. Balance: {accountBalance}</div>
        <button className="redeem-button" disabled>
          Redeem
        </button>
        <div className="redeem-info">To be added later once off-chain fiat money is linked</div>

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

      </div>
    </div>
  );
};

export default Send;
