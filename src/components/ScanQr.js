import React, { useState } from 'react';
import QRCode from 'qrcode.react'; // Import a QR code library (install via npm if necessary)

const ScanQR = () => {
  const [vendorAddress, setVendorAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleGenerateQR = () => {
    // Create the QR payload based on the inputs
    const qrPayload = {
      channelName: "kalptantra",
      chainCodeName: "koot",
      transactionName: "InitializeWallet",
      transactionParams: [vendorAddress, amount],
      origin: "https://KalpWallet.com",
      network: "kalptantra"
    };
    
    // Convert the payload to a string and generate the QR code
    const qrString = JSON.stringify(qrPayload);
    setQrCode(qrString);
  };

  return (
    <div className="qr-generator-container">
      <div className="qr-inputs">
        <label>Vendor Address</label>
        <input
          type="text"
          value={vendorAddress}
          onChange={(e) => setVendorAddress(e.target.value)}
          placeholder="Enter Vendor Address"
        />
        
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />
        
        <button onClick={handleGenerateQR}>Create QR</button>
      </div>

      {qrCode && (
        <div className="qr-code-display">
          <QRCode value={qrCode} />
        </div>
      )}
    </div>
  );
};

export default ScanQR;
