
import {React, useState} from 'react';
import {
  getToken,
  connectToWallet,
  getEnrollmentIdFromWallet,
  writeTransactionFromWallet,
  reEngageEvents,
  readTransactionFromWallet,
  disconnectWallet,
} from "kalp-wallet-dapp-pkg";

const Init = () => {
  const [merchantId, setMerchantId] = useState('');
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseReadMessage, setresponseReadMessage] = useState("");

  
  const handleInitClick = () => {
    console.log("Init button clicked");
    const channelName = "kalp";
    const chainCodeName = "CBDC4";
    const transactionName = "Initialise";
    const transactionParams = [
      // `{"User":"${merchantId}","Role":"USER","Desc":"user"}`

      transactionParams = ["CBDC", "CBDC$", "98358b38d04f94b41684f757d7dc53c8aa84b48c"]
    ];

    ExecuteSubmitTransaction(channelName, chainCodeName, transactionName, transactionParams);
    // Perform any additional logic or initialization here
  };

  let transactionParams = ["CBDC", "CBDC$", "44e2e9a79624802cc659c6faafd1f93b3346c5de"]

  var dappToken = "";
  
  transactionParams = ["CBDC", "CBDC$", "44e2e9a79624802cc659c6faafd1f93b3346c5de"]
  
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
        let transactionParams = ["CBDC", "CBDC$", "98358b38d04f94b41684f757d7dc53c8aa84b48c"]
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
    // <div className="init-container">
    //   <button onClick={handleInitClick} className="init-button">
    //     Initialize DApp
    //   </button>
    // </div>
    <div className="admin-flow-page content-area">
      <div className="admin-flow-container">
        <div className="total-supply">Total Supply: 234</div>
        <label>CBDC</label>
        {/* <input
          className="input-field"
          type="text"
          placeholder="CBDC"
        /> */}

        <input
          className="input-field"
          type="text"
          placeholder="Enter Merchant id"
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
        />
        <button
        onClick={() =>
          ExecuteSubmitTransaction(
            "kalp",
            "CBDC4",
            "Initialize",
            transactionParams
          )
        }
      >
        Execute Submit Transaction
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

export default Init;
