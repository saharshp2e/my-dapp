// import React, { useState } from 'react';
// import QRCode from 'qrcode.react'; // Import a QR code library (install via npm if necessary)

// const ScanQR = () => {
//   const [vendorAddress, setVendorAddress] = useState('');
//   const [amount, setAmount] = useState('');
//   const [qrCode, setQrCode] = useState('');

//   const handleGenerateQR = () => {
//     // Create the QR payload based on the inputs
//     const qrPayload = {
//       channelName: "kalptantra",
//       chainCodeName: "CBDC4",
//       transactionName: "TransferToken",
//       transactionParams: [vendorAddress, amount],
//       origin: "https://KalpWallet.com",
//       network: "kalptantra"
//     };
    
//     // Convert the payload to a string and generate the QR code
//     const qrString = JSON.stringify(qrPayload);
//     setQrCode(qrString);
//   };

//   return (
//     <>
//       <div className="admin-flow-page content-area">
//         <div className="admin-flow-container">
//           <label>Vendor Address</label>
//           <input
//             className="input-field"
//             type="text"
//             value={vendorAddress}
//             onChange={(e) => setVendorAddress(e.target.value)}
//             placeholder="Enter Vendor Address"
//           />
          
//           <label>Amount</label>
//           <input
//             className="input-field"
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter Amount"
//           />
          
//           <button className='whitelist-button' onClick={handleGenerateQR}>Generate QR</button>
//         </div>
//       </div>
//       <div className='qr-code-display'>
//       {qrCode && (
//         <div className="qr-code-display">
//           <QRCode value={qrCode} size={300}/>
//         </div>
//       )}
//       </div>
//     </>
//   );
// };

// export default ScanQR;



import React, { useState } from 'react';
import QRCode from 'qrcode.react'; // Import a QR code library (install via npm if necessary)

const ScanQR = () => {
  const [vendorAddress, setVendorAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleGenerateQR = () => {
    // Create the transactionParams as a stringified JSON object
    const transactionParams = JSON.stringify({
      "Receiver": vendorAddress,
      "Amount": Number(amount)
    });

    // Create the QR payload with the correct structure
    const qrPayload = {
      channelName: "kalp",
      chainCodeName: "CBDC4",
      transactionName: "TransferToken",
      transactionParams: [transactionParams],
      origin: "https://KalpWallet.com",
      network: "kalptantra"
    };
    
    // Convert the payload to a string and generate the QR code
    const qrString = JSON.stringify(qrPayload);
    setQrCode(qrString);
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
          
          <label>Amount</label>
          <input
            className="input-field"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          
          <button className='whitelist-button' onClick={handleGenerateQR}>Generate QR</button>
        </div>
      </div>
      <div className='qr-code-display'>
      {qrCode && (
        <div className="qr-code-display">
          <QRCode value={qrCode} size={300}/>
        </div>
      )}
      </div>
    </>
  );
};

export default ScanQR;
