export interface Wallet {
  w_id: number;
  u_id: number;
  name: string;
  description: string;
  amount: number;
}

export interface InitialP {
  type: string;
  amount: number;
  description: string;
  comment: string;
  w_id: number;
  entry_date: Date;
}
