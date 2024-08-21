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
import './App.css'
import AddressBook from './components/AddressBook';
import Mint from './components/Mint';
import OnBoardMerchant from './components/OnBoardMerchant';
import AccessList from './components/AccessList';
import Send from './components/Send';
import Init from './components/Init';
import ScanQR from './components/ScanQr';
import GetBalance from './components/GetBalance';

const App = () => {
  var dappToken = "";
  const [responseMessage, setResponseMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false); // Add connected state
  const [responseReadMessage, setresponseReadMessage] = useState("");
  const [totalSupply, setTotalSupply] = useState(234);
  const [amount, setAmount] = useState(100);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [cbdc, setCBDC] = useState("");
  const [activeTab, setActiveTab] = useState("burn");
  const [selectedPage, setSelectedPage] = useState("");

  const handleBurn = () => {
    setTotalSupply(totalSupply - amount);
    const channelName = "kalp";
    const chainCodeName = "CBDC4";
    const transactionName = "Burn";

    const transactionParams = [
      `{"Account":"${receiverAddress}","OnrampTxnId":"TR10","Desc":"remove funds"}`
    ];
    
    ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
  }

  // const handleAdminClick = () => {
  //   const channelName = "kalp";
  //   const chainCodeName = "CBDC4";
  //   const transactionName = "Initialize";
  //   //const assetValue = "Assetgaurav5080";
  //   const transactionParams = [
  //     "CBDC", "CBDC$", "67595a0d2cfad599fa82f337c88a7ef07c92e4eb"
  //   ];
  //   ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
  // }

  const handleAdminClick = () => {
    setSelectedPage("admin");
    setActiveTab("onboardMerchant"); // Default tab for the admin page
  };

  const handleVendorClick = () => {
    setSelectedPage("vendor");
    setActiveTab("qr"); // Default tab for the vendor page
  };

  const renderContent = () => {
    switch (activeTab) {
      case "burn":
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
        );
      case "address book":
        return <AddressBook />;
      case "mint":
        return <Mint />;
      case "onboardMerchant":
        return <OnBoardMerchant />;
      case "access list":
        return <AccessList />;
      case "send":
        return <Send />;
      case "Init":
        return <Init />
      case "qr":
        return <ScanQR />
      case "getBalance":
        return <GetBalance />
      default:
        return null;
    }
  };

  let transactionParams = [
    `{"id":"${"chirag09988"}","docType":"ASSET-MYIPR","name":"${"za"}","type":"Real Estate","desc":"Real 1111111","status":"COMPLETED","assetDigest":"${"chirag09988"}","uri":"12345678914","account":["67595a0d2cfad599fa82f337c88a7ef07c92e4eb"],"location":"Dubai","address": "Jabelali"}`,
  ];

  const renderMainScreen = () => (
    <>
      <div className="connect-button">
        <button className='admin-button' onClick={connectToWalletFromDapp}>Connect to Wallet</button>
        <p>Status: {isConnected ? "Connected" : "Not Connected"}</p>
      {responseMessage && <p>{responseMessage}</p>}
      {responseReadMessage && (
        <h1>Read Transaction Output: {responseReadMessage}</h1>
      )}
      </div>
      <div className="main-screen-container">
            <button onClick={handleAdminClick} className="admin-button">
              Admin Page
            </button>
            <button onClick={handleVendorClick} className="vendor-button">
              Vendor Page
            </button>
      </div>
    </>
  );
  

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

  //     transactionParams = ["Assetgaurav60444", "ASSET-MYIPR"];
  //     if (!dappToken) {
  //       console.log("Error: no dappToken exists");
  //       throw new Error("Error: no dappToken exists");
  //     }

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
    // <div>
    //   <button onClick={connectToWalletFromDapp}>Connect to Wallet</button>
    //   <button
    //     onClick={() =>
    //       ExecuteSubmitTransaction(
    //         "kalp",
    //         "myipr",
    //         "CreateNIU",
    //         transactionParams
    //       )
    //     }
    //   >
    //     Execute Submit Transaction
    //   </button>

    //   <button
    //     onClick={() => ExecuteReadTransaction("kalp", "myipr", "IsMinted", "")}
    //   >
    //     ExecuteReadTransaction
    //   </button>

    //   {/* Display connection status */}
      // <p>Status: {isConnected ? "Connected" : "Not Connected"}</p>
      // {responseMessage && <p>{responseMessage}</p>}
      // {responseReadMessage && (
      //   <h1>Read Transaction Output: {responseReadMessage}</h1>
      // )}
    // </div>

      <div className="app-wrapper">
          {selectedPage === "" ? (
            renderMainScreen()
          ) : selectedPage === "admin" ? (
            <div className="admin-flow-wrapper">
              <nav className="navbar">
                <ul>
                  <li className={activeTab === "address book" ? "active" : ""} onClick={() => setActiveTab("address book")}>Address Book</li>
                  {/* <li className={activeTab === "burn" ? "active" : ""} onClick={() => setActiveTab("burn")}>Burn</li>
                  <li className={activeTab === "mint" ? "active" : ""} onClick={() => setActiveTab("mint")}>Mint</li> */}
                  <li className={activeTab === "onboardMerchant" ? "active" : ""} onClick={() => setActiveTab("onboardMerchant")}>Whiteliste User</li>
                  {/* <li className={activeTab === "access list" ? "active" : ""} onClick={() => setActiveTab("access list")}>Access List</li> */}
                  <li className={activeTab === "mint" ? "active" : ""} onClick={() => setActiveTab("mint")}>Mint</li>
                  {/* <li className={activeTab === "init" ? "active" : ""} onClick={() => setActiveTab("init")}>Init</li> */}
                  <li className={activeTab === "burn" ? "active" : ""} onClick={() => setActiveTab("burn")}>Burn</li>
                  <li className={activeTab === "send" ? "active" : ""} onClick={() => setActiveTab("send")}>Send</li>
                  <li className={activeTab === "getBalance" ? "active" : ""} onClick={() => setActiveTab("getBalance")}>Balance</li>

                </ul>
              </nav>
              <div className="content-area">
                {renderContent()}
              </div>
            </div>
          ) : (
            <div className="admin-flow-wrapper">
              <nav className="navbar">
                <ul>
                  {/* <li className={activeTab === "address book" ? "active" : ""} onClick={() => setActiveTab("address book")}>Address Book</li> */}
                  {/* <li className={activeTab === "burn" ? "active" : ""} onClick={() => setActiveTab("burn")}>Burn</li>
                  <li className={activeTab === "mint" ? "active" : ""} onClick={() => setActiveTab("mint")}>Mint</li> */}
                  {/* <li className={activeTab === "onboardMerchant" ? "active" : ""} onClick={() => setActiveTab("onboardMerchant")}>Onboard Merchant</li> */}
                  {/* <li className={activeTab === "access list" ? "active" : ""} onClick={() => setActiveTab("access list")}>Access List</li> */}
                  {/* <li className={activeTab === "send" ? "active" : ""} onClick={() => setActiveTab("send")}>Send</li> */}
                  <li className={activeTab === "qr" ? "active" : ""} onClick={() => setActiveTab("qr")}>QR</li>
                </ul>
              </nav>
              <div className="content-area">
                {renderContent()}

              </div>

            </div>
            

          )}
        </div>
  );


};

export default App;
