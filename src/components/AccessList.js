import React, { useState } from 'react';
import './OnBoardMerchant.css';

const OnBoardMerchant = () => {
  const [merchantId, setMerchantId] = useState('');
  const [address, setAddress] = useState('');

  const handleWhitelist = () => {
    // Logic for whitelisting a merchant
    console.log(`Whitelisting Merchant ID: ${merchantId} with Address: ${address}`);
  };

  const handleBlacklist = () => {
    // Logic for blacklisting a merchant
    console.log(`Blacklisting Merchant ID: ${merchantId} with Address: ${address}`);
  };

  return (
    <div className="admin-flow-page content-area">
      <div className="admin-flow-container">
        <div className="total-supply">Total Supply: 234</div>
        <input
          className="input-field"
          type="text"
          placeholder="CBDC"
        />
        <input
          className="input-field"
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="whitelist-button" onClick={handleWhitelist}>
          Whitelist
        </button>
        <button className="blacklist-button" onClick={handleBlacklist}>
          Blacklist
        </button>
      </div>
    </div>
  );
};

export default OnBoardMerchant;
