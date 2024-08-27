import React, { useState } from 'react';
import {
  getToken,
  connectToWallet,
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
import Burn from './components/Burn';

const App = () => {
  var dappToken = "";
  const [isConnected, setIsConnected] = useState(false); // Add connected state
  const [activeTab, setActiveTab] = useState("burn");
  const [selectedPage, setSelectedPage] = useState("");


  const handleAdminClick = () => {
    setSelectedPage("admin");
    setActiveTab("onboardMerchant"); // Default tab for the admin page
  };

  const handleVendorClick = () => {
    setSelectedPage("vendor");
    setActiveTab("qr"); // Default tab for the vendor page
  };

  const handleUserClick = () => {
    setSelectedPage("user");
    setActiveTab("getBalance"); // Default tab for the vendor page
  };

  const renderContent = () => {
    switch (activeTab) {
      case "burn":
        return <Burn />
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
        case "user":
          return <GetBalance />
      default:
        return null;
    }
  };

  const renderMainScreen = () => (
    <>
      {/* <div className="connect-button">
        <button className='admin-button' onClick={connectToWalletFromDapp}>Connect to Wallet</button>
        <p>Status: {isConnected ? "Connected" : "Not Connected"}</p>
      {responseMessage && <p>{responseMessage}</p>}
      {responseReadMessage && (
        <h1>Read Transaction Output: {responseReadMessage}</h1>
      )}
      </div> */}
      <div className="main-screen-container">
            <button onClick={handleAdminClick} className="admin-button">
              Admin Page
            </button>
            <button onClick={handleVendorClick} className="vendor-button">
              Vendor Page
            </button>
            <button onClick={handleUserClick} className="vendor-button">
              User Page
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



  return (
      <div className="app-wrapper">
      {selectedPage === "" ? (
        renderMainScreen()
      ) : (
        <div className="admin-flow-wrapper">
          <button className="home-button" onClick={() => setSelectedPage("")}>
            Home
          </button>
          <nav className="navbar">
            <ul>
              {selectedPage === "admin" && (
                <>
                  <li className={activeTab === "address book" ? "active" : ""} onClick={() => setActiveTab("address book")}>Address Book</li>
                  <li className={activeTab === "onboardMerchant" ? "active" : ""} onClick={() => setActiveTab("onboardMerchant")}>Whitelist User</li>
                  <li className={activeTab === "mint" ? "active" : ""} onClick={() => setActiveTab("mint")}>Mint</li>
                  <li className={activeTab === "burn" ? "active" : ""} onClick={() => setActiveTab("burn")}>Burn</li>
                  <li className={activeTab === "send" ? "active" : ""} onClick={() => setActiveTab("send")}>Send</li>
                  <li className={activeTab === "getBalance" ? "active" : ""} onClick={() => setActiveTab("getBalance")}>Balance</li>
                </>
              )}
              {/* {selectedPage === "vendor" && (
                <li className={activeTab === "qr" ? "active" : ""} onClick={() => setActiveTab("qr")}>QR</li>
              )} */}  {/*Uncomment when wallet bug has been resolved */}
               {selectedPage === "vendor" && (
                <li className={activeTab === "send" ? "active" : "active"} onClick={() => setActiveTab("send")}>Send</li>
              )}
              {selectedPage === "user" && (
                <li className={activeTab === "user" ? "active" : "active"} onClick={() => setActiveTab("user")}>Balance</li>
              )}
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
