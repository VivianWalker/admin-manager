import * as types from '../mutation-types';

// initial state
const state = {
  accounts: [],
  transaction:[],
  wallet: null,
  accoutsWalletApiStatus: null,
  transactionWalletApiStatus: null,
  WalletApiStatus: null
};

// mutations
const mutations = {
  [types.ACCOUNTS_WALLET_REQUEST] (state) {
    state.accoutsWalletApiStatus = 'loading';
  },
  [types.ACCOUNTS_WALLET_SUCCESS] (state, { wallet }) {
    state.accounts = wallet;
    state.accoutsWalletApiStatus = 'successful';
  },
  [types.ACCOUNTS_WALLET_FAILURE] (state) {
    state.accoutsWalletApiStatus = 'failed';
  },

  
  [types.TRANSACTIONS_WALLET_REQUEST] (state) {
    state.accoutsWalletApiStatus = 'loading';
  },
  [types.TRANSACTIONS_WALLET_SUCCESS] (state, { wallet }) {
    state.transaction = wallet;
    state.accoutsWalletApiStatus = 'successful';
  },
  [types.TRANSACTIONS_WALLET_FAILURE] (state) {
    state.accoutsWalletApiStatus = 'failed';
  },


  [types.WALLET_WALLET_REQUEST] (state) {
    state.accoutsWalletApiStatus = 'loading';
  },
  [types.WALLET_WALLET_SUCCESS] (state, { wallet }) {
    state.wallet = wallet;
    state.accoutsWalletApiStatus = 'successful';
  },
  [types.WALLET_WALLET_FAILURE] (state) {
    state.accoutsWalletApiStatus = 'failed';
  }
};

export default {
  state,
  mutations
};