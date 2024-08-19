import React, { useState } from 'react';
import './AddressBook.css';

const AddressBook = () => {
  // Sample addresses for the address book
  const addresses = [
    '0x12345...ABCDE',
    '0x67890...FGHIJ',
    '0xABCDE...KLMNO',
    '0xFGHIJ...PQRST',
    '0xKLMNO...UVWXY'
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState(addresses);

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter addresses based on the search query
    const filtered = addresses.filter((address) =>
      address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAddresses(filtered);
  };

  // Copy address to clipboard
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    alert(`Copied: ${address}`);
  };

  return (
    <div className="address-book-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search by address"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="address-list">
        {filteredAddresses.map((address, index) => (
          <div key={index} className="address-item">
            <span className="address">{address}</span>
            <button className="copy-button" onClick={() => handleCopy(address)}>
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;
