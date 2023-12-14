const fs = require('fs');
require('@nomicfoundation/hardhat-toolbox');

const ALCHEMY_API_KEY = "O08YXu69FK1RBOvtnb_kRF7P1l5mpNI8";

const SEPOLIA_PRIVATE_KEY = "9bee3ddcac9d794d31342cf382bf37eddc26f72726631f5cd63197d30a04cf66";

module.exports = {
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    hardhat: {
      chainId: 1337
    },
  },
  solidity: '0.8.4',
};
