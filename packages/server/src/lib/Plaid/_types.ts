export interface PlaidAccount {
  account_id: string;
  balances: {
    available: number;
    current: number;
    iso_currency_code: string;
    limit: null;
    unofficial_currency_code: null;
  };
  mask: string;
  name: string;
  official_name: string;
  persistent_account_id: string;
  subtype: string;
  type: string;
}

export interface PlaidTransaction {
  account_id: string;
  amount: number;
  authorized_data: string;
  category: string[];
  check_number: number | null;
  iso_currency_code: string;
  transaction_id: string;
  transaction_type: string;
}

export interface PlaidFetchedTransactionsUpdates {
  added: any[];
  modified: any[];
  removed: any[];
  accessToken: string;
  cursor: string;
}

export interface SyncAccountsTransactionsTask {
  tenantId: number;
  plaidAccountId: number;
  plaidTransactions: PlaidTransaction[];
}